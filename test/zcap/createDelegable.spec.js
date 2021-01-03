'use strict';

const {
  generateActor,
} = require('../helpers');
const zcap = require('../../');

describe('createDelegable', function() {
  context('when given a invoker DID and capability keys', function(){
    it('should return a delegable ZCAP', function(){
      const  {
        did, signingKeys
      } = generateActor();
      const issuer = {
        did,
        publicKey: signingKeys.signingPublicKey,
        secretKey: signingKeys.signingPrivateKey
      };
      const parentCapability = {
        target: 'https://example.com/zcap-login',
        issuer,
        authorizationEndpoint: 'https://example.com/api/issue-zcap'
      };

      const result = zcap.createDelegable(did, parentCapability);
      expect(result).to.be.a('string');
      const delegableCapability = JSON.parse(result);
      expect(delegableCapability).to.be.an('object');
      expect(Object.keys(delegableCapability)).to.have.lengthOf(5);
      expect(delegableCapability['@context'][0]).to.equal('https://w3id.org/security/v2');
      expect(delegableCapability.id).to.matchPattern(_.isUUIDv4);
      expect(delegableCapability.parentCapability).to.equal('https://example.com/zcap-login');
      expect(delegableCapability.invoker).to.matchPattern(_.isDID);

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
