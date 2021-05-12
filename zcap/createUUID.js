'use strict';

const uuid = require('uuid');

module.exports = function createUUID() {
  return 'urn:uuid:' + uuid.v4();
};
