import IntegrationSdk from "../../../src/integrationSdk";
import AxiosMockAdapter from "axios-mock-adapter";
import MemoryStore from "../../../src/utils/stores/MemoryStore";

/**
 * Smoke tests for the new Integration API endpoints (messages, files,
 * file_attachments) plus users.verifyEmail: verify path + HTTP verb.
 */
const API = "https://flex-integ-api.sharetribe.com/v1/integration_api";
const TOKEN_URL = "https://flex-integ-api.sharetribe.com/v1/auth/token";

const tokenReply = {
  access_token: "test-token",
  token_type: "bearer",
  expires_in: 86400,
  scope: "integ",
};

const emptyQuery = {
  data: [],
  meta: { totalItems: 0, totalPages: 0, page: 1, perPage: 100 },
};

describe("Integration API new endpoints", () => {
  let sdk: IntegrationSdk;
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    sdk = new IntegrationSdk({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      tokenStore: new MemoryStore(),
    });
    mock = new AxiosMockAdapter(sdk.axios);
    mock.onPost(TOKEN_URL).reply(200, tokenReply);
  });

  it("messages.query → GET /messages/query", async () => {
    mock.onGet(`${API}/messages/query`).reply(200, emptyQuery);
    await sdk.messages.query({ transactionId: "tx-1" });
    expect(mock.history.get.map((r) => r.url)).toContain(`${API}/messages/query`);
  });

  it("files.query → GET /files/query", async () => {
    mock.onGet(`${API}/files/query`).reply(200, emptyQuery);
    await sdk.files.query({ ownerId: "user-1" });
    expect(mock.history.get.map((r) => r.url)).toContain(`${API}/files/query`);
  });

  it("fileAttachments.query → GET /file_attachments/query", async () => {
    mock.onGet(`${API}/file_attachments/query`).reply(200, emptyQuery);
    await sdk.fileAttachments.query({ messageId: "msg-1" });
    expect(mock.history.get.map((r) => r.url)).toContain(
      `${API}/file_attachments/query`
    );
  });

  it("users.verifyEmail → POST /users/verify_email", async () => {
    mock.onPost(`${API}/users/verify_email`).reply(200, {
      data: {
        id: { uuid: "u1000000-0000-0000-0000-000000000001" },
        type: "user",
      },
    });
    await sdk.users.verifyEmail({ id: "user-1", email: "john@example.com" });
    expect(mock.history.post.map((r) => r.url)).toContain(
      `${API}/users/verify_email`
    );
  });
});
