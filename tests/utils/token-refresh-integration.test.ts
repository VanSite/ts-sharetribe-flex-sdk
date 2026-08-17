import FetchMockAdapter from "../helpers/FetchMockAdapter";
import SharetribeSdk from "../../src/sdk";
import MemoryStore from "../../src/utils/stores/MemoryStore";

/**
 * Integration test for the reactive 401 -> refresh -> retry flow.
 *
 * Unlike the unit tests for `handleResponseFailure`, this drives a *real*
 * http client instance with the SDK interceptors installed, so it exercises
 * how the client actually dispatches the value returned from the response
 * error interceptor.
 *
 * Regression guard (originated as axios#7349 in the pre-4.0 axios client):
 * the promise returned from a response interceptor's onRejected handler MUST
 * be awaited by the client. The SDK's refresh relies on returning
 * `sdk.httpClient(originalRequest)` from that handler; if the client ignored
 * it, an expired access token would surface the original 401 to the caller
 * instead of the transparently-refreshed retry ("401 after idle" bug).
 */
describe("token refresh integration (real interceptor chain)", () => {
  it("transparently refreshes an expired token and resolves with the retried response", async () => {
    const tokenStore = new MemoryStore();
    tokenStore.setToken({
      access_token: "expired-access-token",
      token_type: "bearer",
      scope: "user",
      refresh_token: "valid-refresh-token",
      expires_in: 86400,
    } as any);

    const sdk = new SharetribeSdk({
      clientId: "test-client-id",
      baseUrl: "https://flex-api.example.com",
      tokenStore,
    } as any);

    // Isolate the test to the interceptor-return regression: stub the refresh
    // request itself so it deterministically yields a fresh user token.
    sdk.auth.token = jest.fn().mockResolvedValue({
      data: {
        access_token: "fresh-access-token",
        token_type: "bearer",
        scope: "user",
        refresh_token: "valid-refresh-token",
        expires_in: 86400,
      },
    }) as any;

    const mock = new FetchMockAdapter(sdk.axios);
    // First hit with the stale token -> 401. Retry after refresh -> 200.
    mock.onGet("/protected").replyOnce(401, { errors: [{ code: "unauthorized" }] });
    mock.onGet("/protected").replyOnce(200, { data: { id: "ok" } });

    const response = await sdk.axios.get("/protected");

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ data: { id: "ok" } });
    expect(sdk.auth.token).toHaveBeenCalledWith({
      client_id: "test-client-id",
      grant_type: "refresh_token",
      refresh_token: "valid-refresh-token",
    });
  });
});
