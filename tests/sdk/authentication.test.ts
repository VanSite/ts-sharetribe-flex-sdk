import SharetribeSdk from "../../src/sdk";
import FetchMockAdapter from "../helpers/FetchMockAdapter";
import { AuthToken } from "../../src/types/authentication";
import MemoryStore from "../../src/utils/stores/MemoryStore";

describe("Authentication process", () => {
  describe("Non-trusted user", () => {
    let sharetribeSdk: SharetribeSdk;
    let mockAdapter: FetchMockAdapter;

    beforeAll(() => {
      sharetribeSdk = new SharetribeSdk({
        clientId: "test-client-id",
      });
      mockAdapter = new FetchMockAdapter(sharetribeSdk.axios);
    });

    it("should get auth info", async () => {
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "public-read",
        })
      const authInfo = await sharetribeSdk.authInfo();
      expect(authInfo.scopes).toEqual(['public-read']);
      expect(authInfo.isAnonymous).toEqual(true);
      expect(authInfo.grantType).toEqual('client_credentials');
    });

    it("should get auth info for a user that is logged in", async () => {
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "public-read",
        });
      mockAdapter
        .onGet("https://flex-api.sharetribe.com/v1/api/marketplace/show")
        .reply(200, {
          data: {
            id: { uuid: "16c6a4b8-88ee-429b-835a-6725206cd08c" },
            type: "marketplace",
            attributes: {
              name: "My Marketplace",
              description: "My marketplace",
            },
          },
        });

      await sharetribeSdk.marketplace.show();
      const token = sharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toEqual({
        access_token: "test-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "public-read",
      });
    });

    it("should login the user", async () => {
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "user",
        });

      await sharetribeSdk.login({
        username: "test-username",
        password: "test-password",
      });

      const token = sharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toEqual({
        access_token: "test-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
      });
    });

    it("should logout the user", async () => {
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "user",
        });
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/revoke")
        .reply(200, {
          revoked: true,
        });

      await sharetribeSdk.login({
        username: "test-username",
        password: "test-password",
      });

      await sharetribeSdk.logout();

      const token = sharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toEqual(null);
    });

    it("should logout the user and get a public-read token", async () => {
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "user",
        });

      await sharetribeSdk.login({
        username: "test-username",
        password: "test-password",
      });

      let token = sharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toEqual({
        access_token: "test-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
      });

      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "public-read",
        });

      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/revoke")
        .reply(200, {
          revoked: true,
        });

      await sharetribeSdk.logout();
      mockAdapter
        .onGet("https://flex-api.sharetribe.com/v1/api/marketplace/show")
        .reply(200, {
          data: {
            id: { uuid: "16c6a4b8-88ee-429b-835a-6725206cd08c" },
            type: "marketplace",
            attributes: {
              name: "My Marketplace",
              description: "My marketplace",
            },
          },
        });

      await sharetribeSdk.marketplace.show();
      token = sharetribeSdk.sdkConfig.tokenStore!.getToken();

      expect(token).toEqual({
        access_token: "test-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "public-read",
      });
    });
  });

  describe("Trusted user", () => {
    // Regression: exchangeToken() authenticates via client_secret and sends the
    // stored access token as `subject_token`, so it bypasses the bearer-token
    // refresh interceptor. A lapsed access token would be rejected by /auth/token
    // with 401 (and the error handler drops the stored token). It must refresh
    // the access token up-front when a refresh_token is available.
    it("refreshes the access token before exchanging, using the fresh token as subject_token", async () => {
      const store = new MemoryStore();
      store.setToken({
        access_token: "stale-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
        refresh_token: "valid-refresh-token",
      } as AuthToken);

      const sdk = new SharetribeSdk({
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        tokenStore: store,
      } as any);

      sdk.auth.token = jest.fn().mockImplementation((params: any) => {
        if (params.grant_type === "refresh_token") {
          return Promise.resolve({
            data: {
              access_token: "fresh-access-token",
              token_type: "bearer",
              expires_in: 86400,
              scope: "user",
              refresh_token: "valid-refresh-token",
            },
          });
        }
        return Promise.resolve({
          data: {
            access_token: "trusted-access-token",
            token_type: "bearer",
            expires_in: 86400,
            scope: "trusted:user",
            refresh_token: "trusted-refresh-token",
          },
        });
      }) as any;

      const response = await sdk.exchangeToken();

      expect(sdk.auth.token).toHaveBeenCalledWith(
        expect.objectContaining({
          grant_type: "refresh_token",
          refresh_token: "valid-refresh-token",
        })
      );
      expect(sdk.auth.token).toHaveBeenCalledWith(
        expect.objectContaining({
          grant_type: "token_exchange",
          subject_token: "fresh-access-token",
        })
      );
      expect(response.data.scope).toEqual("trusted:user");
    });

    it("exchanges directly (no refresh) when the stored token has no refresh_token", async () => {
      const store = new MemoryStore();
      store.setToken({
        access_token: "only-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
      } as AuthToken);

      const sdk = new SharetribeSdk({
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        tokenStore: store,
      } as any);

      sdk.auth.token = jest.fn().mockResolvedValue({
        data: {
          access_token: "trusted-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "trusted:user",
          refresh_token: "trusted-refresh-token",
        },
      }) as any;

      await sdk.exchangeToken();

      expect(sdk.auth.token).not.toHaveBeenCalledWith(
        expect.objectContaining({ grant_type: "refresh_token" })
      );
      expect(sdk.auth.token).toHaveBeenCalledWith(
        expect.objectContaining({
          grant_type: "token_exchange",
          subject_token: "only-access-token",
        })
      );
    });

    it("should exchange access token with sharetribe to create a trusted:user token", async () => {
      const memoryTokenStore = (token: AuthToken) => {
        const store = new MemoryStore();
        store.setToken(token);
        return store;
      };
      const sharetribeSdk = new SharetribeSdk({
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        tokenStore: memoryTokenStore({
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "user",
          refresh_token: "test-refresh-token",
        }),
      });
      const mockAdapter = new FetchMockAdapter(sharetribeSdk.axios);
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-trusted-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "trusted:user",
          refresh_token: "test-trusted-refresh-token",
        });

      const response = await sharetribeSdk.exchangeToken();
      expect(response.data.access_token).toEqual("test-trusted-access-token");
      expect(response.data.scope).toEqual("trusted:user");

      const token = sharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toEqual({
        access_token: "test-trusted-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "trusted:user",
        refresh_token: "test-trusted-refresh-token",
      });
    });

    it("should login the user via Idp", async () => {
      const memoryTokenStore = (token: AuthToken) => {
        const store = new MemoryStore();
        store.setToken(token);
        return store;
      };
      const sharetribeSdk = new SharetribeSdk({
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        tokenStore: memoryTokenStore({
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "user",
          refresh_token: "test-refresh-token",
        }),
      });
      const mockAdapter = new FetchMockAdapter(sharetribeSdk.axios);
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-trusted-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "trusted:user",
          refresh_token: "test-trusted-refresh-token",
        });

      const response = await sharetribeSdk.exchangeToken();

      const trustedSharetribeSdk = new SharetribeSdk({
        clientId: "test-client-id",
        clientSecret: "test-client-secret",
        tokenStore: memoryTokenStore(response.data),
      });
      const trustedMockAdapter = new FetchMockAdapter(
        trustedSharetribeSdk.axios
      );

      trustedMockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/auth_with_idp")
        .reply(200, {
          access_token: "joe.dunphy@example.com-access-1",
          expires_in: 86400,
          scope: "user",
          token_type: "bearer",
          refresh_token: "joe.dunphy@example.com-refresh-1",
        });

      await trustedSharetribeSdk.loginWithIdp({
        idpId: "facebook",
        idpClientId: "idp-client-id",
        idpToken: "idp-token",
      });

      const token = await trustedSharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toEqual({
        access_token: "joe.dunphy@example.com-access-1",
        expires_in: 86400,
        scope: "user",
        token_type: "bearer",
        refresh_token: "joe.dunphy@example.com-refresh-1",
      });
    });
  });

  describe("Logout edge cases", () => {
    let sharetribeSdk: SharetribeSdk;
    let mockAdapter: FetchMockAdapter;

    beforeEach(async () => {
      sharetribeSdk = new SharetribeSdk({
        clientId: "test-client-id",
      });
      mockAdapter = new FetchMockAdapter(sharetribeSdk.axios);

      // Login to seed a token
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .reply(200, {
          access_token: "test-access-token",
          token_type: "bearer",
          expires_in: 86400,
          scope: "user",
        });

      await sharetribeSdk.login({
        username: "test-username",
        password: "test-password",
      });
    });

    it("should clear token even when revoke request fails", async () => {
      mockAdapter.reset();
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/revoke")
        .reply(403, { error: "forbidden" });

      try {
        await sharetribeSdk.logout();
      } catch {
        // Expected — revoke failed
      }

      const token = sharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toBeNull();
    });

    it("should clear token even on network error during revoke", async () => {
      mockAdapter.reset();
      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/revoke")
        .networkError();

      try {
        await sharetribeSdk.logout();
      } catch {
        // Expected — network error
      }

      const token = sharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toBeNull();
    });

    it("should handle logout when no token exists", async () => {
      sharetribeSdk.sdkConfig.tokenStore!.removeToken();

      const response = await sharetribeSdk.logout();

      expect(response.data.revoked).toBe(true);
      const token = sharetribeSdk.sdkConfig.tokenStore!.getToken();
      expect(token).toBeNull();
    });
  });

  describe("Relogin regression", () => {
    it("should use fresh login token after logout even if stale authenticated token remains", async () => {
      const sharetribeSdk = new SharetribeSdk({
        clientId: "test-client-id",
      });
      const mockAdapter = new FetchMockAdapter(sharetribeSdk.axios);

      const staleTokenWithRefresh: AuthToken = {
        access_token: "stale-user-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
        refresh_token: "stale-refresh-token",
      };

      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .replyOnce(200, staleTokenWithRefresh);

      await sharetribeSdk.login({
        username: "test-username",
        password: "test-password",
      });

      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/revoke")
        .replyOnce(200, {
          revoked: true,
        });
      await sharetribeSdk.logout();

      // Simulate stale cookie/token that survived logout.
      sharetribeSdk.sdkConfig.tokenStore!.setToken(staleTokenWithRefresh);

      const freshTokenWithoutRefresh: AuthToken = {
        access_token: "fresh-user-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
      };

      mockAdapter
        .onPost("https://flex-api.sharetribe.com/v1/auth/token")
        .replyOnce(200, freshTokenWithoutRefresh);

      await sharetribeSdk.login({
        username: "test-username",
        password: "test-password",
      });

      mockAdapter
        .onGet("https://flex-api.sharetribe.com/v1/api/current_user/show")
        .reply((config) => {
          if (config.headers?.Authorization === "bearer fresh-user-token") {
            return [200, {data: {id: "current-user"}}];
          }
          return [401, {error: "Unauthorized"}];
        });

      const response = await sharetribeSdk.currentUser.show({});
      expect(response.status).toBe(200);
      expect(sharetribeSdk.sdkConfig.tokenStore!.getToken()).toEqual(
        freshTokenWithoutRefresh
      );
    });
  });
});
