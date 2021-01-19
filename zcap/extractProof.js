'use strict';

module.exports = function extractProof(zcap) {
  const zcapObject = Object.assign({}, zcap);
  const proof = zcap.proof;
  if (delete zcapObject.proof) {
    return {zcapObject, proof};
  } else {
    return {};
  }
};
