'use strict';

const zcap = require('../../zcap');
const validZcap = {
  '@context': [ 'https://w3id.org/security/v2' ],
  id: 'urn:uuid:176f9dcd-2d1e-4daa-9c8b-036f424abeb4',
  invoker: 'did:jlinc:k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w',
  caveat: [
    {
      type: 'WhileValid',
      uri: 'https://testnet.did.jlinc.org/did:jlinc:k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w'
    }
  ],
  proof: [
    {
      type: 'Ed25519Signature2018',
      publicKeyBase64: 'ZF4ZziEEEDmxSupBT71WzBaFb3DasBgUvJCQTzIAZ_8',
      proofPurpose: 'capabilityDelegation',
      verificationMethod: 'did:jlinc:ZF4ZziEEEDmxSupBT71WzBaFb3DasBgUvJCQTzIAZ_8#signing',
      jws: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6IlpGNFp6aUVFRURteFN1cEJUNzFXekJhRmIzRGFzQmdVdkpDUVR6SUFaXzgiLCJraWQiOiJkaWQ6amxpbmM6WkY0WnppRUVFRG14U3VwQlQ3MVd6QmFGYjNEYXNCZ1V2SkNRVHpJQVpfOCNzaWduaW5nIn19..cVlj57wl9vxYRgQAoqtTDCOOlyTNV9Hs429sv41hcYI8KIu-PCp-KR4qj4XM6trH9t-VQO4_h3xXwpXTeuSGAA'
    },
    {
      type: 'Ed25519Signature2018',
      publicKeyBase64: 'k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w',
      proofPurpose: 'capabilityInvocation',
      verificationMethod: 'did:jlinc:k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w#signing',
      jws: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6Ims0Qk9pYW1oMExaQzdDZEs5NnFCeXRrVVZfbFlJamJFUzhteGFDWFVaOXciLCJraWQiOiJkaWQ6amxpbmM6azRCT2lhbWgwTFpDN0NkSzk2cUJ5dGtVVl9sWUlqYkVTOG14YUNYVVo5dyNzaWduaW5nIn19.._1CT5FzCFPXTpUb-cjppq-0lhscOHOqfm1-BNOgIsi6qtRVyKyCwn0gM8NoAiaTyUocjnajlAL1Z5qTgyAV1Dg'
    }
  ]
};
const invalidZcap1 = '{"@context":["https://w3id.org/security/v2"],"id":"urn:uuid:176f9dcd-2d1e-4daa-9c8b-036f424abeb4","invoker":"did:jlinc:k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w","caveat":[{"type":"WhileValid","uri":"https://testnet.did.jlinc.org/did:jlinc:k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w"}],"proof":[{"type":"Ed25519Signature2018","publicKeyBase64":"k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w","proofPurpose":"capabilityDelegation","verificationMethod":"did:jlinc:ZF4ZziEEEDmxSupBT71WzBaFb3DasBgUvJCQTzIAZ_8#signing","jws":"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6IlpGNFp6aUVFRURteFN1cEJUNzFXekJhRmIzRGFzQmdVdkpDUVR6SUFaXzgiLCJraWQiOiJkaWQ6amxpbmM6WkY0WnppRUVFRG14U3VwQlQ3MVd6QmFGYjNEYXNCZ1V2SkNRVHpJQVpfOCNzaWduaW5nIn19..cVlj57wl9vxYRgQAoqtTDCOOlyTNV9Hs429sv41hcYI8KIu-PCp-KR4qj4XM6trH9t-VQO4_h3xXwpXTeuSGAA"},{"type":"Ed25519Signature2018","publicKeyBase64":"k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w","proofPurpose":"capabilityInvocation","verificationMethod":"did:jlinc:k4BOiamh0LZC7CdK96qBytkUV_lYIjbES8mxaCXUZ9w#signing","jws":"eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6Ims0Qk9pYW1oMExaQzdDZEs5NnFCeXRrVVZfbFlJamJFUzhteGFDWFVaOXciLCJraWQiOiJkaWQ6amxpbmM6azRCT2lhbWgwTFpDN0NkSzk2cUJ5dGtVVl9sWUlqYkVTOG14YUNYVVo5dyNzaWduaW5nIn19.._1CT5FzCFPXTpUb-cjppq-0lhscOHOqfm1-BNOgIsi6qtRVyKyCwn0gM8NoAiaTyUocjnajlAL1Z5qTgyAV1Dg"}]}';

const invalidZcap2 = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCIsImp3ayI6eyJrdHkiOiJPS1AiLCJjcnYiOiJFZDI1NTE5IiwieCI6Im1ZNXEyX3FpSmFhb1FETVRkTGo1NnRrUDUyaVV4WGcwcFNiOHUtUzFpQTAiLCJraWQiOiJkaWQ6amxpbmM6bVk1cTJfcWlKYWFvUURNVGRMajU2dGtQNTJpVXhYZzBwU2I4dS1TMWlBMCNzaWduaW5nIn19.eyJAY29udGV4dCI6WyJodHRwczovL3czaWQub3JnL3NlY3VyaXR5L3YyIl0sImlkIjoidXJuOnV1aWQ6MTc2ZjlkY2QtMmQxZS00ZGFhLTljOGItMDM2ZjQyNGFiZWI0IiwiaW52b2tlciI6ImRpZDpqbGluYzprNEJPaWFtaDBMWkM3Q2RLOTZxQnl0a1VWX2xZSWpiRVM4bXhhQ1hVWjl3IiwiY2F2ZWF0IjpbeyJ0eXBlIjoiV2hpbGVWYWxpZCIsInVyaSI6Imh0dHBzOi8vdGVzdG5ldC5kaWQuamxpbmMub3JnL2RpZDpqbGluYzprNEJPaWFtaDBMWkM3Q2RLOTZxQnl0a1VWX2xZSWpiRVM4bXhhQ1hVWjl3In1dLCJwcm9vZiI6W3sidHlwZSI6IkVkMjU1MTlTaWduYXR1cmUyMDE4IiwicHVibGljS2V5QmFzZTY0IjoiWkY0WnppRUVFRG14U3VwQlQ3MVd6QmFGYjNEYXNCZ1V2SkNRVHpJQVpfOCIsInByb29mUHVycG9zZSI6ImNhcGFiaWxpdHlEZWxlZ2F0aW9uIiwidmVyaWZpY2F0aW9uTWV0aG9kIjoiZGlkOmpsaW5jOlpGNFp6aUVFRURteFN1cEJUNzFXekJhRmIzRGFzQmdVdkpDUVR6SUFaXzgjc2lnbmluZyIsImp3cyI6ImV5SmhiR2NpT2lKRlpFUlRRU0lzSW5SNWNDSTZJa3BYVkNJc0ltcDNheUk2ZXlKcmRIa2lPaUpQUzFBaUxDSmpjbllpT2lKRlpESTFOVEU1SWl3aWVDSTZJbHBHTkZwNmFVVkZSVVJ0ZUZOMWNFSlVOekZYZWtKaFJtSXpSR0Z6UW1kVmRrcERVVlI2U1VGYVh6Z2lMQ0pyYVdRaU9pSmthV1E2YW14cGJtTTZXa1kwV25wcFJVVkZSRzE0VTNWd1FsUTNNVmQ2UW1GR1lqTkVZWE5DWjFWMlNrTlJWSHBKUVZwZk9DTnphV2R1YVc1bkluMTkuLmNWbGo1N3dsOXZ4WVJnUUFvcXRURENPT2x5VE5WOUhzNDI5c3Y0MWhjWUk4S0l1LVBDcC1LUjRxajRYTTZ0ckg5dC1WUU80X2gzeFh3cFhUZXVTR0FBIn0seyJ0eXBlIjoiRWQyNTUxOVNpZ25hdHVyZTIwMTgiLCJwdWJsaWNLZXlCYXNlNjQiOiJaRjRaemlFRUVEbXhTdXBCVDcxV3pCYUZiM0Rhc0JnVXZKQ1FUeklBWl84IiwicHJvb2ZQdXJwb3NlIjoiY2FwYWJpbGl0eUludm9jYXRpb24iLCJ2ZXJpZmljYXRpb25NZXRob2QiOiJkaWQ6amxpbmM6azRCT2lhbWgwTFpDN0NkSzk2cUJ5dGtVVl9sWUlqYkVTOG14YUNYVVo5dyNzaWduaW5nIiwiandzIjoiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0lzSW1wM2F5STZleUpyZEhraU9pSlBTMUFpTENKamNuWWlPaUpGWkRJMU5URTVJaXdpZUNJNkltczBRazlwWVcxb01FeGFRemREWkVzNU5uRkNlWFJyVlZaZmJGbEphbUpGVXpodGVHRkRXRlZhT1hjaUxDSnJhV1FpT2lKa2FXUTZhbXhwYm1NNmF6UkNUMmxoYldnd1RGcEROME5rU3prMmNVSjVkR3RWVmw5c1dVbHFZa1ZUT0cxNFlVTllWVm81ZHlOemFXZHVhVzVuSW4xOS4uXzFDVDVGekNGUFhUcFViLWNqcHBxLTBsaHNjT0hPcWZtMS1CTk9nSXNpNnF0UlZ5S3lDd24wZ004Tm9BaWFUeVVvY2puYWpsQUwxWjVxVGd5QVYxRGcifV19.DlLdxggSOMyJ9T3vV5rno5DoVQf5IyV5AfJ6s6MWKg23m8xrmVv85GvJDQpJt18l4FggQF5DrlAn8w8Nm6_aDA';

describe('verifyZcapInvocation', function() {

  context('when given a valid zcap', function(){
    const result = zcap.verifyZcapInvocation(validZcap);
    it('should return a deconstructed object', function(){
      expect(result).to.be.an('object');
      expect(result.verified).to.be.true;
      expect(result.zcap).to.deep.equal(validZcap);
      expect(result.id).to.equal(validZcap.id);
      expect(result.invoker).to.equal(validZcap.invoker);
      expect(result.caveats).to.deep.equal(validZcap.caveat);
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
        zcap.verifyZcapInvocation(invalidZcap1);
      }).to.throw(/invalid signature on capabilityDelegation/);
    });
  });

  context('when given JWT with bad signature on invoker', function(){
    it('should throw error', function(){
      expect(() => {
        zcap.verifyZcapInvocation(invalidZcap2);
      }).to.throw(/invalid signature on capabilityInvocation/);
    });
  });

});
