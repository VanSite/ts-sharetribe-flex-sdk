# @vansite/ts-sharetribe-flex-sdk

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![MIT License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

This is a **TypeScript SDK** for the [Sharetribe Flex API](https://www.sharetribe.com/api-reference/). It simplifies interaction with the API, providing a more user-friendly and intuitive interface for developers.

---

## Features
- Simplifies Sharetribe Flex API integration.
- Fully typed SDK for safer and faster development.
- Compatible with both **Node.js** and **browser environments**.
- Built-in support for cookie handling and UUID generation.
- Uses [Zod](https://zod.dev) for runtime schema validation.

---

## Installation

### Install via npm:
```bash
npm install @vansite/ts-sharetribe-flex-sdk
```

### Install directly from GitHub:
```bash
npm install username/repo-name
```

---

## Usage

### Node.js Example

```typescript
import { sdkNode } from '@vansite/ts-sharetribe-flex-sdk';

const sdk = sdkNode();
sdk.someMethod().then(response => {
  console.log(response);
});
```

### Browser Example

```typescript
import { sdkWeb } from '@vansite/ts-sharetribe-flex-sdk';

const sdk = sdkWeb();
sdk.someMethod().then(response => {
  console.log(response);
});
```

### Migration

#### Client

##### SDK Loader
The Sdk loader is not needed anymore, because there is no difference between the node and web sdk

- Remove the sdkLoader file
- Exchange all sdkTypes with the types from the new sdk

```Javascript
import { types as sdkTypes } from './sdkLoader';
const { Money } = sdkTypes;
```

```Javascript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';
const { Money } = sdkTypes;
```

Posting to the backend and receiving from the backend dosn't need to be serialized or deserialized anymore, 
because typing make sure that we receive sdk types and send sdk types.

##### Transit can be removed
```Javascript
import { transit } from './sdkLoader';

const serialize = (data) => {
  return transit.write(data, { typeHandlers, verbose: config.sdk.transitVerbose });
};

const deserialize = (str) => {
  return transit.read(str, { typeHandlers });
};

```

##### TypeHandlers
- **Before:**
```Javascript
import { types as sdkTypes } from './sdkLoader';

export const typeHandlers = [
  // Use Decimal type instead of SDK's BigDecimal.
  {
    type: sdkTypes.BigDecimal,
    customType: Decimal,
    writer: (v) => new sdkTypes.BigDecimal(v.toString()),
    reader: (v) => new Decimal(v.value),
  },
];
```

- **After:**
```Javascript
import { skdTypes, util } from '@vansite/ts-sharetribe-flex-sdk';

export const typeHandlers = [
  // Use Decimal type instead of SDK's BigDecimal.
  util.createTypeHandler({
    sdkType: skdTypes.BigDecimal,
    appType: Decimal,
    writer: (v) => new skdTypes.BigDecimal(v.toString()),
    reader: (v) => new Decimal(v.value),
  }),
];
```

#### Server

##### TokenStores

- **Before:**
```Javascript
const sharetribeSdk = require('sharetribe-flex-sdk');
const store = sharetribeSdk.tokenStore.memoryStore();
```

- **After:**
```Javascript
const { sdkTypes, util, TokenStore } = require('@vansite/ts-sharetribe-flex-sdk');
const store = new TokenStore.MemoryStore();
```
or
```Javascript
const { sdkTypes, util, TokenStore } = require('@vansite/ts-sharetribe-flex-sdk');
const cookieTokenStore = new TokenStore.ExpressStore({
  clientId: CLIENT_ID,
  req,
  secure: USING_SSL,
});
```

##### Remove serialize and deserialize

```Javascript
exports.serialize = (data) => {
  return sharetribeSdk.transit.write(data, { typeHandlers, verbose: TRANSIT_VERBOSE });
};

exports.deserialize = (str) => {
  return sharetribeSdk.transit.read(str, { typeHandlers });
};
```

###### Remove types Replacer

- **Before:**
```Javascript
const replacer = (key = null, value) => {
  const cleanedValue = cleanErrorValue(value);
  return types.replacer(key, cleanedValue);
};
```

- **After:**
```Javascript
const replacer = (key = null, value) => {
  return cleanErrorValue(value);
};
```

###### Change bodyParser to json

- **Before:**
```Javascript
router.use(
  bodyParser.text({
    type: 'application/transit+json',
  })
);
```

- **After:**
```Javascript
  router.use(
  bodyParser.text({
    type: 'application/transit+json',
  })
);
```

---

## Scripts
**Build the project:**
```bash
yarn build
```
**Run tests:**
```bash
yarn test
```
**Analyze the bundle size:**
```bash
yarn analyze
```

---

## Project Structure
- **`src/`:** Contains the source code of the SDK.
- **`tests/`:** Unit tests for the SDK.
- **`dist/`:** Compiled files for distribution.
- **`types/`:** Type declaration files for TypeScript.
 
---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.
 
---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.

---

### Tags
- Sharetribe Flex
- TypeScript SDK
- Node.js
- Browser
- API Integration
