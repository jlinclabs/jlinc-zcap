'use strict';

const uuid = require('uuid');
const {
  generateActor,
} = require('../helpers');
const zcap = require('../../');

describe('delegate', function() {
  context('when given an invoker object, a parentCapability object, a delegator object, and optionally a caveats array', function(){
    it('should return a delegated ZCAP', function(){
      const issuer = generateActor();
      const delegator = generateActor();
      const invoker = generateActor();

      const parentCapability = {
        target: 'https://example.com/zcap-login',
        issuer,
        id: 'urn:uuid:' + uuid.v4()
      };

      const caveats = [
        { type: 'WhileValid',
          uri: 'https://testnet.did.jlinc.org/' + invoker.did
        }
      ];

      const delegableCapability = zcap.createDelegable(delegator.did, parentCapability);
      const result = zcap.delegate(invoker, delegableCapability.parentCapabilityId, delegator, caveats);
      expect(result).to.be.a('string');
      const delegatedCapability = JSON.parse(result);

      console.log('delegableCapability', JSON.parse(delegableCapability));
      console.log('delegatedCapability', delegatedCapability);

      expect(delegatedCapability).to.be.an('object');
      expect(Object.keys(delegatedCapability)).to.have.lengthOf(5);
      expect(delegatedCapability['@context'][0]).to.equal('https://w3id.org/security/v2');
      expect(delegatedCapability.id).to.matchPattern(_.isUUIDv4);
      expect(delegatedCapability.invoker).to.equal(invoker.did);
      expect(delegatedCapability.caveat).to.deep.include(caveats[0]);

      expect(delegatedCapability.proof).to.be.an('array');
      expect(delegatedCapability.proof).to.have.lengthOf(2);

      expect(delegatedCapability.proof[0].type).to.equal('Ed25519Signature2018');
      expect(delegatedCapability.proof[0].proofPurpose).to.equal('capabilityDelegation');
      expect(delegatedCapability.proof[0].verificationMethod).to.matchPattern(_.isSigningKey);
      expect(delegatedCapability.proof[0].jws).to.matchPattern(_.isDetachedSig);

      expect(delegatedCapability.proof[1].type).to.equal('Ed25519Signature2018');
      expect(delegatedCapability.proof[1].proofPurpose).to.equal('capabilityInvocation');
      expect(delegatedCapability.proof[1].verificationMethod).to.matchPattern(_.isSigningKey);
      expect(delegatedCapability.proof[1].jws).to.matchPattern(_.isDetachedSig);


      //TODO: validate both proof jws
    });
  });


});
