/**
 * @fileoverview Client for querying messages in the Sharetribe Integration API.
 *
 * Read-only: lists messages within a transaction. Reuses the Marketplace
 * message types since the resource shape is identical.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#messages
 */

import type {HttpClient, HttpResponse} from "../../types";
import type IntegrationApi from "./index";
import {MessagesQueryParameter, MessagesResponse} from "../../types";

/**
 * Messages API client (privileged)
 */
class Messages {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/messages`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Query messages in a transaction.
   *
   * @template P
   * @param {P & MessagesQueryParameter} params - Requires `transactionId`
   * @returns {Promise<HttpResponse<MessagesResponse<"query", P>>>}
   *
   * @example
   * const { data } = await sdk.messages.query({ transactionId: "tx-abc123" });
   */
  async query<P extends MessagesQueryParameter>(
    params: P
  ): Promise<HttpResponse<MessagesResponse<"query", P>>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Messages;
