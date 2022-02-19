'use strict';

const {
  generateActor,
} = require('../helpers');
const zcap = require('../../');

const extractParentProof = function(zcap) {
  const zcapObject = Object.assign({}, zcap);
  const proof = Object.assign({}, zcap.proof);
  if (delete zcapObject.proof) {
    return {zcapObject, proof};
  } else {
    return {};
  }
};

describe('createParentCapability', function() {
  context('when given an issuer, a target URI, and optionally a caveats array', function(){
    it('should return a parent capability', function(){
      const issuer = generateActor();
      issuer.issuerUri = 'https://foobar.com';
      const targetUri = 'https://parent.foobar.com/somewhere';

      const parentCapability = zcap.createParentCapability(issuer, targetUri);

      expect(parentCapability).to.be.an('object');
      expect(Object.keys(parentCapability)).to.have.lengthOf(7);
      expect(parentCapability['@context'][0]).to.equal('https://example.org/zcap/v1');
      expect(parentCapability.id).to.matchPattern(_.isUUIDv4);
      expect(parentCapability.issuerID).to.equal(issuer.did);
      expect(parentCapability.targetUri).to.equal(targetUri);
      expect(parentCapability.caveats).to.be.an('array');
      expect(parentCapability.caveats).to.include('authorization');

      expect(parentCapability.proof).to.be.an('object');
      expect(Object.keys(parentCapability.proof)).to.have.lengthOf(6);

      expect(parentCapability.proof.type).to.equal('Ed25519Signature2018');
      expect(parentCapability.proof.publicKeyBase64).to.matchPattern(_.isB64);
      expect(parentCapability.proof.proofPurpose).to.equal('capabilityDelegation');
      expect(parentCapability.proof.verificationMethod).to.matchPattern(_.isSigningKey);
      expect(parentCapability.proof.jws).to.matchPattern(_.isDetachedSig);

      const ex = extractParentProof(parentCapability);
      expect(zcap.validateProof(ex.zcapObject, ex.proof)).to.be.true;
    });
  });


});
