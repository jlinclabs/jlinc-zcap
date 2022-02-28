'use strict';

const uuid = require('uuid');

module.exports = function delegate(
  invoker, parentId, delegator, caveats
){
  /**
  * @param {object} invoker
  * @param {string} invoker.did reference to a JLINC DID signing key
  * @param {string} invoker.publicKey in Base64Url format.
  * @param {string} invoker.secretKey in Base64Url format.
  *
  * @param {string} parentId a unique string identifying a source capability
  *
  * @param {object} delegator
  * @param {string} delegator.did reference to a JLINC DID signing key
  * @param {string} delegator.publicKey in Base64Url format.
  * @param {string} delegator.secretKey in Base64Url format.
  *
  * @param {array}  caveats optional array of caveat objects
  *
  * @returns {string} A JSON object
  */

  const capability = {};
  capability['@context'] = this.context;
  capability.parentCapabilityId = parentId;
  capability.id = 'urn:uuid:' + uuid.v4();
  capability.invoker = invoker.did;
  if (caveats !== undefined) {
    capability.caveats = caveats;
  } else {
    capability.caveats = ['authorization'];
  }

  const proof = this.createDelegatedProof({ invoker, delegator, proofObj: capability });
  capability.proof = proof;

  return capability;
};
