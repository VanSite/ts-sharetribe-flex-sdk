# SDK Types

The SDK provides custom types for proper data serialization with Transit format.

All SDK types are accessed via the `sdkTypes` export:

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { UUID, Money, LatLng, LatLngBounds, BigDecimal } = sdkTypes;
```

## UUID

Universally unique identifier for entities.

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { UUID } = sdkTypes;

// Generate new UUID
const id = new UUID();
console.log(id.uuid); // "550e8400-e29b-41d4-a716-446655440000"

// Use existing UUID
const listingId = new UUID('550e8400-e29b-41d4-a716-446655440000');

// String conversion
console.log(listingId.toString()); // "550e8400-e29b-41d4-a716-446655440000"
```

### Validation

```typescript
import { sdkTypes, InvalidUUIDError } from '@vansite/ts-sharetribe-flex-sdk';

const { UUID } = sdkTypes;

try {
  const invalid = new UUID('not-a-uuid');
} catch (e) {
  if (e instanceof InvalidUUIDError) {
    console.error('Invalid UUID provided');
  }
}
```

## Money

Monetary values in smallest currency units (cents).

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { Money } = sdkTypes;

// $50.00 USD (5000 cents)
const price = new Money(5000, 'USD');

console.log(price.amount);   // 5000
console.log(price.currency); // "USD"
```

### Validation

```typescript
import { sdkTypes, InvalidMoneyError } from '@vansite/ts-sharetribe-flex-sdk';

const { Money } = sdkTypes;

try {
  // Amount must be integer
  const invalid = new Money(50.99, 'USD');
} catch (e) {
  if (e instanceof InvalidMoneyError) {
    console.error('Amount must be integer in cents');
  }
}

try {
  // Currency must be valid ISO 4217
  const invalid = new Money(5000, 'us');
} catch (e) {
  if (e instanceof InvalidMoneyError) {
    console.error('Invalid currency code');
  }
}
```

### Currency Examples

| Display | Code |
|---------|------|
| $50.00 USD | `new Money(5000, 'USD')` |
| 50.00 EUR | `new Money(5000, 'EUR')` |
| 5000 JPY | `new Money(5000, 'JPY')` |

## LatLng

Geographical coordinates (latitude, longitude).

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { LatLng } = sdkTypes;

// San Francisco
const location = new LatLng(37.7749, -122.4194);

console.log(location.lat); // 37.7749
console.log(location.lng); // -122.4194
console.log(location.toString()); // "37.7749,-122.4194"

// String values also accepted
const loc2 = new LatLng('37.7749', '-122.4194');
```

## LatLngBounds

Geographic bounding box (northeast, southwest corners).

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { LatLng, LatLngBounds } = sdkTypes;

const ne = new LatLng(40.9, -73.7);
const sw = new LatLng(40.5, -74.3);
const bounds = new LatLngBounds(ne, sw);

console.log(bounds.ne.lat); // 40.9
console.log(bounds.sw.lng); // -74.3
console.log(bounds.toString()); // "40.9,-73.7,40.5,-74.3"

// Object syntax also works
const bounds2 = new LatLngBounds(
  { lat: 40.9, lng: -73.7 },
  { lat: 40.5, lng: -74.3 }
);
```

## BigDecimal

High-precision decimal numbers (stored as strings).

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { BigDecimal } = sdkTypes;

const decimal = new BigDecimal('123456789.123456789');

console.log(decimal.value); // "123456789.123456789"
console.log(decimal.toString()); // "123456789.123456789"
```

**Note:** Always initialize with strings to maintain precision.

## Type Checking

All SDK types have an `_sdkType` property for identification:

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { UUID, Money, LatLng } = sdkTypes;

const id = new UUID();
console.log(id._sdkType); // "UUID"

const money = new Money(5000, 'USD');
console.log(money._sdkType); // "Money"

const latLng = new LatLng(37.7749, -122.4194);
console.log(latLng._sdkType); // "LatLng"
```

## Using with API Calls

```typescript
import { SharetribeSdk, sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { UUID, Money, LatLng, LatLngBounds } = sdkTypes;

// Listings with Money and LatLng
await sdk.ownListings.create({
  title: 'Yoga Class',
  price: new Money(5000, 'USD'),
  geolocation: new LatLng(37.7749, -122.4194),
});

// Query with bounds
await sdk.listings.query({
  bounds: new LatLngBounds(
    new LatLng(40.9, -73.7),
    new LatLng(40.5, -74.3)
  ),
});

// Reference by ID
await sdk.listings.show({
  id: new UUID('listing-uuid'),
});
```
