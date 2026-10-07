import SharetribeSdk from "../../../src/sdk";
import FetchMockAdapter from "../../helpers/FetchMockAdapter";
import MemoryStore from "../../../src/utils/stores/MemoryStore";
import { read } from "../../../src/utils/transit";

/**
 * currentUser.delete must send the current password: the Marketplace API
 * rejects a body-less delete with 400 validation-invalid-params
 * ("(not (map? nil))").
 */
const API = "https://flex-api.sharetribe.com/v1/api";
const TOKEN_URL = "https://flex-api.sharetribe.com/v1/auth/token";

const tokenReply = {
  access_token: "test-token",
  token_type: "bearer",
  expires_in: 86400,
  scope: "user",
};

const deletedUser = {
  data: { id: { uuid: "u1000000-0000-0000-0000-000000000001" }, type: "currentUser" },
};

const sentBody = (data: unknown) => (typeof data === "string" ? read(data) : data);

describe("currentUser.delete", () => {
  let sdk: SharetribeSdk;
  let mock: FetchMockAdapter;

  beforeEach(() => {
    sdk = new SharetribeSdk({
      clientId: "test-client-id",
      tokenStore: new MemoryStore(),
    });
    mock = new FetchMockAdapter(sdk.axios);
    mock.onPost(TOKEN_URL).reply(200, tokenReply);
    mock.onPost(`${API}/current_user/delete`).reply(200, deletedUser);
  });

  it("POSTs the current password in the request body", async () => {
    await sdk.currentUser.delete({ currentPassword: "secret-pw" });

    const request = mock.history.post.find((r) => r.url === `${API}/current_user/delete`);
    expect(request).toBeDefined();
    expect(sentBody(request!.data)).toEqual({ currentPassword: "secret-pw" });
  });

  it("passes extra params on, like the other currentUser commands", async () => {
    await sdk.currentUser.delete({ currentPassword: "secret-pw" }, { expand: true });

    const request = mock.history.post.find((r) => r.url === `${API}/current_user/delete`);
    expect(sentBody(request!.data)).toEqual({ currentPassword: "secret-pw" });
    expect(request!.params).toEqual(expect.objectContaining({ expand: true }));
  });
});
