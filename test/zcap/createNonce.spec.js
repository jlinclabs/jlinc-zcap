'use strict';

const auth = require('../../');

describe('createNonce', function() {
  it('should create a unique nonce', function(){
    const nonces = [];
    for (let n = 0; n < 100; n++){
      const nonce = auth.createNonce();
      expect(nonce).to.be.aNonce();
      expect(nonces).to.not.include(nonce);
      nonces.push(nonce);
    }
  });
});
