'use strict';

module.exports = function extractProof(zcap) {
  const zcapObject = Object.assign({}, zcap);
  const proof = Object.assign({}, zcap.proof);
  const proofArray = Object.values(proof);
  if (delete zcapObject.proof) {
    return {zcapObject, proof: proofArray};
  } else {
    return {};
  }
};
