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

// The caveats is an optional argument consisting of an array of caveat objects.
//
// The proof is signed by the secret keys of both the delegatorDid and the invokerDid.

```

Invoke a delegated ZCAP

```js
// TODO: zcap.invokeDelegated(invoker, delegated, action);
// Packages an invocation in a JWT signed by the invoker
// for transmission to the target to invoke an action.
```

Invoke a delegable ZCAP

```js
const token = zcap.invokeDelegable(invoker, delegable, action);
// Packages an invocation in a JWT signed by the invoker
// for transmission to the target to invoke an action.
//
// In this case the invoker is an object containing the DID and keys of
// the invoker (the entity being delegated the delegable authority).
//
// The delegable argument must be a valid delegable ZCAP.
//
// The target MUST ascertain that the action argument is allowed
// by the delegable object's caveat array.
```

Verify an invocation

```js
const verified = zcap.verifyZcapInvocation(zcap);
// The zcap argument may be an object, a JSON string or a JWT.
// If a JWT, it unpacks and verifies the JWT submitted.
// Then it verifies all signatures.
// Returns the delegator and invoker DIDs and parentCapability ID so they can be verified as unrevoked.
```

Asynchronously retrieve and cache a DID's signing key

```js
zcap.didServerUrl = 'http://localhost:5001';
zcap.getSigningKey(did)
  .then(function(response){...})
  .catch(function(err){...});
// Accepts a DID in the did:jlinc:xxx format.
// Returns a promise which resolves to an object { signingKey: [base64 encoded public key] },
// or a status object, e.g { status: 'not found' },
// or an error.
```
