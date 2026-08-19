/**
 * @fileoverview Client for querying and sending messages in the Sharetribe Marketplace API.
 *
 * Use this to read conversation history and send messages in transactions.
 * Messages are tied to a specific transaction (order/inquiry).
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#messages
 */

import type {HttpClient, HttpResponse} from "../../types";
import type MarketplaceApi from "./index";
import {ExtraParameter, MessagesQueryParameter, MessagesResponse, MessagesSendParameter,} from "../../types";

/**
 * Messages API client
 */
class Messages {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/messages`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Query messages in a transaction
   *
   * @template P
   * @param {P & MessagesQueryParameter} params
   * @returns {Promise<HttpResponse<MessagesResponse<"query", P>>>}
   *
   * @example
   * const { data } = await sdk.messages.query({
   *   transactionId: "tx-abc123"
   * });
   */
  async query<P extends MessagesQueryParameter>(
    params: P
  ): Promise<HttpResponse<MessagesResponse<"query", P>>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Send a new message in a transaction
   *
   * @template P
   * @template EP
   * @param {P & MessagesSendParameter} params
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<HttpResponse<MessagesResponse<"send", P, EP>>>}
   *
   * @example
   * await sdk.messages.send({
   *   transactionId: "tx-abc123",
   *   content: "Hi! When are you available?"
   * });
   */
  async send<
    P extends MessagesSendParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<MessagesResponse<"send", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/send`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default Messages;