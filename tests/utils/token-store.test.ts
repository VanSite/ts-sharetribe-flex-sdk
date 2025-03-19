import SharetribeSdk from "../../src/sdk";
import MemoryStore from "../../src/utils/stores/MemoryStore";
import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthToken } from "../../src/types/authentication";

describe("TokenStore functionality with login and logout", () => {
  let sdk: SharetribeSdk;
  let mockAdapter: MockAdapter;
  let tokenStore: MemoryStore;

  beforeEach(() => {
    // Create a fresh MemoryStore for each test
    tokenStore = new MemoryStore();

    // Create SDK with the tokenStore
    sdk = new SharetribeSdk({
      clientId: "test-client-id",
      tokenStore: tokenStore,
    });

    // Setup mock adapter
    mockAdapter = new MockAdapter(sdk.axios);
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  it("should save token in TokenStore after login", async () => {
    // Mock the token endpoint response
    mockAdapter
      .onPost("https://flex-api.sharetribe.com/v1/auth/token")
      .reply(200, {
        access_token: "test-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
        refresh_token: "test-refresh-token",
      });

    // Spy on the tokenStore.setToken method
    const setTokenSpy = jest.spyOn(tokenStore, "setToken");

    expect(tokenStore.getToken()).toBeNull();

    // Perform login
    await sdk.login({
      username: "test-username",
      password: "test-password",
    });

    // Verify setToken was called with the correct token
    expect(setTokenSpy).toHaveBeenCalledWith({
      access_token: "test-access-token",
      token_type: "bearer",
      expires_in: 86400,
      scope: "user",
      refresh_token: "test-refresh-token",
    });

    // Verify token is stored correctly
    const storedToken = tokenStore.getToken();
    expect(storedToken).toEqual({
      access_token: "test-access-token",
      token_type: "bearer",
      expires_in: 86400,
      scope: "user",
      refresh_token: "test-refresh-token",
    });
  });

  it("should remove token from TokenStore after logout", async () => {
    // Setup initial token in store
    const initialToken: AuthToken = {
      access_token: "test-access-token",
      token_type: "bearer",
      expires_in: 86400,
      scope: "user",
      refresh_token: "test-refresh-token",
    };
    tokenStore.setToken(initialToken);

    // Mock the revoke endpoint response
    mockAdapter
      .onPost("https://flex-api.sharetribe.com/v1/auth/revoke")
      .reply(200, {
        revoked: true,
      });

    // Spy on the tokenStore.removeToken method
    const removeTokenSpy = jest.spyOn(tokenStore, "removeToken");

    // Perform logout
    await sdk.logout();

    // Verify removeToken was called
    expect(removeTokenSpy).toHaveBeenCalled();

    // Verify token is removed
    const storedToken = tokenStore.getToken();
    expect(storedToken).toBeNull();
  });

  it("should update token in TokenStore when refreshing", async () => {
    // Setup initial token in store with refresh_token
    const initialToken: AuthToken = {
      access_token: "old-access-token",
      token_type: "bearer",
      expires_in: 86400,
      scope: "user",
      refresh_token: "test-refresh-token",
    };
    tokenStore.setToken(initialToken);

    // Mock the token endpoint response for refresh
    mockAdapter
      .onPost("https://flex-api.sharetribe.com/v1/auth/token")
      .reply(200, {
        access_token: "new-access-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
        refresh_token: "new-refresh-token",
      });

    mockAdapter
      .onGet("https://flex-api.sharetribe.com/v1/api/users/show")
      .reply((config) => {
        // Check if this is the first request with the old token
        if (config.headers?.Authorization === "bearer old-access-token") {
          return [401, { error: "Unauthorized" }];
        } else if (
          config.headers?.Authorization === "bearer new-access-token"
        ) {
          return [200, { data: { id: "1" } }];
        }
        return [404, { error: "Not found" }];
      });

    await sdk.users.show({ id: "1" });

    // Verify token is updated
    const updatedToken = tokenStore.getToken();
    expect(updatedToken).toEqual({
      access_token: "new-access-token",
      token_type: "bearer",
      expires_in: 86400,
      scope: "user",
      refresh_token: "new-refresh-token",
    });
  });

  it("should correctly use token from TokenStore for requests", async () => {
    // Setup initial token in store
    const initialToken: AuthToken = {
      access_token: "test-access-token",
      token_type: "bearer",
      expires_in: 86400,
      scope: "user",
    };
    tokenStore.setToken(initialToken);

    // Mock an API endpoint
    mockAdapter
      .onGet("https://flex-api.sharetribe.com/v1/some-endpoint")
      .reply((config) => {
        // Check if the Authorization header is set correctly
        if (config.headers?.Authorization === "bearer test-access-token") {
          return [200, { success: true }];
        }
        return [401, { error: "Unauthorized" }];
      });

    // Make a request
    const response = await sdk.axios.get(
      "https://flex-api.sharetribe.com/v1/some-endpoint"
    );

    // Verify the request was successful (meaning the token was used correctly)
    expect(response.data).toEqual({ success: true });
  });
});
