/**
 * @fileoverview Client for managing the current user's own files in the
 * Sharetribe Marketplace API.
 *
 * Creating an own file only registers its metadata; the bytes are uploaded
 * afterwards via `sdk.fileUploads.create`.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#own-files
 */

import type {HttpClient, HttpResponse} from "../../types";
import MarketplaceApi from "./index";
import {
  ExtraParameter,
  OwnFilesCreateParameter,
  OwnFilesCreateResponse,
  OwnFilesShowParameter,
  OwnFilesShowResponse,
} from "../../types";

/**
 * Own Files API client
 */
class OwnFiles {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/own_files`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Fetch one of the current user's own files by id.
   *
   * @param {OwnFilesShowParameter} params - Requires `id`
   * @returns {Promise<HttpResponse<OwnFilesShowResponse>>}
   *
   * @example
   * const { data } = await sdk.ownFiles.show({ id: "file-abc123" });
   */
  async show(
    params: OwnFilesShowParameter
  ): Promise<HttpResponse<OwnFilesShowResponse>> {
    return this.httpClient.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Register a new own file. Returns the file resource, after which the bytes
   * are uploaded via `sdk.fileUploads.create({ fileId })`.
   *
   * @template EP
   * @param {OwnFilesCreateParameter} params - `name`, `mimeType`, `size`
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<HttpResponse<OwnFilesCreateResponse<EP>>>}
   *
   * @example
   * const { data } = await sdk.ownFiles.create(
   *   { name: "invoice.pdf", mimeType: "application/pdf", size: 12345 },
   *   { expand: true }
   * );
   */
  async create<EP extends ExtraParameter | undefined = undefined>(
    params: OwnFilesCreateParameter,
    extraParams?: EP
  ): Promise<HttpResponse<OwnFilesCreateResponse<EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default OwnFiles;
