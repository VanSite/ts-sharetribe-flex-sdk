# Transit Serialization

The SDK uses Transit format for data serialization between client and Sharetribe API.

## What is Transit?

Transit is a format for encoding data values, similar to JSON but with support for custom types. The SDK uses `application/transit+json` content type for API communication.

## Automatic Handling

SDK types are automatically serialized/deserialized:

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { Money, LatLng } = sdkTypes;

// SDK automatically converts to Transit
await sdk.ownListings.create({
  price: new Money(5000, 'USD'),  // Serialized as Transit Money
  geolocation: new LatLng(37.7749, -122.4194), // Serialized as Transit LatLng
});

// Response automatically converted back to SDK types
const { data } = await sdk.listings.show({ id: listingId });
console.log(data.data.attributes.price instanceof Money); // true
```

## Type Mappings

| SDK Type | Transit Tag | Format |
|----------|-------------|--------|
| `UUID` | `u` | string |
| `Money` | `mn` | `[amount, currency]` |
| `LatLng` | `geo` | `[lat, lng]` |
| `BigDecimal` | `f` | string |

## Manual Transit Operations

For advanced use cases:

```typescript
import { transit, sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { read, write } = transit;
const { UUID, Money } = sdkTypes;

// Write SDK types to Transit string
const transitString = write({
  id: new UUID('550e8400-e29b-41d4-a716-446655440000'),
  price: new Money(5000, 'USD'),
});

// Read Transit string back to SDK types
const data = read(transitString);
console.log(data.price instanceof Money); // true
```

## Verbose Mode

Enable verbose Transit output for debugging:

```typescript
const sdk = new SharetribeSdk({
  clientId: 'your-client-id',
  transitVerbose: true, // More readable Transit output
});
```

## Custom Type Handlers

Transform SDK types to/from application-specific types:

```typescript
import { SharetribeSdk, sdkTypes, TypeHandler } from '@vansite/ts-sharetribe-flex-sdk';

const { Money } = sdkTypes;

// Custom Dinero.js integration
const moneyHandler: TypeHandler = {
  sdkType: Money,
  appType: Dinero,
  // Convert SDK Money to Dinero
  reader: (sdkMoney: Money) => Dinero({
    amount: sdkMoney.amount,
    currency: sdkMoney.currency,
  }),
  // Convert Dinero to SDK Money
  writer: (dinero: Dinero) => new Money(
    dinero.getAmount(),
    dinero.getCurrency()
  ),
};

const sdk = new SharetribeSdk({
  clientId: 'your-client-id',
  typeHandlers: [moneyHandler],
});

// Now responses return Dinero objects
const { data } = await sdk.listings.show({ id });
console.log(data.data.attributes.price); // Dinero object
```

## Transit Reader/Writer

Create custom Transit converters:

```typescript
import { reader, writer, createTransitConverters } from '@vansite/ts-sharetribe-flex-sdk';

// Create with custom type handlers
const { reader: r, writer: w } = createTransitConverters([moneyHandler]);

// Use for manual operations
const parsed = r.read(transitString);
const serialized = w.write(data);
```

## JSON Serialization

When storing SDK types as JSON:

```typescript
import { sdkTypes } from '@vansite/ts-sharetribe-flex-sdk';

const { Money, LatLng } = sdkTypes;

const listing = {
  price: new Money(5000, 'USD'),
  location: new LatLng(37.7749, -122.4194),
};

// Standard JSON loses type info
JSON.stringify(listing);
// {"price":{"amount":5000,"currency":"USD","_sdkType":"Money"},...}

// Reconstruct SDK types after parsing
const parsed = JSON.parse(jsonString);
const price = new Money(parsed.price.amount, parsed.price.currency);
```

## Data Flow

1. **Request:** SDK types → Transit serialization → API
2. **Response:** API → Transit parsing → SDK types

```
Client                    SDK                       API
  |                        |                         |
  |-- create(Money) ------>|                         |
  |                        |-- [5000,"USD"] -------->|
  |                        |                         |
  |<-- Money --------------|<-- [5000,"USD"] --------|
  |                        |                         |
```
