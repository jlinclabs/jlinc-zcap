'use strict';

const uuid = require('uuid');
const {
  generateActor,
} = require('../helpers');
const zcap = require('../../');

describe('issueDelegable', function() {
  context('when given a invoker DID and capability keys', function(){
    it('should return a delegable ZCAP', function(){
      const issuer = generateActor();
      const invoker = generateActor();
      const parentCapability = {
        target: 'https://example.com/zcap-login',
        issuer,
        id: 'urn:uuid:' + uuid.v4(),
        authorizationEndpoint: 'https://example.com/api/issue-zcap'
      };

      const delegableCapability = zcap.issueDelegable(invoker.did, parentCapability);

      expect(delegableCapability).to.be.an('object');
      expect(Object.keys(delegableCapability)).to.have.lengthOf(6);
      expect(delegableCapability['@context'][0]).to.equal('https://example.org/zcap/v1');
      expect(delegableCapability.id).to.matchPattern(_.isUUIDv4);
      expect(delegableCapability.parentCapabilityId).to.matchPattern(_.isUUIDv4);
      expect(delegableCapability.target).to.equal('https://example.com/zcap-login');
      expect(delegableCapability.invoker).to.matchPattern(_.isDID);
      expect(delegableCapability.invoker).to.equal(invoker.did);

      expect(delegableCapability.proof).to.be.an('array');
      expect(delegableCapability.proof[0]).to.be.an('object');
      expect(Object.keys(delegableCapability.proof[0])).to.have.lengthOf(6);
      expect(delegableCapability.proof[0].type).to.equal('Ed25519Signature2018');
      expect(delegableCapability.proof[0].publicKeyBase64).to.matchPattern(_.isB64);
      expect(delegableCapability.proof[0].proofPurpose).to.equal('capabilityDelegation');
      expect(delegableCapability.proof[0].verificationMethod).to.matchPattern(_.isSigningKey);
      expect(delegableCapability.proof[0].jws).to.matchPattern(_.isDetachedSig);
    });
  });


});
