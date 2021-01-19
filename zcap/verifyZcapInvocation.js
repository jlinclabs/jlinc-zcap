'use strict';

const jwt  = require('@jlinc/jwt');
module.exports = function verifyZcapInvocation(input) {
  /**
  * @param {object} input the zcap as an object
  * @param {string} input the zcap as a Ed25519 JWS with jwk in its header, or JSON string
  */

  const {JlincZcapError} = this;
  const verified = {verified: false};
  if (typeof input === 'string') {
    if (/^[\w-]+\.[\w-]+\.[\w-]+$/.test(input)) { //it's a JWT
      const decoded = jwt.verifyEdDsa(input);
      verified.wrapper = {
        key: decoded.header.jwk.x,
        keyId: decoded.header.jwk.kid
      };
      verified.zcap = decoded.payload;
    } else {
      verified.zcap = JSON.parse(input); // it's a JSON string, or throw an exception
    }
  } else {
    if (Object.prototype.toString.call(input) === '[object Object]') { //it's an object
      verified.zcap = input;
    } else {
      throw new JlincZcapError('input must be an object, a JSON string, or a valid JWS');
    }
  }

  verified.id = verified.zcap.id;
  verified.invoker = verified.zcap.invoker;
  verified.caveats = verified.zcap.caveat;

  const {zcapObject, proof} = this.extractProof(verified.zcap);
  for (let i=0; i<proof.length; i++) {
    this.validateProof(zcapObject, proof[i]);
    if (proof[i].proofPurpose === 'capabilityDelegation') {
      verified.delegator = proof[i].verificationMethod.split('#')[0];
    } else if (proof[i].proofPurpose === 'capabilityInvocation') {
      verified.invoker = proof[i].verificationMethod.split('#')[0];
    }
  };
  verified.verified = true;

  return verified;
};
