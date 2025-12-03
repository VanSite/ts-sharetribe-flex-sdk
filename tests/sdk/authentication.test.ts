import SharetribeSdk from "../../src/sdk";
import AxiosMockAdapter from "axios-mock-adapter";
import { AuthToken } from "../../src/types/authentication";
import MemoryStore from "../../src/utils/stores/MemoryStore";

describe("Authentication process", () => {
  describe("Non-trusted user", () => {
    let sharetribeSdk: SharetribeSdk;
    let mockAdapter: AxiosMockAdapter;

    beforeAll(() => {
      sharetribeSdk = new SharetribeSdk({
        clientId: "test-client-id",
      });
      mockAdapter = new AxiosMockAdapter(sharetribeSdk.axios);
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
      const mockAdapter = new AxiosMockAdapter(sharetribeSdk.axios);
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
      const mockAdapter = new AxiosMockAdapter(sharetribeSdk.axios);
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
      const trustedMockAdapter = new AxiosMockAdapter(
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
});
