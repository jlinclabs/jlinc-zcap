'use strict';

const fs = require('fs');
const hjson = require('hjson');
const uuid = require('uuid');

module.exports = function issueDelegable(
  invokerDid, parentCapability
){
  /**
   * @param {object} parentCapability The caller must submit this object, or rely on hjson defaults.
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

  const defaults = hjson.parse(fs.readFileSync('./defaults.hjson', 'utf8'));

  if (parentCapability === undefined) {
    parentCapability = defaults.parentCapability;
  } else {
    // arguments, where present, override defaults
    parentCapability = {...defaults.parentCapability, ...parentCapability};
  }

  const capability = {};
  capability['@context'] = defaults.context.concat(defaults.additionalContexts);
  capability.id = 'urn:uuid:' + uuid.v4();
  capability.target = parentCapability.target;
  capability.invoker = invokerDid;
  if (parentCapability.caveat) {
    capability.caveat = parentCapability.caveat;
  }

  const proof = this.createProof({ issuer: parentCapability.issuer, proofObj: capability });
  capability.proof = [proof];

  return JSON.stringify(capability);
};
