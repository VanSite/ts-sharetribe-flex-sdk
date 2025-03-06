import {
  handleRequestSuccess,
  handleResponseFailure,
  handleResponseSuccess,
  isTokenExpired,
  prepareAuthorizationHeader,
} from "../../src/utils/prepare-axios-instance";
import SharetribeSdk from "../../src/sdk";
import { AxiosError } from "axios";

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
  let onFulfilled: (response: any) => any;

  beforeEach(() => {
    sdk = {
      sdkConfig: {
        tokenStore: {
          setToken: jest.fn(),
        },
      },
    } as any;

    onFulfilled = handleResponseSuccess(sdk);
  });

  it("should set token if access_token is present", () => {
    const response = { data: { access_token: "123456" } };
    onFulfilled(response);
    expect(sdk.sdkConfig.tokenStore!.setToken).toHaveBeenCalledWith(
      response.data
    );
  });

  it("should return the response", () => {
    const response = { data: {} };
    expect(onFulfilled(response)).toBe(response);
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

  it("should reject if no refresh_token is present", async () => {
    // @ts-ignore
    sdk.sdkConfig.tokenStore!.getToken.mockReturnValue({});
    await expect(handleResponseFailure(sdk, error)).rejects.toEqual(error);
  });

  it("should reject if status is not 401 or 403", async () => {
    error.response!.status = 500;
    await expect(handleResponseFailure(sdk, error)).rejects.toEqual(error);
  });

  it("should reject if request has been retried", async () => {
    originalRequest._retry = true;
    await expect(handleResponseFailure(sdk, error)).rejects.toEqual(error);
  });
});

jest.mock("../../src/utils/convert-types");

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
