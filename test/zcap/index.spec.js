'use strict';

const version = require('../../package.json').version;
const zcap = require('../../');

describe('zcap', function() {
  it('should match this pattern', function(){
    expect(zcap).to.matchPattern({
      version,
      JlincZcapError: _.isFunction,
      now: _.isFunction,
      createNonce: _.isFunction,
      makeDetachedSig:  _.isFunction,
      createDelegable: _.isFunction,
      delegate: _.isFunction,
      createDelegableProof:  _.isFunction,
      createDelegatedProof:  _.isFunction,

    });
  });
});
