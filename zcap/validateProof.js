'use strict';

const jwt = require('@jlinc/jwt');
JSON.canonicalize = require('canonicalize');
const b64 = require('urlsafe-base64');

module.exports = function validateProof(zcapObject, proof) {
  const {JlincZcapError} = this;
  const canonicalized = JSON.canonicalize(zcapObject);
  const buf = Buffer.from(canonicalized);
  const pieces = proof.jws.split('.');
  pieces[1] = b64.encode(buf);
  const token = pieces.join('.');

  try {
    jwt.verifyEdDsa(token, proof.publicKeyBase64);
    return true;
  } catch (e) {
    throw new JlincZcapError(`${e.message} on ${proof.proofPurpose}`);
  }
};
