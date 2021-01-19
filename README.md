# JLINC ZCAP

This module, using authorization capabilities as described in [ZCAP-LD](https://w3c-ccg.github.io/zcap-ld/), provides methods intended to:

* create a delegable ZCAP so that one organization can provide a means for another organization to delegate to its members the ability to access data or be logged into the first organization
* use a delegable ZCAP to delegate that authority to an individual
* invoke the delegated authority
* verify that the invocation is correct and authoritative

Prerequisites:

* the organizations involved can persist ZCAPs and can revoke the authority by updating their internal records
* each organization and individual involved has obtained a DID that can be resolved to obtain its status and signing public key

### Usage

```js
const zcap = require('jlinc-zcap');
```

Create a delegable ZCAP

```js
const delegable = zcap.createDelegable( invokerDid, parentCapability );
// invokerDid is the DID of the entity to which this authority is being granted.
// parentCapability is an object that includes a pointer to the target url that
// this capability will operate against, as well as cryptographic material for
// the granting authority.
//
// Part or all of the parentCapability object's values may be provided in a
// defaults.hjson file -- see defaults-example.hjson
//
// If a parentCapability object is provided in the method arguments, the values of
// any keys it includes will override the defaults.
//
// The proof is signed by the parentCapability granting authority's secret key.
```



Delegate a ZCAP

```js
const delegated = zcap.delegate( invoker, parentId, delegator, caveats );
// In this case the invoker is an object containing the DID and keys of
// the invoker (the entity receiving the delegated authority).
// The parentId is the ID of the delegable ZCAP object created by createDelegable.
// The delegator is an object containing the DID and keys of the delegator.
//
// Part or all of the delegator object's values may be provided in a
// defaults.hjson file -- see defaults-example.hjson

// The caveats is an optional argument consisting of an array of caveat objects.
//
// The proof is signed by the secret keys of both the delegatorDid and the invokerDid.

```


Invoke a delegated ZCAP

```js
// TODO
// Packages the delegated ZCAP object in a JWT signed by the delegator
// for transmission to the target.
```

Verify an invocation

```js
const verified = zcap.verifyZcapInvocation(zcap);
// The zcap argument may be an object, a JSON string or a JWT.
// If a JWT, it unpacks and verifies the JWT submitted.
// Then it verifies all signatures.
// Returns the delegator and invoker DIDs and parentCapability ID so they can be verified as unrevoked.
```

Verify and cache a DID's keys

```js
// TODO
```
