'use strict';

const uuid = require('uuid');
const {
  generateActor,
} = require('../helpers');
const zcap = require('../../');

describe('createDelegable', function() {
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

      const result = zcap.createDelegable(invoker.did, parentCapability);
      expect(result).to.be.a('string');
      const delegableCapability = JSON.parse(result);

      console.log('delegableCapability', delegableCapability);

      expect(delegableCapability).to.be.an('object');
      expect(Object.keys(delegableCapability)).to.have.lengthOf(6);
      expect(delegableCapability['@context'][0]).to.equal('https://w3id.org/security/v2');
      expect(delegableCapability.id).to.matchPattern(_.isUUIDv4);
      expect(delegableCapability.target).to.equal('https://example.com/zcap-login');
      expect(delegableCapability.parentCapabilityId).to.equal(parentCapability.id);
      expect(delegableCapability.invoker).to.matchPattern(_.isDID);
      expect(delegableCapability.invoker).to.equal(invoker.did);

      expect(delegableCapability.proof).to.be.an('object');
      expect(Object.keys(delegableCapability.proof)).to.have.lengthOf(4);
      expect(delegableCapability.proof.type).to.equal('Ed25519Signature2018');
      expect(delegableCapability.proof.proofPurpose).to.equal('capabilityDelegation');
      expect(delegableCapability.proof.verificationMethod).to.matchPattern(_.isSigningKey);
      expect(delegableCapability.proof.jws).to.matchPattern(_.isDetachedSig);
      //TODO: validate proof jws
    });
  });


});
