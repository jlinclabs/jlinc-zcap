'use strict';

const uuid = require('uuid');

module.exports = function issueDelegable(
  invokerDid, parentCapability
){
  /**
   * @param {object} parentCapability
   *
   * @param {string} parentCapability.apiEndpoint a URL
   * @param {object} parentCapability.issuer
   * @param {string} parentCapability.issuer.did reference to a JLINC DID signing key
   * @param {string} parentCapability.issuer.publicKey in Base64Url format.
   * @param {string} parentCapability.issuer.secretKey in Base64Url format.
   *
   * @param {array}  parentCapability.additionalContexts optional
   *
   * @returns {string} A JSON object
   */


  const capability = {};
  capability['@context'] = this.context;
  capability.id = 'urn:uuid:' + uuid.v4();
  capability.parentCapabilityId = parentCapability.id;
  capability.target = parentCapability.target;
  capability.invoker = invokerDid;
  if (parentCapability.caveats) {
    capability.caveats = parentCapability.caveats;
  }

  const proof = this.createProof({ issuer: parentCapability.issuer, proofObj: capability });
  capability.proof = [proof];

  return capability;
};
