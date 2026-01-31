# Examples

Common usage patterns for the TypeScript Sharetribe Flex SDK.

## Client-Side: Listing Search

```typescript
import { SharetribeSdk, TokenStores, sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { BrowserStore } = TokenStores;
const { LatLng, LatLngBounds } = sdkTypes;

const sdk = new SharetribeSdk({
  clientId: process.env.SHARETRIBE_CLIENT_ID!,
  tokenStore: new BrowserStore({ clientId: process.env.SHARETRIBE_CLIENT_ID! }),
});

// Search listings by location and keyword
async function searchListings(query: string, center: { lat: number; lng: number }) {
  const { data } = await sdk.listings.query({
    keywords: query,
    origin: new LatLng(center.lat, center.lng),
    bounds: new LatLngBounds(
      new LatLng(center.lat + 0.1, center.lng + 0.1),
      new LatLng(center.lat - 0.1, center.lng - 0.1)
    ),
    per_page: 20,
    include: ['author', 'images'],
  });

  return data.data.map(listing => ({
    id: listing.id.uuid,
    title: listing.attributes.title,
    price: listing.attributes.price.amount / 100,
    author: data.included?.find(i =>
      i.type === 'user' && i.id.uuid === listing.relationships.author.data.id.uuid
    ),
  }));
}
```

## Client-Side: User Authentication

```typescript
import { SharetribeSdk, TokenStores } from '@vansite/ts-sharetribe-flex-sdk';

const { BrowserStore } = TokenStores;

const sdk = new SharetribeSdk({
  clientId: process.env.SHARETRIBE_CLIENT_ID!,
  tokenStore: new BrowserStore({ clientId: process.env.SHARETRIBE_CLIENT_ID! }),
});

// Login
async function login(email: string, password: string) {
  await sdk.login({ username: email, password });
  const info = await sdk.authInfo();
  return !info.isAnonymous;
}

// Check auth status
async function isAuthenticated() {
  const info = await sdk.authInfo();
  return !info.isAnonymous;
}

// Get current user
async function getCurrentUser() {
  const { data } = await sdk.currentUser.show({
    include: ['profileImage'],
  });
  return data.data;
}

// Logout
async function logout() {
  await sdk.logout();
}
```

## Client-Side: Create Listing

```typescript
import { SharetribeSdk, sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { Money, LatLng, UUID } = sdkTypes;

async function createListing(sdk: SharetribeSdk, listingData: {
  title: string;
  description: string;
  priceInCents: number;
  currency: string;
  lat: number;
  lng: number;
  imageIds: string[];
}) {
  const { data } = await sdk.ownListings.create({
    title: listingData.title,
    description: listingData.description,
    price: new Money(listingData.priceInCents, listingData.currency),
    geolocation: new LatLng(listingData.lat, listingData.lng),
    images: listingData.imageIds.map(id => new UUID(id)),
    publicData: {
      category: 'services',
    },
  });

  return data.data;
}
```

## Server-Side: Express Integration

```typescript
import express from 'express';
import cookieParser from 'cookie-parser';
import { SharetribeSdk, TokenStores } from '@vansite/ts-sharetribe-flex-sdk';

const { ExpressStore } = TokenStores;

const app = express();
app.use(cookieParser());
app.use(express.json());

// Middleware to create SDK instance per request
function createSdk(req: express.Request, res: express.Response) {
  return new SharetribeSdk({
    clientId: process.env.SHARETRIBE_CLIENT_ID!,
    tokenStore: new ExpressStore({
      clientId: process.env.SHARETRIBE_CLIENT_ID!,
      req,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }),
  });
}

// Login endpoint
app.post('/api/login', async (req, res) => {
  const sdk = createSdk(req, res);
  try {
    await sdk.login({
      username: req.body.email,
      password: req.body.password,
    });
    const { data } = await sdk.currentUser.show({});
    res.json({ user: data.data });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected endpoint
app.get('/api/me', async (req, res) => {
  const sdk = createSdk(req, res);
  const info = await sdk.authInfo();

  if (info.isAnonymous) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { data } = await sdk.currentUser.show({});
  res.json({ user: data.data });
});

// Listings endpoint
app.get('/api/listings', async (req, res) => {
  const sdk = createSdk(req, res);
  const { data } = await sdk.listings.query({
    per_page: 20,
    include: ['author', 'images'],
  });
  res.json(data);
});
```

## Server-Side: Integration API Admin

```typescript
import { IntegrationSdk, sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { UUID, Money } = sdkTypes;

const sdk = new IntegrationSdk({
  clientId: process.env.SHARETRIBE_CLIENT_ID!,
  clientSecret: process.env.SHARETRIBE_CLIENT_SECRET!,
});

// Approve pending listing
async function approveListing(listingId: string) {
  await sdk.listings.approve({
    id: new UUID(listingId),
  });
}

// Create listing for user (admin)
async function createListingForUser(userId: string, data: {
  title: string;
  priceInCents: number;
}) {
  const { data: result } = await sdk.listings.create({
    authorId: new UUID(userId),
    title: data.title,
    price: new Money(data.priceInCents, 'USD'),
  });
  return result.data;
}

// Process events webhook
async function processEvents(lastSequenceId?: number) {
  const { data } = await sdk.events.query({
    startAfterSequenceId: lastSequenceId,
    eventTypes: ['listing/created', 'user/created'],
  });

  for (const event of data.data) {
    switch (event.type) {
      case 'listing/created':
        console.log('New listing:', event.resource);
        break;
      case 'user/created':
        console.log('New user:', event.resource);
        break;
    }
  }

  return data.data[data.data.length - 1]?.attributes.sequenceId;
}
```

## Handling Errors

```typescript
import { SharetribeSdk } from '@vansite/ts-sharetribe-flex-sdk';
import { AxiosError } from 'axios';

async function safeApiCall<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const apiError = error.response?.data;

      switch (status) {
        case 401:
          console.error('Authentication required');
          break;
        case 403:
          console.error('Permission denied');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 422:
          console.error('Validation error:', apiError);
          break;
        default:
          console.error('API error:', apiError);
      }
    }
    return null;
  }
}

// Usage
const listings = await safeApiCall(() =>
  sdk.listings.query({ keywords: 'yoga' })
);
```

## Pagination

```typescript
async function getAllListings(sdk: SharetribeSdk) {
  const allListings = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const { data } = await sdk.listings.query({
      per_page: 100,
      page,
    });

    allListings.push(...data.data);
    hasMore = data.meta.page < data.meta.totalPages;
    page++;
  }

  return allListings;
}
```
