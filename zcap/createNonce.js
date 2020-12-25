'use strict';

const crypto = require('crypto');

module.exports = function createNonce() {
  return crypto.randomBytes(32).toString('hex');
};
