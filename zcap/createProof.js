'use strict';

const jlincJWT = require('@jlinc/jwt');
JSON.canonicalize = require('canonicalize');

module.exports = function createProof({ issuer, proofObj }) {
  const proofObject = Object.assign({}, proofObj);
  const canonicalizedProof = JSON.canonicalize(proofObject);
  const jws = jlincJWT.signEdDsa(JSON.parse(canonicalizedProof), issuer.publicKey, issuer.secretKey, issuer.did + '#signing');
  const detachedSig = this.makeDetachedSig(jws);
  const proof = {
    type: 'Ed25519Signature2018',
    publicKeyBase64: issuer.publicKey,
    created: this.now,
    proofPurpose: 'capabilityDelegation',
    verificationMethod: issuer.did + '#signing',
    jws: detachedSig
  };
  return proof;
};
