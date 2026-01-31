# Getting Started

TypeScript SDK for Sharetribe Flex Marketplace API and Integration API.

## Installation

```bash
npm install @vansite/ts-sharetribe-flex-sdk
# or
yarn add @vansite/ts-sharetribe-flex-sdk
```

## Two SDK Classes

The SDK provides two main classes for different use cases:

### SharetribeSdk (Client-side)

For frontend/browser operations with public data and user authentication.

```typescript
import { SharetribeSdk } from '@vansite/ts-sharetribe-flex-sdk';

const sdk = new SharetribeSdk({
  clientId: 'your-client-id',
});

// Search public listings
const { data } = await sdk.listings.query({
  keywords: 'yoga',
  per_page: 10,
});
```

### IntegrationSdk (Server-side)

For backend operations requiring privileged access. **Never use in browser.**

```typescript
import { IntegrationSdk, sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { Money } = sdkTypes;

const sdk = new IntegrationSdk({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

// Create listing for a user
await sdk.listings.create({
  authorId: userId,
  title: 'My Listing',
  price: new Money(5000, 'USD'),
});
```

## Configuration Options

```typescript
interface SdkConfig {
  clientId: string;          // Required
  clientSecret?: string;     // Required for IntegrationSdk
  baseUrl?: string;          // Default: Sharetribe API URL
  version?: string;          // API version
  tokenStore?: TokenStore;   // Token storage (MemoryStore default)
  transitVerbose?: boolean;  // Verbose Transit output
  typeHandlers?: TypeHandler[]; // Custom type handlers
}
```

## Browser vs Node.js

### Browser

```typescript
import { SharetribeSdk, TokenStores } from '@vansite/ts-sharetribe-flex-sdk';

const { BrowserStore } = TokenStores;

const sdk = new SharetribeSdk({
  clientId: 'your-client-id',
  tokenStore: new BrowserStore({ clientId: 'your-client-id' }),
});
```

### Node.js (Express)

```typescript
import { SharetribeSdk, TokenStores } from '@vansite/ts-sharetribe-flex-sdk';

const { ExpressStore } = TokenStores;

app.get('/api/listings', (req, res) => {
  const sdk = new SharetribeSdk({
    clientId: 'your-client-id',
    tokenStore: new ExpressStore({
      clientId: 'your-client-id',
      req,
      res,
      httpOnly: true,
    }),
  });
  // Use sdk...
});
```

## SDK Types

Always use SDK types for proper serialization:

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { UUID, Money, LatLng, BigDecimal } = sdkTypes;

const listingId = new UUID('550e8400-e29b-41d4-a716-446655440000');
const price = new Money(5000, 'USD'); // $50.00 in cents
const location = new LatLng(37.7749, -122.4194);
```
