'use strict';

const NodeCache = require( "node-cache" );
const didCache = new NodeCache({stdTTL: 3600});

module.exports = async function getSigningKey(did) {
  /**
  * @param {string} did A DID in the did:jlinc:xxx format
  */

  const didServerUrl = this.didServerUrl || process.env.DID_SERVER_URL;
  const {JlincZcapError} = this;

  if (typeof did !== 'string' || !/^did:jlinc:[\w-]+$/.test(did)) {
    throw new JlincZcapError('input must be a JLINC DID');
  };

  let didResult = didCache.get(did);
  if (typeof didResult !== 'undefined') {
    didResult.fromCache = true;
    return didResult;
  } else {
    didResult = await resolveDid(did, didServerUrl);
    if (didResult.signingKey) {
      didCache.set(did, didResult);
    }
    return didResult;
  }
};

async function resolveDid(did, didServerUrl) {
  const axios  = require('axios');
  const axiosConfig = {
    method: 'get',
    baseURL: didServerUrl,
    url: '/' + did,
    validateStatus: function (status){ return status < 500; }
  };

  let response;
  try {
    response = await axios(axiosConfig);
  } catch (err) {
    throw new JlincZcapError(err.message);
  }

  if (response.status === 200) {
    const signingKeyStanza = response.data.did.publicKey
      .find((keyStanza) => {
        return /#signing$/.test(keyStanza.id);
      });
    if (signingKeyStanza.publicKeyBase64) {
      return {signingKey: signingKeyStanza.publicKeyBase64};
    } else if (signingKeyStanza.publicKeyBase58) {
      return {signingKey: b58tob64(signingKeyStanza.publicKeyBase58)};
    } else {
      return {status: 'unknown DID key format'};
    }
  } else {
    return response.data; //status object
  }
}

function b58tob64(b58str) {
  const base58BitcoinAlphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const base58 = require('base-x')(base58BitcoinAlphabet);
  const b64 = require('urlsafe-base64');
  return b64.encode(base58.decode(b58str));
}
