# Authentication

The SDK handles OAuth2 authentication with automatic token management.

## OAuth2 Grant Types

| Grant Type | Scope | Description |
|------------|-------|-------------|
| `client_credentials` | `public-read` | Anonymous access to public data |
| `password` | `user` | User login with email/password |
| `authorization_code` | `user` | Login via OAuth code (loginAs) |
| `refresh_token` | (inherits) | Automatic token refresh |
| `token_exchange` | `trusted:user` | Upgrade to trusted scope |

## Scopes

- `public-read` - Read public data (listings, marketplace info)
- `user` - Authenticated user operations
- `trusted:user` - Elevated user permissions (requires clientSecret)
- `integ` - Integration API access (IntegrationSdk only)

## User Authentication

### Login with Email/Password

```typescript
await sdk.login({
  username: 'user@example.com',
  password: 'password123',
});

// Check auth status
const info = await sdk.authInfo();
console.log(info.isAnonymous); // false
console.log(info.scopes);      // ['user']
```

### Login As (Server-side)

Used when the marketplace operator authenticates on behalf of a user.

```typescript
// Requires authorization code from Sharetribe Console
await sdk.loginAs({
  code: 'auth-code-from-console',
});
```

### Login with Identity Provider

Authenticate via external IdP (Google, Facebook, etc.).

```typescript
await sdk.loginWithIdp({
  idpId: 'google',
  idpToken: 'google-oauth-token',
});
```

## Token Exchange

Upgrade user token to trusted scope for elevated permissions:

```typescript
// Requires clientSecret
await sdk.exchangeToken();

const info = await sdk.authInfo();
console.log(info.scopes); // ['trusted:user']
```

## Logout

```typescript
await sdk.logout();
```

## Auth Info

Get current authentication state:

```typescript
const info = await sdk.authInfo();
// {
//   isAnonymous: boolean,
//   scopes: ['public-read'] | ['user'] | ['trusted:user'],
//   grantType: 'client_credentials' | 'refresh_token'
// }
```

## Token Storage

Tokens are automatically stored and refreshed. Configure storage:

```typescript
import { TokenStores } from '@vansite/ts-sharetribe-flex-sdk';

const { MemoryStore, BrowserStore, ExpressStore } = TokenStores;

// In-memory (default, non-persistent)
tokenStore: new MemoryStore()

// Browser cookies
tokenStore: new BrowserStore({ clientId: 'your-id' })

// Express server cookies
tokenStore: new ExpressStore({ clientId: 'your-id', req, res, httpOnly: true })
```

## Automatic Token Refresh

The SDK automatically refreshes expired tokens on 401/403 responses using the stored refresh token.
