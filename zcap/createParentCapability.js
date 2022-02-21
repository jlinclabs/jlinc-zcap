'use strict';

const uuid = require('uuid');

module.exports = function createParentCapability(
  issuer, targetUri, caveats
){
  /**
  * @param {object} issuer
  * @param {string} issuer.did reference to a JLINC DID signing key
  * @param {string} issuer.publicKey in Base64Url format.
  * @param {string} issuer.secretKey in Base64Url format.
  * @param {string} issuerUri a URI string identifying the API where the parent capability can be retrieved
  *
  * @param {string} targetUri a URI string identifying the target of the capability
  *
  * @param {array}  caveats optional array of caveat objects
  *
  * @returns {object} a Parent Capability object
  */

  const {JlincZcapError} = this;
  if (
    typeof(issuer) !== 'object' ||
    !Object.keys(issuer).includes('did') ||
    !Object.keys(issuer).includes('publicKey') ||
    !Object.keys(issuer).includes('secretKey') ||
    !Object.keys(issuer).includes('issuerUri')
  ){
    throw new JlincZcapError(`An issuer object with DID, publicKey, secretKey, and issuerUri must be provided.`);
  }
  if (!/^[a-z]+\:\/\//.test(targetUri)) {
    throw new JlincZcapError(`A target URI must be provided.`);
  }
  if (typeof(caveats) === 'undefined') {
    caveats = ['authorization'];
  } else if (!Array.isArray(caveats)) {
    throw new JlincZcapError(`Caveats, if provided, must be an array.`);
  }

  const parentCapability = {
    '@context': this.context,
    id: 'urn:uuid:' + uuid.v4(),
    issuerID: issuer.did,
    issuerUri: issuer.issuerUri,
    targetUri: targetUri,
    caveats: caveats
  };

  const proof = this.createProof({ issuer, proofObj: parentCapability });
  parentCapability.proof = proof;

  return parentCapability;
};
