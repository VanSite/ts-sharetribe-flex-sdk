# Integration API

The Integration API (`IntegrationSdk`) provides server-side privileged access for backend operations.

**Security:** Never expose `clientSecret` in client-side code. Use only in server environments.

## Setup

```typescript
import { IntegrationSdk } from 'ts-sharetribe-flex-sdk';

const sdk = new IntegrationSdk({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});
```

## Endpoints Overview

| Endpoint | Description |
|----------|-------------|
| `listings` | Full listing CRUD + approve |
| `users` | User management |
| `transactions` | Transaction operations |
| `messages` | Messaging |
| `stock` | Stock management |
| `stockAdjustments` | Stock adjustments |
| `stockReservations` | Stock reservations |
| `availabilityExceptions` | Availability management |
| `events` | Event stream |
| `images` | Image management |
| `marketplace` | Marketplace info |

## Listings (Privileged)

```typescript
// Create listing for any user
await sdk.listings.create({
  authorId: new UUID('user-id'),
  title: 'Yoga Class',
  description: 'Professional yoga instruction',
  price: new Money(5000, 'USD'),
  geolocation: new LatLng(37.7749, -122.4194),
  publicData: { category: 'fitness' },
});

// Update any listing
await sdk.listings.update({
  id: listingId,
  title: 'Updated Title',
  metadata: { featured: true },
});

// Approve pending listing
await sdk.listings.approve({
  id: listingId,
});

// Open/close listings
await sdk.listings.open({ id: listingId });
await sdk.listings.close({ id: listingId });

// Query with admin filters
await sdk.listings.query({
  authorId: userId,
  states: ['pendingApproval', 'published'],
});
```

## Users

```typescript
// Query users
const { data } = await sdk.users.query({
  createdAtStart: new Date('2024-01-01'),
  include: ['profileImage'],
});

// Show user details
await sdk.users.show({
  id: userId,
  include: ['stripeAccount'],
});

// Update user (admin)
await sdk.users.updateProfile({
  id: userId,
  firstName: 'Updated',
  metadata: { verified: true },
});
```

## Transactions

```typescript
// Query all transactions
await sdk.transactions.query({
  createdAtStart: new Date('2024-01-01'),
  include: ['listing', 'provider', 'customer'],
});

// Transition transaction (admin)
await sdk.transactions.transition({
  id: transactionId,
  transition: 'transition/admin-cancel',
});

// Update transaction metadata
await sdk.transactions.updateMetadata({
  id: transactionId,
  metadata: { adminNote: 'Verified' },
});
```

## Events

Subscribe to marketplace events for webhooks/integrations:

```typescript
// Query events
const { data } = await sdk.events.query({
  startAfterSequenceId: lastSequenceId,
  eventTypes: [
    'listing/created',
    'listing/updated',
    'transaction/transitioned',
    'user/created',
  ],
});

// Process events
for (const event of data.data) {
  console.log(event.type, event.resource);
}
```

## Stock Management

```typescript
// Query stock
await sdk.stock.query({
  listingId,
});

// Compare and set stock
await sdk.stock.compareAndSet({
  listingId,
  oldTotal: 10,
  newTotal: 15,
});

// Create stock adjustment
await sdk.stockAdjustments.create({
  listingId,
  quantity: 5,
  reason: 'restock',
});

// Manage reservations
await sdk.stockReservations.create({
  listingId,
  quantity: 2,
  expiresAt: new Date(Date.now() + 15 * 60 * 1000),
});
```

## Availability Exceptions

```typescript
// Create exception
await sdk.availabilityExceptions.create({
  listingId,
  start: new Date('2024-01-01'),
  end: new Date('2024-01-07'),
  seats: 0, // Blocked
});

// Query exceptions
await sdk.availabilityExceptions.query({
  listingId,
  start: new Date(),
  end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
});

// Delete exception
await sdk.availabilityExceptions.delete({
  id: exceptionId,
});
```

## Images

```typescript
// Upload image
const { data } = await sdk.images.upload({
  image: imageBuffer,
});
```

## Marketplace Info

```typescript
const { data } = await sdk.marketplace.show();
// Returns marketplace configuration and settings
```
