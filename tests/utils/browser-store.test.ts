import Cookies from "js-cookie";
import BrowserStore from "../../src/utils/stores/BrowserStore";
import {AuthToken} from "../../src/types/authentication";

jest.mock("js-cookie", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  },
}));

describe("BrowserStore", () => {
  const mockedCookies = Cookies as jest.Mocked<typeof Cookies>;
  const sampleToken: AuthToken = {
    access_token: "test-access-token",
    token_type: "bearer",
    expires_in: 86400,
    scope: "user",
    refresh_token: "test-refresh-token",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set and remove cookies with matching default attributes", () => {
    const store = new BrowserStore({clientId: "test-client-id"});

    store.setToken(sampleToken);
    store.removeToken();

    expect(mockedCookies.set).toHaveBeenCalledWith(
      "st-test-client-id-token",
      JSON.stringify(sampleToken),
      {
        expires: 30,
        secure: false,
        sameSite: "Lax",
        path: "/",
      }
    );
    expect(mockedCookies.remove).toHaveBeenCalledWith(
      "st-test-client-id-token",
      {
        secure: false,
        sameSite: "Lax",
        path: "/",
      }
    );
  });

  it("should set and remove cookies with custom path and domain", () => {
    const store = new BrowserStore({
      clientId: "test-client-id",
      secure: true,
      sameSite: "None",
      path: "/app",
      domain: ".example.com",
    });

    store.setToken(sampleToken);
    store.removeToken();

    expect(mockedCookies.set).toHaveBeenCalledWith(
      "st-test-client-id-token",
      JSON.stringify(sampleToken),
      {
        expires: 30,
        secure: true,
        sameSite: "None",
        path: "/app",
        domain: ".example.com",
      }
    );
    expect(mockedCookies.remove).toHaveBeenCalledWith(
      "st-test-client-id-token",
      {
        secure: true,
        sameSite: "None",
        path: "/app",
        domain: ".example.com",
      }
    );
  });

  it("should remove corrupted cookies during read", () => {
    mockedCookies.get.mockReturnValue("not-json");
    const store = new BrowserStore({clientId: "test-client-id"});

    const token = store.getToken();

    expect(token).toBeNull();
    expect(mockedCookies.remove).toHaveBeenCalledWith(
      "st-test-client-id-token",
      {
        secure: false,
        sameSite: "Lax",
        path: "/",
      }
    );
  });
});
