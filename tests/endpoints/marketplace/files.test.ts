import SharetribeSdk from "../../../src/sdk";
import FetchMockAdapter from "../../helpers/FetchMockAdapter";
import MemoryStore from "../../../src/utils/stores/MemoryStore";

/**
 * Smoke tests for the Marketplace file-sharing endpoints: verify each method
 * hits the correct path with the correct HTTP verb.
 */
const API = "https://flex-api.sharetribe.com/v1/api";
const TOKEN_URL = "https://flex-api.sharetribe.com/v1/auth/token";

const tokenReply = {
  access_token: "test-token",
  token_type: "bearer",
  expires_in: 86400,
  scope: "public-read",
};

const fileRes = {
  data: {
    id: { uuid: "f1000000-0000-0000-0000-000000000001" },
    type: "file",
    attributes: { name: "a.pdf", size: 10, state: "available", deleted: false },
  },
};
const idOnly = (type: string) => ({
  data: { id: { uuid: "f1000000-0000-0000-0000-000000000002" }, type },
});

describe("Marketplace file endpoints", () => {
  let sdk: SharetribeSdk;
  let mock: FetchMockAdapter;

  beforeEach(() => {
    sdk = new SharetribeSdk({
      clientId: "test-client-id",
      tokenStore: new MemoryStore(),
    });
    mock = new FetchMockAdapter(sdk.axios);
    mock.onPost(TOKEN_URL).reply(200, tokenReply);
  });

  it("files.show → GET /files/show", async () => {
    mock.onGet(`${API}/files/show`).reply(200, fileRes);
    await sdk.files.show({ fileAttachmentId: "fa-1" });
    expect(mock.history.get.map((r) => r.url)).toContain(`${API}/files/show`);
  });

  it("ownFiles.show → GET /own_files/show", async () => {
    mock.onGet(`${API}/own_files/show`).reply(200, fileRes);
    await sdk.ownFiles.show({ id: "file-1" });
    expect(mock.history.get.map((r) => r.url)).toContain(`${API}/own_files/show`);
  });

  it("ownFiles.create → POST /own_files/create", async () => {
    mock.onPost(`${API}/own_files/create`).reply(200, idOnly("ownFile"));
    await sdk.ownFiles.create({
      name: "a.pdf",
      mimeType: "application/pdf",
      size: 10,
    });
    expect(mock.history.post.map((r) => r.url)).toContain(`${API}/own_files/create`);
  });

  it("fileUploads.create → POST /file_uploads/create", async () => {
    mock.onPost(`${API}/file_uploads/create`).reply(200, {
      data: {
        id: { uuid: "f1000000-0000-0000-0000-000000000003" },
        type: "fileUpload",
        attributes: { url: "https://upload", method: "PUT", headers: {} },
      },
    });
    await sdk.fileUploads.create({ fileId: "file-1" });
    expect(mock.history.post.map((r) => r.url)).toContain(`${API}/file_uploads/create`);
  });

  it("fileDownloads.create → POST /file_downloads/create", async () => {
    mock.onPost(`${API}/file_downloads/create`).reply(200, {
      data: {
        id: { uuid: "f1000000-0000-0000-0000-000000000004" },
        type: "fileDownload",
        attributes: { url: "https://download" },
      },
    });
    await sdk.fileDownloads.create({ fileAttachmentId: "fa-1" });
    expect(mock.history.post.map((r) => r.url)).toContain(`${API}/file_downloads/create`);
  });

  it("ownFileDownloads.create → POST /own_file_downloads/create", async () => {
    mock.onPost(`${API}/own_file_downloads/create`).reply(200, {
      data: {
        id: { uuid: "f1000000-0000-0000-0000-000000000005" },
        type: "ownFileDownload",
        attributes: { url: "https://download" },
      },
    });
    await sdk.ownFileDownloads.create({ fileId: "file-1" });
    expect(mock.history.post.map((r) => r.url)).toContain(
      `${API}/own_file_downloads/create`
    );
  });
});
