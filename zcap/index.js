'use strict';

class JlincZcapError extends Error {
  constructor(message){
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};

module.exports =  {
  version: require('../package.json').version,
  // Custom Errors
  JlincZcapError,
  // Utilities
  createNonce: require('./createNonce'),
  createUUID: require('./createUUID'),
  nowIso: require('./nowIso'),
  createProof:  require('./createProof'),
  createDelegatedProof:  require('./createDelegatedProof'),
  makeDetachedSig:  require('./makeDetachedSig'),
  extractProof: require('./extractProof'),
  validateProof: require('./validateProof'),

  // Issue a delegable ZCAP
  issueDelegable: require('./issueDelegable'),

  // Delegate a ZCAP
  delegate: require('./delegate'),

  // Invoke a delegable ZCAP
  invokeDelegable: require('./invokeDelegable'),

  // Verify a ZCAP invocation
  verifyZcapInvocation: require('./verifyZcapInvocation'),

  // Retrieve a DID's signing public key
  getSigningKey: require('./getSigningKey'),

};
