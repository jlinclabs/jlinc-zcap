'use strict';

const { inspect } = require('util');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiMatchPattern = require('chai-match-pattern');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(chaiMatchPattern);
chai.use(sinonChai);

global.expect = chai.expect;
global._ = chaiMatchPattern.getLodashModule();

global.console.inspect = function(...args){
  return global.console.log(...args.map(arg => inspect(arg, { showHidden: true, depth: null })));
};

global.console.json = function(...args) {
  return global.console.log(args.map(o => JSON.stringify(o, null, 2)).join("\n"));
};

const NONCE_REGEXP = /^[a-z0-9]{64}$/;
const DID_REGEXP = /^did:jlinc:.+$/;
const JWT_REGEXP = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const UUID_V4_REGEXP = /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i;
const B64_REGEXP = /^[\w\-]+$/;

_.mixin({
  isNonce(target){
    return NONCE_REGEXP.test(target);
  },

  isDID(target){
    return DID_REGEXP.test(target);
  },

  isJWT(target){
    return JWT_REGEXP.test(target);
  },

  isIAT(target){
    return (
      _.isNumber(target) &&
      target <= Date.now() &&
      target > (Date.now() - 1000000)
    );
  },

  isUUIDv4(target){
    return target.match(UUID_V4_REGEXP);
  },

  isAuthId(target){
    return _.isUUIDv4(target);
  },

  isB64(target){
    return B64_REGEXP.test(target);
  },

});

chai.Assertion.addMethod('aNonce', function(){
  expect(this._obj).to.match(NONCE_REGEXP);
});

chai.Assertion.addMethod('aDID', function(){
  expect(this._obj).to.match(DID_REGEXP);
});

chai.Assertion.addMethod('aJWT', function(){
  expect(this._obj).to.match(JWT_REGEXP);
});
