'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

//const zcap = require('../');

function generateUrl(){
  const port = Math.round(Math.random() * 10000);
  return `http://localhost:${port}`;
}

function generateSigningKeys(){
  const { publicKey, secretKey } = sodium.crypto_sign_keypair();
  return {
    signingPublicKey: b64.encode(publicKey),
    signingPrivateKey: b64.encode(secretKey),
  };
}

function generateActor(){
  const signingKeys = generateSigningKeys();
  const did = `did:jlinc:${signingKeys.signingPublicKey}`;
  return { did, signingKeys };
}

function generateDID(){
  const { did } = generateActor();
  return did;
}



module.exports = {
  generateUrl,
  generateSigningKeys,
  generateActor,
  generateDID,
};
