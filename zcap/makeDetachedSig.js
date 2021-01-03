'use strict';

module.exports = function makeDetachedSig(jws) {
  const parts = jws.split('.');
  return parts[0] + '..' + parts[2];
};
