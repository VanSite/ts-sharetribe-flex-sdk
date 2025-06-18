# @vansite/ts-sharetribe-flex-sdk

![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![MIT License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.30-blue)

This is a **TypeScript SDK** for the [Sharetribe Flex API](https://www.sharetribe.com/api-reference/). It simplifies interaction with the API, providing a more user-friendly and intuitive interface for developers and reduces the size of the SDK.

## Features

- **Unified SDK**: Combines both the Sharetribe SDK and Integration SDK in one package
- **Cross-platform**: Works seamlessly in both Node.js and browser environments without additional configuration
- **Fully typed**: Complete TypeScript definitions based on the official Sharetribe documentation
- **Lightweight**: Optimized bundle size for better performance
- **Developer-friendly**: Intuitive API design for easier integration
- Built-in support for cookie handling and UUID generation

## Installation

**npm**

```bash
npm install @vansite/ts-sharetribe-flex-sdk
```

**yarn**

```bash
yarn add @vansite/ts-sharetribe-flex-sdk
```

## Usage

See also the migration section to see how things changed.

```typescript
import {
  SharetribeSdk,
  SharetribeIntegrationSdk,
} from "@vansite/ts-sharetribe-flex-sdk";

// Regular SDK for client-side operations
const sharetribeSdk = new SharetribeSdk({
  clientId: "your-client-id",
});

sharetribeSdk.authInfo().then((response) => {
  console.log(response);
});

// Integration SDK for server-side operations
const integrationSdk = new SharetribeIntegrationSdk({
  clientId: "your-client-id",
  clientSecret: "your-client-secret",
});

integrationSdk.users.show({ id: "user-id" }).then((response) => {
  console.log(response);
});
```

## Migration

### SDK Loader

The Sdk loader is not needed anymore, because there is no difference between the node and web sdk

- Remove the sdkLoader file
- Exchange all sdkTypes with the types from the new sdk

**before**

```javascript
import { types as sdkTypes } from "./sdkLoader";
const { Money } = sdkTypes;
```

**after:**

```javascript
import { sdkTypes } from "@vansite/ts-sharetribe-flex-sdk";
const { Money } = sdkTypes;
```

### Transit

**before:**

```javascript
import { transit } from "./sdkLoader";

const serialize = (data) => {
  return transit.write(data, {
    typeHandlers,
    verbose: config.sdk.transitVerbose,
  });
};

const deserialize = (str) => {
  return transit.read(str, { typeHandlers });
};
```

**after:**

```javascript
import { transit } from "@vansite/ts-sharetribe-flex-sdk";

const serialize = (data) => {
  return transit.write(data, {
    typeHandlers,
    verbose: config.sdk.transitVerbose,
  });
};

const deserialize = (str) => {
  return transit.read(str, { typeHandlers });
};
```

### TokenStores

**before:**

```javascript
const sharetribeSdk = require("sharetribe-flex-sdk");
const store = sharetribeSdk.tokenStore.memoryStore();
```

**after:**

```javascript
const { TokenStore } = require("@vansite/ts-sharetribe-flex-sdk");
const store = new TokenStore.MemoryStore();
```

or

```javascript
const { TokenStore } = require("@vansite/ts-sharetribe-flex-sdk");
const cookieTokenStore = new TokenStore.ExpressStore({
  clientId: "client-id",
  req,
  secure: true,
});
```

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

## Contributing

Contributions are welcome and appreciated! If you'd like to help improve this library, please feel free to:

- Submit bug reports or feature requests through issues
- Propose improvements through pull requests
- Help expand test coverage
- Improve documentation

Please follow standard GitHub flow (fork, branch, pull request) for contributions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.txt) file for details.

---

### Tags

- Sharetribe Flex
- TypeScript SDK
- Node.js
- Browser
- API Integration
