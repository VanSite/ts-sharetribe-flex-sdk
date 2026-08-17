/**
 * Minimal fetch-based HTTP client with an axios-compatible surface:
 * callable instance, `get`/`post` helpers, request/response interceptors,
 * `defaults` (incl. swappable `adapter` for tests) and errors that carry
 * `.config` / `.response`.
 *
 * Replaces axios + axios-retry since 4.0.0. Retries happen at the adapter
 * level — BELOW the interceptors — so a retried request reuses the final,
 * already-serialized config and interceptors never run twice per attempt.
 */

import type {
  HttpAdapter,
  HttpClient,
  HttpRequestConfig,
  HttpResponse,
  InternalHttpRequestConfig,
} from "../types";

export class HttpError<T = any> extends Error {
  /** axios-style code: ERR_NETWORK | ERR_BAD_REQUEST | ERR_BAD_RESPONSE */
  code?: string;
  /** HTTP status, when a response was received. */
  status?: number;
  config: InternalHttpRequestConfig;
  response?: HttpResponse<T>;

  constructor(
    message: string,
    code: string,
    config: InternalHttpRequestConfig,
    response?: HttpResponse<T>
  ) {
    super(message);
    this.name = "HttpError";
    this.code = code;
    this.config = config;
    this.response = response;
    this.status = response?.status;
  }
}

const DEFAULT_RETRIES = 3;
const IDEMPOTENT_METHODS = new Set(["get", "head", "options", "put", "delete"]);

/** Same backoff curve as axios-retry's exponentialDelay. */
const exponentialDelay = (retryCount: number): number => {
  const delay = 2 ** retryCount * 100;
  const jitter = delay * 0.2 * Math.random();
  return delay + jitter;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isAbsoluteURL = (url: string) => /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);

const combineURL = (baseURL: string | undefined, url: string | undefined): string => {
  if (!url) return baseURL ?? "";
  if (isAbsoluteURL(url) || !baseURL) return url;
  return `${baseURL.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;
};

const buildRequestUrl = (config: InternalHttpRequestConfig): string => {
  const fullUrl = combineURL(config.baseURL, config.url);
  const params = config.params;
  if (!params || Object.keys(params).length === 0) return fullUrl;

  const serialize =
    config.paramsSerializer ??
    ((p: Record<string, any>) => new URLSearchParams(p).toString());
  const queryString = serialize(params);
  if (!queryString) return fullUrl;

  return fullUrl + (fullUrl.includes("?") ? "&" : "?") + queryString;
};

const isFormDataValue = (data: any): boolean =>
  typeof FormData !== "undefined" && data instanceof FormData;

/** Default transport: executes the request with the global fetch. */
const fetchAdapter: HttpAdapter = async (config) => {
  const method = (config.method ?? "get").toUpperCase();

  const headers: Record<string, string> = {};
  Object.entries(config.headers ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) headers[key] = String(value);
  });
  if (isFormDataValue(config.data)) {
    // fetch must set the multipart boundary itself
    delete headers["Content-Type"];
    delete headers["content-type"];
  }

  let body: any;
  if (method !== "GET" && method !== "HEAD" && config.data != null) {
    body =
      typeof config.data === "string" ||
      isFormDataValue(config.data) ||
      config.data instanceof URLSearchParams ||
      (typeof Blob !== "undefined" && config.data instanceof Blob) ||
      config.data instanceof ArrayBuffer
        ? config.data
        : JSON.stringify(config.data);
  }

  let fetchResponse: Response;
  try {
    fetchResponse = await fetch(buildRequestUrl(config), { method, headers, body });
  } catch (cause) {
    throw new HttpError(
      (cause as Error)?.message || "Network Error",
      "ERR_NETWORK",
      config
    );
  }

  const responseHeaders: Record<string, string> = {};
  fetchResponse.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  const response: HttpResponse<string> = {
    data: await fetchResponse.text(),
    status: fetchResponse.status,
    statusText: fetchResponse.statusText,
    headers: responseHeaders,
    config,
  };

  if (response.status >= 200 && response.status < 300) return response;

  throw new HttpError(
    `Request failed with status code ${response.status}`,
    response.status >= 500 ? "ERR_BAD_RESPONSE" : "ERR_BAD_REQUEST",
    config,
    response
  );
};

/**
 * axios-retry default semantics: retry network errors (no response, any
 * method) and 5xx responses on idempotent methods. 4xx never retries.
 */
const shouldRetry = (error: unknown, config: InternalHttpRequestConfig): boolean => {
  const response = (error as HttpError)?.response;
  if (!response) return true;
  const method = (config.method ?? "get").toLowerCase();
  return (
    response.status >= 500 &&
    response.status <= 599 &&
    IDEMPOTENT_METHODS.has(method)
  );
};

const dispatchWithRetry = async (
  config: InternalHttpRequestConfig,
  adapter: HttpAdapter
): Promise<HttpResponse> => {
  const retries = config.retries ?? DEFAULT_RETRIES;
  let attempt = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await adapter(config);
    } catch (error) {
      if (attempt >= retries || !shouldRetry(error, config)) throw error;
      await sleep(exponentialDelay(attempt));
      attempt += 1;
    }
  }
};

interface InterceptorHandler<V> {
  fulfilled?: (value: V) => V | Promise<V>;
  rejected?: (error: any) => any;
}

class InterceptorManager<V> {
  readonly handlers: InterceptorHandler<V>[] = [];

  use(
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any
  ): number {
    this.handlers.push({ fulfilled: onFulfilled, rejected: onRejected });
    return this.handlers.length - 1;
  }
}

export function createHttpClient(defaultConfig: HttpRequestConfig = {}): HttpClient {
  const requestInterceptors = new InterceptorManager<InternalHttpRequestConfig>();
  const responseInterceptors = new InterceptorManager<HttpResponse>();

  const request = (config: HttpRequestConfig): Promise<HttpResponse> => {
    const defaults = client.defaults;
    const merged: InternalHttpRequestConfig = {
      ...defaults,
      ...config,
      headers: { ...defaults.headers, ...config.headers },
      method: (config.method ?? defaults.method ?? "get").toLowerCase(),
      paramsSerializer: config.paramsSerializer ?? defaults.paramsSerializer,
    };

    let promise: Promise<any> = Promise.resolve(merged);
    for (const handler of requestInterceptors.handlers) {
      promise = promise.then(handler.fulfilled, handler.rejected);
    }
    promise = promise.then((finalConfig: InternalHttpRequestConfig) =>
      dispatchWithRetry(finalConfig, finalConfig.adapter ?? fetchAdapter)
    );
    for (const handler of responseInterceptors.handlers) {
      promise = promise.then(handler.fulfilled, handler.rejected);
    }
    return promise;
  };

  const client = request as HttpClient;
  client.defaults = { ...defaultConfig };
  client.interceptors = {
    request: requestInterceptors,
    response: responseInterceptors,
  };
  client.get = (url, config = {}) => request({ ...config, url, method: "get" });
  client.post = (url, data, config = {}) =>
    request({ ...config, url, data, method: "post" });

  return client;
}
