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
  context: ['https://example.org/zcap/v1'],
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

  // Retrieve a DID's signing public key
  getSigningKey: require('./getSigningKey'),

  // Working methods
  createParentCapability: require('./createParentCapability'),
  issueDelegable: require('./issueDelegable'),
  delegate: require('./delegate'),
  invokeDelegable: require('./invokeDelegable'),
  verifyZcapInvocation: require('./verifyZcapInvocation'),

};
