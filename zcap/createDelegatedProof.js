'use strict';

const jlincJWT = require('@jlinc/jwt');
JSON.canonicalize = require('canonicalize');

module.exports = function createDelegatedProof({ invoker, delegator, proofObj }) {
  const proofObject = Object.assign({}, proofObj);
  const canonicalizedProof = JSON.canonicalize(proofObject);

  const delegatorJws = jlincJWT.signEdDsa(JSON.parse(canonicalizedProof), delegator.publicKey, delegator.secretKey, delegator.did + '#signing');
  const delegatorDetachedSig = this.makeDetachedSig(delegatorJws);

  const invokerJws = jlincJWT.signEdDsa(JSON.parse(canonicalizedProof), invoker.publicKey, invoker.secretKey, invoker.did + '#signing');
  const invokerDetachedSig = this.makeDetachedSig(invokerJws);

  const proof = [
    {
      type: 'Ed25519Signature2018',
      created: this.now,
      proofPurpose: 'capabilityDelegation',
      verificationMethod: delegator.did + '#signing',
      jws: delegatorDetachedSig
    },
    {
      type: 'Ed25519Signature2018',
      created: this.now,
      proofPurpose: 'capabilityInvocation',
      verificationMethod: invoker.did + '#signing',
      jws: invokerDetachedSig
    }
  ];
  return proof;
};
