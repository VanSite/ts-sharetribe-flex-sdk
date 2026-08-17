/**
 * Types for the SDK's internal fetch-based HTTP client.
 *
 * The surface mirrors the parts of axios the SDK used before 4.0.0
 * (interceptors, `{ data, status, headers, config }` responses, errors
 * carrying `.response`), so endpoint code and consumer error handling
 * keep working unchanged.
 */

export interface HttpRequestConfig {
  url?: string;
  /** Lowercase HTTP method, e.g. "get" | "post". */
  method?: string;
  baseURL?: string;
  headers?: Record<string, any>;
  /** Query parameters, serialized via `paramsSerializer`. */
  params?: Record<string, any>;
  /** Request body. Strings/FormData pass through as-is. */
  data?: any;
  paramsSerializer?: (params: Record<string, any>) => string;
  /** Transport used to execute the request (overridable for tests). */
  adapter?: HttpAdapter;
  /** Max automatic retries for network errors / idempotent 5xx (default 3). */
  retries?: number;

  /** Internal markers (e.g. the raw-transit-body key) survive config merges. */
  [key: string]: any;
}

/** Request config after defaults merging — `headers` is always present. */
export interface InternalHttpRequestConfig extends HttpRequestConfig {
  headers: Record<string, any>;
}

export type ExtendedInternalHttpRequestConfig = InternalHttpRequestConfig & {
  /** Indicates whether the request has been retried after a token refresh. */
  _retry: boolean;
};

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  /** Response headers with lowercase keys. */
  headers: Record<string, string>;
  config: InternalHttpRequestConfig;
}

export type HttpAdapter = (
  config: InternalHttpRequestConfig
) => Promise<HttpResponse>;

export interface HttpInterceptorManager<V> {
  use(
    onFulfilled?: (value: V) => V | Promise<V>,
    onRejected?: (error: any) => any
  ): number;
}

export interface HttpClient {
  <T = any>(config: HttpRequestConfig): Promise<HttpResponse<T>>;

  get<T = any>(
    url: string,
    config?: HttpRequestConfig
  ): Promise<HttpResponse<T>>;

  post<T = any>(
    url: string,
    data?: any,
    config?: HttpRequestConfig
  ): Promise<HttpResponse<T>>;

  defaults: HttpRequestConfig;

  interceptors: {
    request: HttpInterceptorManager<InternalHttpRequestConfig>;
    response: HttpInterceptorManager<HttpResponse>;
  };
}

/** @deprecated Use {@link ExtendedInternalHttpRequestConfig}. Kept for 3.x compatibility. */
export type ExtendedInternalAxiosRequestConfig = ExtendedInternalHttpRequestConfig;
