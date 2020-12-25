'use strict';

const version = require('../../package.json').version;
const zcap = require('../../');

describe('zcap', function() {
  it('should match this pattern', function(){
    expect(zcap).to.matchPattern({
      version,
      JlincZcapError: _.isFunction,
      createNonce: _.isFunction,
      createDelegable: _.isFunction,
    });
  });
});
