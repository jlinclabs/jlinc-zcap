'use strict';

const zcap = require('../');
const { generateActor } = require('./helpers');


it('end-to-end', function(){
  const siteA = createSite();
  const siteB = createSite();
  createSiteAuthCapability(siteA, siteB);

  const user1 = createUser();
  sendUser(siteA, siteB, user1);
  // sendUser(siteA, createSite(), user1)
});


let siteIdSeq = 0;
function createSite(){
  const id = siteIdSeq++;
  const domain = `https://site${id}.com`;
  const site = {
    url: `${domain}`,
    zcapLoginUrl: `${domain}/zcap-login`,
    identity: generateActor(),
    authCapabilities: { /* by site url */ },
  };
  return site;
}

function createSiteAuthCapability(siteA, siteB){
  // one of these is needed for each app -> app single-direction
  const capability = zcap.createParentCapability(
    {...siteA.identity, issuerUri: siteA.url},
    siteB.zcapLoginUrl,
    ['authorization'],
  );
  expect(capability).to.matchPattern({
    '@context': zcap.context,
    id: _.isAuthId,
    issuerID: siteA.identity.did,
    issuerUri: siteA.url,
    targetUri: siteB.zcapLoginUrl,
    caveats: ['authorization'],
    proof: _.isObject,
  });
  siteA.authCapabilities[siteB.url] = capability;
}

function createUser(){
  return {
    id: 1,
    email: 'user1@example.com',
    identity: generateActor(),
  };
}

function sendUser(fromSite, toSite, user){
  const capability = fromSite.authCapabilities[toSite.url];
  expect(
    capability,
    `expected auth capability ${fromSite.url} => ${toSite.url}`
  ).to.exist;
  const pii = {email: user.email};
  const delegatedCapability = zcap.delegate(
    user.identity,
    capability.id,
    fromSite.identity,
    ['authorization'],
    pii,
  );
  expect(delegatedCapability).to.matchPattern({
    '@context': zcap.context,
    parentCapabilityId: capability.id,
    id: _.isAuthId,
    invoker: _.isDID,
    caveats: ['authorization'],
    pii,
    proof: _.isArray,
  });
  const jwt = zcap.invokeDelegable(
    user.identity,
    delegatedCapability,
  );

  // JWT sent over HTTP here

  const unpacked = zcap.verifyZcapInvocation(jwt);
  expect(unpacked).to.matchPattern({
    verified: true,
    wrapper: {
      key: _.isString,
      keyId: _.isString,
    },
    zcap: {
      '@context': zcap.context,
      id: _.isAuthId,
      created: _.isDateString,
      capability: _.isAuthId,
      invoker: user.identity.did,
      pii,
      proof: _.isObject,
      // toSite verifies pre-persisted capability.id,
      // might even use this to lookup sending site
      parentCapabilityId: capability.id,
    },
    id: _.isAuthId,
    invoker: user.identity.did,
    parentCapabilityId: capability.id,
  });
}

