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
  now: require('./now'),
  createDelegableProof:  require('./createDelegableProof'),
  createDelegatedProof:  require('./createDelegatedProof'),
  makeDetachedSig:  require('./makeDetachedSig'),
  extractProof: require('./extractProof'),
  validateProof: require('./validateProof'),

  // Issue a delegable ZCAP
  issueDelegable: require('./issueDelegable'),

  // Delegate a ZCAP
  delegate: require('./delegate'),

  // Verify a ZCAP invocation
  verifyZcapInvocation: require('./verifyZcapInvocation'),

};
