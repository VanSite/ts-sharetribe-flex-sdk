import {
  handleRequestSuccess,
  handleResponseFailure,
  handleResponseSuccess,
  isTokenExpired,
  prepareAuthorizationHeader,
} from "../../src/utils/prepare-axios-instance";
import SharetribeSdk from "../../src/sdk";
import { AxiosError, AxiosInstance } from "axios";
import MemoryStore from "../../src/utils/stores/MemoryStore";

describe("Utility Functions", () => {
  describe("isTokenExpired", () => {
    it("should return true for 401 status", () => {
      expect(isTokenExpired(401)).toBe(true);
    });

    it("should return true for 403 status", () => {
      expect(isTokenExpired(403)).toBe(true);
    });

    it("should return false for other statuses", () => {
      expect(isTokenExpired(200)).toBe(false);
      expect(isTokenExpired(500)).toBe(false);
    });
  });

  describe("prepareAuthorizationHeader", () => {
    it("should return a properly formatted authorization header", () => {
      const data = { token_type: "Bearer", access_token: "123456" };
      expect(prepareAuthorizationHeader(data)).toBe("Bearer 123456");
    });
  });
});

jest.mock("../../src/utils/convert-types");

describe("handleResponseSuccess", () => {
  let sdk: SharetribeSdk;
  let onFulfilled: (response: any) => Promise<any>;

  beforeEach(() => {
    sdk = {
      sdkConfig: {
        tokenStore: {
          getToken: jest.fn().mockResolvedValue(null),
          setToken: jest.fn().mockResolvedValue(undefined),
          removeToken: jest.fn().mockResolvedValue(undefined),
        },
      },
    } as any;

    onFulfilled = handleResponseSuccess(sdk);
  });

  it("should set token if token payload is present", async () => {
    const response = {
      data: {
        access_token: "123456",
        token_type: "bearer",
        expires_in: 86400,
        scope: "public-read",
      },
    };
    await onFulfilled(response);
    expect(sdk.sdkConfig.tokenStore!.setToken).toHaveBeenCalledWith(
      response.data
    );
  });

  it("should not set token for malformed token payload", async () => {
    const response = { data: { access_token: "123456" } };
    await onFulfilled(response);
    expect(sdk.sdkConfig.tokenStore!.setToken).not.toHaveBeenCalled();
  });

  it("should not overwrite authenticated token with anonymous token", async () => {
    (sdk.sdkConfig.tokenStore!.getToken as jest.Mock).mockResolvedValue({
      access_token: "user-token",
      token_type: "bearer",
      expires_in: 86400,
      scope: "user",
    });

    const response = {
      data: {
        access_token: "public-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "public-read",
      },
    };

    await onFulfilled(response);
    expect(sdk.sdkConfig.tokenStore!.setToken).not.toHaveBeenCalled();
  });

  it("should overwrite stale authenticated token with new authenticated token without refresh_token", async () => {
    (sdk.sdkConfig.tokenStore!.getToken as jest.Mock).mockResolvedValue({
      access_token: "stale-user-token",
      token_type: "bearer",
      expires_in: 86400,
      scope: "user",
      refresh_token: "stale-refresh-token",
    });

    const response = {
      data: {
        access_token: "fresh-user-token",
        token_type: "bearer",
        expires_in: 86400,
        scope: "user",
      },
    };

    await onFulfilled(response);
    expect(sdk.sdkConfig.tokenStore!.setToken).toHaveBeenCalledWith(response.data);
  });

  it("should return the response", async () => {
    const response = { data: {} };
    expect(await onFulfilled(response)).toBe(response);
  });
});

describe("handleResponseFailure", () => {
  let sdk: SharetribeSdk;
  let error: AxiosError & { config: any };
  let originalRequest: any;

  beforeEach(() => {
    // Create a proper mock that passes the constructor.name check
    const mockSdk = Object.create(SharetribeSdk.prototype);
    sdk = Object.assign(mockSdk, {
      sdkConfig: {
        clientId: "test-client-id",
        tokenStore: {
          getToken: jest.fn().mockReturnValue({
            refresh_token: "refresh-token",
          }),
          setToken: jest.fn(),
        },
      },
      auth: {
        token: jest.fn().mockResolvedValue({
          data: {
            token_type: "Bearer",
            access_token: "new-access-token",
          },
        }),
      },
      axios: jest.fn().mockResolvedValue({ data: "success" }),
    }) as any;

    originalRequest = { _retry: false, headers: {} };
    error = {
      response: { status: 401 },
      config: originalRequest,
    } as any;
  });

  it("should retry the request with a new token", async () => {
    await handleResponseFailure(sdk, error);
    expect(sdk.auth.token).toHaveBeenCalledWith({
      client_id: sdk.sdkConfig.clientId,
      grant_type: "refresh_token",
      refresh_token: "refresh-token",
    });
    expect(sdk.sdkConfig.tokenStore!.setToken).toHaveBeenCalledWith({
      token_type: "Bearer",
      access_token: "new-access-token",
    });
    expect(originalRequest.headers.Authorization).toBe(
      "Bearer new-access-token"
    );
    expect(sdk.axios).toHaveBeenCalledWith(originalRequest);
  });

  it("should reject if status is not 401 or 403", async () => {
    error.response!.status = 500;
    const rejection = handleResponseFailure(sdk, error);
    await expect(rejection).rejects.toBeInstanceOf(Error);
    await expect(rejection).rejects.toMatchObject({
      data: undefined,
      name: "SharetribeApiError",
      status: undefined,
      statusText: undefined,
    });
  });
});

describe("handleRequestSuccess", () => {
  let sdk: SharetribeSdk;
  let requestConfig: any;

  beforeEach(() => {
    // Create a proper mock that passes the constructor.name check
    const mockSdk = Object.create(SharetribeSdk.prototype);
    sdk = Object.assign(mockSdk, {
      sdkConfig: {
        clientId: "test-client-id",
        tokenStore: {
          getToken: jest.fn().mockReturnValue(null),
          setToken: jest.fn(),
        },
      },
      auth: {
        token: jest.fn().mockResolvedValue({
          data: {
            token_type: "Bearer",
            access_token: "public-access-token",
          },
        }),
      },
    }) as any;

    requestConfig = {
      headers: {},
      data: {},
    };
  });

  it("should set Authorization header if no auth token is present", async () => {
    await handleRequestSuccess(sdk, requestConfig);
    expect(sdk.sdkConfig.tokenStore!.getToken).toHaveBeenCalled();
    expect(requestConfig.headers.Authorization).toBe(
      "Bearer public-access-token"
    );
  });

  it("should not overwrite existing Authorization header", async () => {
    requestConfig.headers.Authorization = "Existing token";
    await handleRequestSuccess(sdk, requestConfig);
    expect(requestConfig.headers.Authorization).toBe("Existing token");
  });

  it("should set query parameters correctly", async () => {
    requestConfig.data = { page: "value1", include: ["value2", "value3"] };
    await handleRequestSuccess(sdk, requestConfig);
    expect(requestConfig.params.page).toBe("value1");
    expect(requestConfig.params.include).toBe("value2,value3");
    expect(requestConfig.data.param1).toBeUndefined();
    expect(requestConfig.data.param2).toBeUndefined();
  });
});

/**
 * Regression tests for request-body corruption on axios-retry retries.
 *
 * `prepareAxiosInstance` wires `axios-retry` onto the SDK's axios instance.
 * axios-retry's default `retryCondition` retries any method (including POST)
 * on a network error (no response: ECONNRESET, socket hang up, ...) by
 * re-invoking the axios instance with `error.config`. `handleRequestSuccess`
 * transit-serializes `requestConfig.data` in place, so on the retry the
 * request interceptor runs a second time over the already-serialized
 * transit STRING from the first attempt and serializes it again, producing
 * a double-encoded body (`["~#'","<escaped transit>"]`) that Sharetribe
 * rejects with a generic 400 bad-request.
 *
 * These tests drive a real `SharetribeSdk` instance (real interceptor +
 * axios-retry chain), with a custom adapter that records the exact
 * `config.data` sent on every attempt -- analogous to the flaky-adapter
 * pattern used in the consumer repo's `sdk.retry.test.js`.
 */
describe("handleRequestSuccess retry data corruption (regression)", () => {
  const networkError = (config: any) =>
    Object.assign(new Error("socket hang up"), {
      code: "ECONNRESET",
      isAxiosError: true,
      config,
      request: {},
    });

  /**
   * Installs an adapter that records every attempt's `config.data` and
   * fails only the first attempt with a network error (no HTTP response),
   * which is exactly what axios-retry's default retryCondition retries on.
   */
  const installFlakyAdapter = (axiosInstance: AxiosInstance): any[] => {
    const bodies: any[] = [];
    let attempts = 0;

    axiosInstance.defaults.adapter = async (config: any) => {
      bodies.push(config.data);
      attempts += 1;

      if (attempts === 1) {
        throw networkError(config);
      }

      return {
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/transit+json" },
        data: '["^ ","~:data",null]',
        config,
      };
    };

    return bodies;
  };

  const createSdk = (): SharetribeSdk => {
    const tokenStore = new MemoryStore();
    tokenStore.setToken({
      access_token: "access-token",
      token_type: "bearer",
      scope: "user",
      refresh_token: "refresh-token",
      expires_in: 86400,
    } as any);

    return new SharetribeSdk({
      clientId: "test-client-id",
      baseUrl: "https://flex-api.example.com",
      tokenStore,
    } as any);
  };

  it("sends the same transit body on the retry as on the first attempt", async () => {
    const sdk = createSdk();
    const bodies = installFlakyAdapter(sdk.axios);

    await sdk.axios.post("/listings/query", {
      title: "Van",
      nested: { a: 1 },
    });

    expect(bodies).toHaveLength(2);
    // Without the fix, bodies[1] is JSON-shaped as a transit-encoded
    // string wrapping bodies[0], not an identical transit map.
    expect(bodies[1]).toEqual(bodies[0]);
  });

  it("keeps the retried body a transit map, not a double-encoded transit string", async () => {
    const sdk = createSdk();
    const bodies = installFlakyAdapter(sdk.axios);

    await sdk.axios.post("/listings/query", {
      title: "Van",
      nested: { a: 1 },
    });

    expect(typeof bodies[1]).toBe("string");
    // Double-serialization wraps the first transit string in a transit
    // quoted-string frame: `["~#'","<escaped transit>"]`.
    expect(bodies[1]).not.toMatch(/^\["~#'"/);
    expect(bodies[1]).toBe(
      '["^ ","~:title","Van","~:nested",["^ ","~:a",1]]'
    );
  });

  it("behaves identically to before for a request that is never retried", async () => {
    const sdk = createSdk();
    const bodies: any[] = [];

    sdk.axios.defaults.adapter = async (config: any) => {
      bodies.push(config.data);
      return {
        status: 200,
        statusText: "OK",
        headers: { "content-type": "application/transit+json" },
        data: '["^ ","~:data",null]',
        config,
      };
    };

    await sdk.axios.post("/listings/query", { title: "Van" });

    expect(bodies).toHaveLength(1);
    expect(bodies[0]).toBe('["^ ","~:title","Van"]');
  });

  it.each([
    ["undefined", undefined],
    ["null", null],
  ])(
    "survives a retry with data === %s without mis-firing the presence check",
    async (_label, data) => {
      const sdk = createSdk();
      const bodies = installFlakyAdapter(sdk.axios);

      await sdk.axios.post("/listings/query", data);

      expect(bodies).toHaveLength(2);
      // transit-js legitimately wraps a bare null in a `["~#'",null]` quote
      // frame on a single correct write, so the double-encoding regex from
      // the object-body tests above doesn't apply here -- equality between
      // both attempts is what proves the retry re-serialized the original
      // raw value instead of the already-serialized string.
      expect(bodies[1]).toEqual(bodies[0]);
    }
  );
});
