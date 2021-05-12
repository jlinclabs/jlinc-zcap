'use strict';

const version = require('../../package.json').version;
const zcap = require('../../');

describe('zcap', function() {
  it('should match this pattern', function(){
    expect(zcap).to.matchPattern({
      version,
      JlincZcapError: _.isFunction,
      nowIso: _.isFunction,
      createNonce: _.isFunction,
      createUUID: _.isFunction,
      extractProof:  _.isFunction,
      validateProof:  _.isFunction,
      makeDetachedSig:  _.isFunction,
      issueDelegable: _.isFunction,
      delegate: _.isFunction,
      createProof:  _.isFunction,
      createDelegatedProof:  _.isFunction,
      invokeDelegable:  _.isFunction,
      verifyZcapInvocation:  _.isFunction,
      getSigningKey:  _.isFunction,
    });
  });
});
