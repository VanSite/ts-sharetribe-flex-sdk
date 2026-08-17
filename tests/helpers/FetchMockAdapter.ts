import type {
  HttpClient,
  HttpResponse,
  InternalHttpRequestConfig,
} from "../../src/types";
import { HttpError } from "../../src/utils/http-client";

/**
 * Drop-in replacement for the parts of axios-mock-adapter the test suite
 * uses, targeting the SDK's fetch-based http client. Installs itself as the
 * client's `defaults.adapter`, so the full interceptor chain (auth token,
 * transit serialization, token refresh) still runs above it.
 */

type ReplyTuple = [number, any?, Record<string, string>?];
type ReplyFn = (
  config: InternalHttpRequestConfig
) => ReplyTuple | Promise<ReplyTuple>;

interface MockHandler {
  method: string;
  url: string;
  once: boolean;
  used: boolean;
  reply: ReplyFn;
}

class FetchMockAdapter {
  private handlers: MockHandler[] = [];

  history: Record<string, InternalHttpRequestConfig[]> = { get: [], post: [] };

  constructor(client: HttpClient) {
    client.defaults.adapter = (config) => this.dispatch(config);
    // A mocked transport shouldn't exercise transport-level retries;
    // unmatched requests should fail fast and loud.
    client.defaults.retries = 0;
  }

  onGet(url: string) {
    return this.on("get", url);
  }

  onPost(url: string) {
    return this.on("post", url);
  }

  reset(): void {
    this.handlers = [];
    this.history = { get: [], post: [] };
  }

  private on(method: string, url: string) {
    const add = (
      once: boolean,
      reply: ReplyFn
    ): FetchMockAdapter => {
      // Match axios-mock-adapter semantics: a persistent handler for the
      // same method+url replaces the previous persistent one; `once`
      // handlers queue up in registration order.
      if (!once) {
        const existing = this.handlers.findIndex(
          (h) => !h.once && h.method === method && h.url === url
        );
        if (existing !== -1) {
          this.handlers[existing] = { method, url, once, used: false, reply };
          return this;
        }
      }
      this.handlers.push({ method, url, once, used: false, reply });
      return this;
    };

    const toReplyFn = (
      statusOrFn: number | ReplyFn,
      body?: any,
      headers?: Record<string, string>
    ): ReplyFn =>
      typeof statusOrFn === "function"
        ? statusOrFn
        : () => [statusOrFn, body, headers];

    return {
      reply: (statusOrFn: number | ReplyFn, body?: any, headers?: Record<string, string>) =>
        add(false, toReplyFn(statusOrFn, body, headers)),
      replyOnce: (statusOrFn: number | ReplyFn, body?: any, headers?: Record<string, string>) =>
        add(true, toReplyFn(statusOrFn, body, headers)),
      networkError: () =>
        add(false, () => {
          throw new HttpError("Network Error", "ERR_NETWORK", {
            headers: {},
            method,
            url,
          });
        }),
    };
  }

  private async dispatch(
    config: InternalHttpRequestConfig
  ): Promise<HttpResponse> {
    const method = (config.method ?? "get").toLowerCase();
    (this.history[method] ??= []).push(config);

    const handler = this.handlers.find(
      (h) => h.method === method && h.url === config.url && !(h.once && h.used)
    );
    if (!handler) {
      throw new Error(
        `FetchMockAdapter: no handler for ${method.toUpperCase()} ${config.url}`
      );
    }
    if (handler.once) handler.used = true;

    const [status, body, headers] = await handler.reply(config);
    const response: HttpResponse = {
      data: body,
      status,
      statusText: String(status),
      headers: headers ?? {},
      config,
    };

    if (status >= 200 && status < 300) return response;

    throw new HttpError(
      `Request failed with status code ${status}`,
      status >= 500 ? "ERR_BAD_RESPONSE" : "ERR_BAD_REQUEST",
      config,
      response
    );
  }
}

export default FetchMockAdapter;
