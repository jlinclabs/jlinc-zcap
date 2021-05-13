'use strict';

const fs = require('fs');
const hjson = require('hjson');
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
   * @param {object} delegator The caller must submit this object, or rely on hjson defaults.
   * @param {string} delegator.did reference to a JLINC DID signing key
   * @param {string} delegator.publicKey in Base64Url format.
   * @param {string} delegator.secretKey in Base64Url format.
   *
   * @param {array}  caveats optional array of caveat objects
   *
   * @returns {string} A JSON object
   */

  const defaults = hjson.parse(fs.readFileSync('./defaults.hjson', 'utf8'));

  if (delegator === undefined) {
    delegator = defaults.delegator;
  } else {
    // arguments, where present, override defaults
    delegator = {...defaults.delegator, ...delegator};
  }

  const capability = {};
  capability['@context'] = defaults.context.concat(defaults.additionalContexts);
  capability.parentCapabilityId = defaults.parentCapability.id;
  capability.id = 'urn:uuid:' + uuid.v4();
  capability.invoker = invoker.did;
  if (caveats !== undefined) {
    capability.caveat = caveats;
  }

  const proof = this.createDelegatedProof({ invoker, delegator, proofObj: capability });
  capability.proof = proof;

  return capability;
};
