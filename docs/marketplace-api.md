# Marketplace API

The Marketplace API (`SharetribeSdk`) provides client-side access to public and user-specific data.

## Endpoints Overview

| Endpoint | Description |
|----------|-------------|
| `listings` | Query public listings |
| `users` | View user profiles |
| `currentUser` | Manage authenticated user |
| `ownListings` | Manage user's own listings |
| `transactions` | Handle transactions |
| `bookings` | View bookings |
| `messages` | Send/receive messages |
| `reviews` | Manage reviews |
| `timeslots` | Query availability |
| `availabilityExceptions` | Manage availability |
| `stock` | View stock levels |
| `stockAdjustments` | Adjust stock |
| `images` | Upload images |
| `marketplace` | Marketplace info |
| `passwordReset` | Password reset flow |
| `processTransitions` | Transaction process |
| `stripeAccount` | Stripe connect |
| `stripeCustomer` | Stripe customer |
| `stripeAccountLinks` | Stripe onboarding |
| `stripePersons` | Stripe persons |
| `stripeSetupIntents` | Stripe setup |
| `sitemapData` | Sitemap generation |

## Listings

```typescript
// Query public listings
const { data } = await sdk.listings.query({
  keywords: 'yoga',
  price: { gte: 1000, lte: 10000 }, // cents
  bounds: new LatLngBounds(
    new LatLng(40.9, -73.7),
    new LatLng(40.5, -74.3)
  ),
  per_page: 20,
  include: ['author', 'images'],
});

// Show single listing
const { data } = await sdk.listings.show({
  id: new UUID('listing-id'),
  include: ['author'],
});
```

## Own Listings

```typescript
// Create listing
await sdk.ownListings.create({
  title: 'Yoga Class',
  description: 'Beginner yoga class',
  price: new Money(5000, 'USD'),
  geolocation: new LatLng(37.7749, -122.4194),
  publicData: { category: 'fitness' },
});

// Update listing
await sdk.ownListings.update({
  id: listingId,
  title: 'Updated Title',
});

// Query own listings
await sdk.ownListings.query({ states: ['published', 'draft'] });
```

## Transactions

```typescript
// Initiate transaction
await sdk.transactions.initiate({
  processAlias: 'default-booking/release-1',
  transition: 'transition/request-payment',
  params: {
    listingId,
    bookingStart: new Date('2024-01-01'),
    bookingEnd: new Date('2024-01-02'),
  },
});

// Query transactions
await sdk.transactions.query({
  lastTransitions: ['transition/accept'],
  include: ['listing', 'provider', 'customer'],
});

// Transition transaction
await sdk.transactions.transition({
  id: transactionId,
  transition: 'transition/accept',
});
```

## Current User

```typescript
// Get current user
const { data } = await sdk.currentUser.show({
  include: ['profileImage'],
});

// Update profile
await sdk.currentUser.updateProfile({
  firstName: 'John',
  lastName: 'Doe',
  bio: 'About me...',
  publicData: { skills: ['yoga'] },
});

// Change email
await sdk.currentUser.changeEmail({
  currentPassword: 'current-password',
  email: 'new@email.com',
});

// Change password
await sdk.currentUser.changePassword({
  currentPassword: 'current',
  newPassword: 'new-password',
});
```

## Messages

```typescript
// Send message
await sdk.messages.send({
  transactionId,
  content: 'Hello!',
});

// Query messages
await sdk.messages.query({
  transactionId,
  include: ['sender'],
});
```

## Reviews

```typescript
// Create review
await sdk.reviews.create({
  transactionId,
  rating: 5,
  content: 'Great experience!',
  type: 'ofProvider',
});

// Query reviews
await sdk.reviews.query({
  listingId,
  state: 'public',
});
```

## Images

```typescript
// Upload image
const { data } = await sdk.images.upload({
  image: fileBlob,
});

// Use image ID with listings
await sdk.ownListings.update({
  id: listingId,
  images: [imageId],
});
```

## Time Slots & Availability

```typescript
// Query available time slots
await sdk.timeslots.query({
  listingId,
  start: new Date(),
  end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});

// Add availability exception
await sdk.availabilityExceptions.create({
  listingId,
  start: new Date('2024-01-01'),
  end: new Date('2024-01-02'),
  seats: 0, // Blocked
});
```

## Stripe Integration

```typescript
// Create Stripe account
await sdk.stripeAccount.create({
  country: 'US',
  bankAccountToken: 'btok_xxx',
});

// Get account link for onboarding
await sdk.stripeAccountLinks.create({
  failureURL: 'https://example.com/fail',
  successURL: 'https://example.com/success',
  type: 'account_onboarding',
});

// Create payment setup intent
await sdk.stripeSetupIntents.create({});
```

## Sitemap Data

```typescript
// Get sitemap data for SEO
const { data } = await sdk.sitemapData.query({
  include: ['listings', 'users'],
});
```
