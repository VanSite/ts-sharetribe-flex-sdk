# Token Stores

Token stores manage OAuth2 token persistence across requests.

All token stores are accessed via the `TokenStores` export:

```typescript
import { TokenStores } from '@vansite/ts-sharetribe-flex-sdk';

const { MemoryStore, BrowserStore, ExpressStore } = TokenStores;
```

## TokenStore Interface

```typescript
interface TokenStore {
  getToken(): AuthToken | null;
  setToken(token: AuthToken): void;
  removeToken(): void;
}
```

## MemoryStore

Default in-memory storage. Non-persistent - tokens lost on page reload/server restart.

```typescript
import { SharetribeSdk, TokenStores } from '@vansite/ts-sharetribe-flex-sdk';

const { MemoryStore } = TokenStores;

const sdk = new SharetribeSdk({
  clientId: 'your-client-id',
  tokenStore: new MemoryStore(), // Default if not specified
});
```

**Use cases:**
- Testing
- Server-side with per-request SDK instances
- Short-lived operations

## BrowserStore

Cookie-based storage for browser environments.

```typescript
import { SharetribeSdk, TokenStores } from '@vansite/ts-sharetribe-flex-sdk';

const { BrowserStore } = TokenStores;

const sdk = new SharetribeSdk({
  clientId: 'your-client-id',
  tokenStore: new BrowserStore({
    clientId: 'your-client-id',
    secure: true,      // HTTPS only (default: false)
    sameSite: 'Lax',   // CSRF protection (default: 'Lax')
    path: '/',         // Cookie path (default: '/')
  }),
});
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clientId` | string | required | Unique key for cookie |
| `secure` | boolean | `false` | HTTPS only |
| `sameSite` | string | `'Lax'` | `'Strict'`, `'Lax'`, or `'None'` |
| `path` | string | `'/'` | Cookie path |
| `domain` | string | _not set_ | Cookie domain for subdomain sharing |

**Security note:** Cookies are accessible via JavaScript. For maximum security on server-rendered apps, use `ExpressStore` with `httpOnly: true`.
**Reliability note:** Use explicit `secure` (on HTTPS) and `path: '/'` so login/logout cycles clear and replace cookies consistently.

## ExpressStore

Server-side cookie storage for Express.js applications.

```typescript
import { SharetribeSdk, TokenStores } from '@vansite/ts-sharetribe-flex-sdk';
import cookieParser from 'cookie-parser';

const { ExpressStore } = TokenStores;

app.use(cookieParser());

app.get('/api/listings', async (req, res) => {
  const sdk = new SharetribeSdk({
    clientId: 'your-client-id',
    tokenStore: new ExpressStore({
      clientId: 'your-client-id',
      req,
      res,
      httpOnly: true,   // Prevents XSS (default: true)
      secure: true,     // HTTPS only (default: false)
      sameSite: 'lax',  // CSRF protection (default: 'lax')
    }),
  });

  const { data } = await sdk.listings.query({});
  res.json(data);
});
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clientId` | string | required | Unique key for cookie |
| `req` | Request | required | Express request object |
| `res` | Response | required | Express response object |
| `httpOnly` | boolean | `true` | Prevent JavaScript access |
| `secure` | boolean | `false` | HTTPS only |
| `sameSite` | string | `'lax'` | `'strict'`, `'lax'`, or `'none'` |

**Production recommendation:** Always use `httpOnly: true` to prevent XSS attacks.

## Custom Token Store

Implement your own storage (Redis, database, etc.):

```typescript
import { TokenStore, AuthToken } from '@vansite/ts-sharetribe-flex-sdk';

class RedisStore implements TokenStore {
  private redis: RedisClient;
  private key: string;

  constructor(redis: RedisClient, userId: string) {
    this.redis = redis;
    this.key = `token:${userId}`;
  }

  getToken(): AuthToken | null {
    const data = this.redis.get(this.key);
    return data ? JSON.parse(data) : null;
  }

  setToken(token: AuthToken): void {
    this.redis.set(this.key, JSON.stringify(token));
  }

  removeToken(): void {
    this.redis.del(this.key);
  }
}
```

## Token Lifecycle

1. **Anonymous:** SDK fetches `public-read` token automatically
2. **Login:** User token stored after `sdk.login()`
3. **Refresh:** Expired tokens auto-refresh using refresh_token
4. **Logout:** Token removed on `sdk.logout()`

```typescript
import { SharetribeSdk } from '@vansite/ts-sharetribe-flex-sdk';

// Check current state
const info = await sdk.authInfo();
if (info.isAnonymous) {
  // Prompt login
} else {
  // User is authenticated
  console.log(info.scopes); // ['user']
}
```
