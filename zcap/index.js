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
  makeDetachedSig:  require('./makeDetachedSig'),

  // Create a delegable ZCAP
  createDelegable: require('./createDelegable'),

};
