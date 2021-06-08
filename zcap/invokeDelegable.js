'use strict';

const jwt  = require('@jlinc/jwt');
const fs = require('fs');
const hjson = require('hjson');
const uuid = require('uuid');

module.exports = function invokeDelegable(
  invoker, delegable, action
){
  /**
  * @param {object} invoker
  * @param {string} invoker.did reference to a JLINC DID signing key.
  * @param {string} invoker.publicKey in Base64Url format.
  * @param {string} invoker.secretKey in Base64Url format.
  *
  * @param {object} delegable A valid delegable object.
  *
  * @param {string} action An action being invoked.
  *
  * @returns {string} A JWS
  */

  const {JlincZcapError} = this;
  if (delegable.invoker !== invoker.did) {
    throw new JlincZcapError(`The invoker DID ${invoker.did} must be the same as the delegable invoker DID ${delegable.invoker}`);
  }

  const defaults = this.defaults || hjson.parse(fs.readFileSync('./defaults.hjson', 'utf8'));
  const invocation = {
    ['@context']: defaults.context.concat(defaults.additionalContexts),
    id: 'urn:uuid:' + uuid.v4(),
    action: action,
    created:  this.nowIso(),
    capability: delegable.id,
    invoker: invoker.did
  };

  const proof = this.createProof({ issuer: invoker, proofObj: invocation });
  invocation.proof = proof;

  const token = jwt.signEdDsa(invocation, invoker.publicKey, invoker.secretKey, invoker.did + '#signing');
  return token;
};
