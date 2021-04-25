'use strict';

const {
  generateActor,
} = require('../helpers');
const zcap = require('../../');

describe('invokeDelegable', function() {
  context('when given a invoker, a delegable capability, and an action string', function(){
    it('should return a ZCAP invocation', function(){
      const invoker = generateActor();
      const delegable = JSON.parse(zcap.issueDelegable(invoker.did, {caveat: ['authorization']}));

      const token = zcap.invokeDelegable(invoker, delegable, 'authorization');
      expect(token).to.matchPattern(_.isJWT);

      const invocation = zcap.verifyZcapInvocation(token);

      expect(invocation).to.be.an('object');
      expect(Object.keys(invocation)).to.have.lengthOf(5);
      expect(invocation.verified).to.be.true;
      expect(invocation.invoker).to.matchPattern(_.isDID);
      expect(invocation.invoker).to.equal(invoker.did);
      expect(invocation.parentCapabilityId).to.equal(invocation.zcap.id);
    });
  });

  context('when given a wrong invoker', function(){
    it('should throw error', function(){
      const invoker = generateActor();
      const wrongInvoker = generateActor();
      const delegable = JSON.parse(zcap.issueDelegable(invoker.did, {caveat: ['authorization']}));

      expect(() => {
        zcap.invokeDelegable(wrongInvoker, delegable, 'authorization');
      }).to.throw(`The invoker DID ${wrongInvoker.did} must be the same as the delegable invoker DID ${invoker.did}`);
    });
  });
});
