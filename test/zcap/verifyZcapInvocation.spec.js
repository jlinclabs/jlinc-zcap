'use strict';
//TODO: redo this test to use "caveats" instead of "caveat"

const zcap = require('../../zcap');
const validZcap = {
  '@context': [ 'https://w3id.org/security/v2' ],
  parentCapabilityId: 'urn:uuid:0e15f5cd-d188-4c51-bf88-fe400eb6ebad',
  id: 'urn:uuid:23b4b1ff-5167-4ced-b037-ac18d97c0ac1',
  invoker: 'did:jlinc:6rLYRDOkU4CKevtdjEHu2E_-uOce-WL6O6U9KZQApYI',
  caveat: [
    {
      type: 'WhileValid',
      uri: 'https://testnet.did.jlinc.org/did:jlinc:6rLYRDOkU4CKevtdjEHu2E_-uOce-WL6O6U9KZQApYI'
    }
  ],
  proof: [
    {
      type: 'Ed25519Signature2018',
      publicKeyBase64: 'i0uYuIX0M3Jy4ZMPuTXLjtmDsrIM44F8NM86qwZHG8E',
      proofPurpose: 'capabilityDelegation',
      verificationMethod: 'did:jlinc:i0uYuIX0M3Jy4ZMPuTXLjtmDsrIM44F8NM86qwZHG8E#signing',
      jws: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6ImkwdVl1SVgwTTNKeTRaTVB1VFhManRtRHNySU00NEY4Tk04NnF3WkhHOEUiLCJraWQiOiJkaWQ6amxpbmM6aTB1WXVJWDBNM0p5NFpNUHVUWExqdG1Ec3JJTTQ0RjhOTTg2cXdaSEc4RSNzaWduaW5nIn19..5O6SHqIe34vuisKreuv_jtRtFgv80XMn_usls4uHQ7ANijj29xo4sGcM_kcc9iGMuI1CcIoLq4AKWq4UO2_hCg'
    },
    {
      type: 'Ed25519Signature2018',
      publicKeyBase64: '6rLYRDOkU4CKevtdjEHu2E_-uOce-WL6O6U9KZQApYI',
      proofPurpose: 'capabilityInvocation',
      verificationMethod: 'did:jlinc:6rLYRDOkU4CKevtdjEHu2E_-uOce-WL6O6U9KZQApYI#signing',
      jws: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6IjZyTFlSRE9rVTRDS2V2dGRqRUh1MkVfLXVPY2UtV0w2TzZVOUtaUUFwWUkiLCJraWQiOiJkaWQ6amxpbmM6NnJMWVJET2tVNENLZXZ0ZGpFSHUyRV8tdU9jZS1XTDZPNlU5S1pRQXBZSSNzaWduaW5nIn19..LOrPXNGoVvshlY4zMrwS6XaTVHEI6PQsjEU1WxM11chY_L-TNhwF1MKdQZ6aDCss0unZ8eTSSOz5gwF8lLUpCg'
    }
  ]
};
const badDelegator = '{"@context":["https://w3id.org/security/v2"],"parentCapabilityId":"urn:uuid:0e15f5cd-d188-4c51-bf88-fe400eb6ebad","id":"urn:uuid:23b4b1ff-5167-4ced-b037-ac18d97c0ac1","invoker":"did:jlinc:6rLYRDOkU4CKevtdjEHu2E_-uOce-WL6O6U9KZQApYI","caveat":[{"type":"WhileValid","uri":"https://testnet.did.jlinc.org/did:jlinc:6rLYRDOkU4CKevtdjEHu2E_-uOce-WL6O6U9KZQApYI"}],"proof":[{"type":"Ed25519Signature2018","publicKeyBase64":"BkqgAVpbS_iJ6_tGXS8IrD0-yp5N24FZkq2ecR-vuDY","proofPurpose":"capabilityDelegation","verificationMethod":"did:jlinc:i0uYuIX0M3Jy4ZMPuTXLjtmDsrIM44F8NM86qwZHG8E#signing","jws":"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6ImkwdVl1SVgwTTNKeTRaTVB1VFhManRtRHNySU00NEY4Tk04NnF3WkhHOEUiLCJraWQiOiJkaWQ6amxpbmM6aTB1WXVJWDBNM0p5NFpNUHVUWExqdG1Ec3JJTTQ0RjhOTTg2cXdaSEc4RSNzaWduaW5nIn19..5O6SHqIe34vuisKreuv_jtRtFgv80XMn_usls4uHQ7ANijj29xo4sGcM_kcc9iGMuI1CcIoLq4AKWq4UO2_hCg"},{"type":"Ed25519Signature2018","publicKeyBase64":"6rLYRDOkU4CKevtdjEHu2E_-uOce-WL6O6U9KZQApYI","proofPurpose":"capabilityInvocation","verificationMethod":"did:jlinc:6rLYRDOkU4CKevtdjEHu2E_-uOce-WL6O6U9KZQApYI#signing","jws":"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6IjZyTFlSRE9rVTRDS2V2dGRqRUh1MkVfLXVPY2UtV0w2TzZVOUtaUUFwWUkiLCJraWQiOiJkaWQ6amxpbmM6NnJMWVJET2tVNENLZXZ0ZGpFSHUyRV8tdU9jZS1XTDZPNlU5S1pRQXBZSSNzaWduaW5nIn19..LOrPXNGoVvshlY4zMrwS6XaTVHEI6PQsjEU1WxM11chY_L-TNhwF1MKdQZ6aDCss0unZ8eTSSOz5gwF8lLUpCg"}]}';

const badInvoker = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6Im1ZNXEyX3FpSmFhb1FETVRkTGo1NnRrUDUyaVV4WGcwcFNiOHUtUzFpQTAiLCJraWQiOiJkaWQ6amxpbmM6bVk1cTJfcWlKYWFvUURNVGRMajU2dGtQNTJpVXhYZzBwU2I4dS1TMWlBMCNzaWduaW5nIn19.eyJAY29udGV4dCI6WyJodHRwczovL3czaWQub3JnL3NlY3VyaXR5L3YyIl0sInBhcmVudENhcGFiaWxpdHlJZCI6InVybjp1dWlkOjBlMTVmNWNkLWQxODgtNGM1MS1iZjg4LWZlNDAwZWI2ZWJhZCIsImlkIjoidXJuOnV1aWQ6MjNiNGIxZmYtNTE2Ny00Y2VkLWIwMzctYWMxOGQ5N2MwYWMxIiwiaW52b2tlciI6ImRpZDpqbGluYzo2ckxZUkRPa1U0Q0tldnRkakVIdTJFXy11T2NlLVdMNk82VTlLWlFBcFlJIiwiY2F2ZWF0IjpbeyJ0eXBlIjoiV2hpbGVWYWxpZCIsInVyaSI6Imh0dHBzOi8vdGVzdG5ldC5kaWQuamxpbmMub3JnL2RpZDpqbGluYzo2ckxZUkRPa1U0Q0tldnRkakVIdTJFXy11T2NlLVdMNk82VTlLWlFBcFlJIn1dLCJwcm9vZiI6W3sidHlwZSI6IkVkMjU1MTlTaWduYXR1cmUyMDE4IiwicHVibGljS2V5QmFzZTY0IjoiaTB1WXVJWDBNM0p5NFpNUHVUWExqdG1Ec3JJTTQ0RjhOTTg2cXdaSEc4RSIsInByb29mUHVycG9zZSI6ImNhcGFiaWxpdHlEZWxlZ2F0aW9uIiwidmVyaWZpY2F0aW9uTWV0aG9kIjoiZGlkOmpsaW5jOmkwdVl1SVgwTTNKeTRaTVB1VFhManRtRHNySU00NEY4Tk04NnF3WkhHOEUjc2lnbmluZyIsImp3cyI6ImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0ltcDNheUk2ZXlKcmRIa2lPaUpQUzFBaUxDSmpjbllpT2lKRlpESTFOVEU1SWl3aWVDSTZJbWt3ZFZsMVNWZ3dUVE5LZVRSYVRWQjFWRmhNYW5SdFJITnlTVTAwTkVZNFRrMDRObkYzV2toSE9FVWlMQ0pyYVdRaU9pSmthV1E2YW14cGJtTTZhVEIxV1hWSldEQk5NMHA1TkZwTlVIVlVXRXhxZEcxRWMzSkpUVFEwUmpoT1RUZzJjWGRhU0VjNFJTTnphV2R1YVc1bkluMTkuLjVPNlNIcUllMzR2dWlzS3JldXZfanRSdEZndjgwWE1uX3VzbHM0dUhRN0FOaWpqMjl4bzRzR2NNX2tjYzlpR011STFDY0lvTHE0QUtXcTRVTzJfaENnIn0seyJ0eXBlIjoiRWQyNTUxOVNpZ25hdHVyZTIwMTgiLCJwdWJsaWNLZXlCYXNlNjQiOiJCa3FnQVZwYlNfaUo2X3RHWFM4SXJEMC15cDVOMjRGWmtxMmVjUi12dURZIiwicHJvb2ZQdXJwb3NlIjoiY2FwYWJpbGl0eUludm9jYXRpb24iLCJ2ZXJpZmljYXRpb25NZXRob2QiOiJkaWQ6amxpbmM6NnJMWVJET2tVNENLZXZ0ZGpFSHUyRV8tdU9jZS1XTDZPNlU5S1pRQXBZSSNzaWduaW5nIiwiandzIjoiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0lzSW1wM2F5STZleUpyZEhraU9pSlBTMUFpTENKamNuWWlPaUpGWkRJMU5URTVJaXdpZUNJNklqWnlURmxTUkU5clZUUkRTMlYyZEdScVJVaDFNa1ZmTFhWUFkyVXRWMHcyVHpaVk9VdGFVVUZ3V1VraUxDSnJhV1FpT2lKa2FXUTZhbXhwYm1NNk5uSk1XVkpFVDJ0Vk5FTkxaWFowWkdwRlNIVXlSVjh0ZFU5alpTMVhURFpQTmxVNVMxcFJRWEJaU1NOemFXZHVhVzVuSW4xOS4uTE9yUFhOR29WdnNobFk0ek1yd1M2WGFUVkhFSTZQUXNqRVUxV3hNMTFjaFlfTC1UTmh3RjFNS2RRWjZhRENzczB1blo4ZVRTU096NWd3RjhsTFVwQ2cifV19.cQjEh6qM06gpiGqSEAV032-2ve0Ejvt1rWtjSArEz80hYUrMcx4hLCHLr-u2ryeXkrhjCiUtLW0o3imLylvWBw';

describe('verifyZcapInvocation', function() {

  context('when given a valid zcap', function(){
    const result = zcap.verifyZcapInvocation(validZcap);
    it('should return a deconstructed object', function(){
      expect(result).to.be.an('object');
      expect(result.verified).to.be.true;
      expect(result.zcap).to.deep.equal(validZcap);
      expect(result.parentCapabilityId).to.equal(validZcap.parentCapabilityId);
      expect(result.id).to.equal(validZcap.id);
      expect(result.invoker).to.equal(validZcap.invoker);
      expect(result.zcap.caveat).to.deep.equal(validZcap.caveat);
    });
  });

  context('when given unexpected input', function(){
    it('should throw error', function(){
      expect(() => {
        zcap.verifyZcapInvocation();
      }).to.throw('input must be an object, a JSON string, or a valid JWS');
    });
  });

  context('when given JSON string with bad signature on delegator', function(){
    it('should throw error', function(){
      expect(() => {
        zcap.verifyZcapInvocation(badDelegator);
      }).to.throw(/invalid signature on capabilityDelegation/);
    });
  });

  context('when given JWT with bad signature on invoker', function(){
    it('should throw error', function(){
      expect(() => {
        zcap.verifyZcapInvocation(badInvoker);
      }).to.throw(/invalid signature on capabilityInvocation/);
    });
  });

});
