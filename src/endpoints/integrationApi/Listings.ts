/**
 * @fileoverview Client for managing listings in the Sharetribe Integration API.
 *
 * This privileged API allows creating, updating, querying, approving, opening, and closing listings
 * on behalf of users — typically used by admin tools, onboarding flows, or backend services.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#listings
 */

import type {HttpClient, HttpResponse} from "../../types";
import IntegrationApi from "./index";
import {
  ExtraParameter,
  ListingsApproveParameter,
  ListingsCloseParameter,
  ListingsCreateParameter,
  ListingsOpenParameter,
  ListingsQueryParameter,
  ListingsResponse,
  ListingsShowParameter,
  ListingsUpdateParameter,
} from "../../types";

/**
 * Listings API client (privileged)
 */
class Listings {
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/listings`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Fetch a single listing by ID
   *
   * @template P
   * @param {P & ListingsShowParameter} params
   * @returns {Promise<HttpResponse<ListingsResponse<"show", P>>>}
   */
  async show<P extends ListingsShowParameter>(
    params: P
  ): Promise<HttpResponse<ListingsResponse<"show", P, {expand: true}>>> {
    return this.httpClient.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Query listings with filters
   *
   * @template P
   * @param {P & ListingsQueryParameter} params
   * @returns {Promise<HttpResponse<ListingsResponse<"query", P>>>}
   */
  async query<P extends ListingsQueryParameter>(
    params: P
  ): Promise<HttpResponse<ListingsResponse<"query", P>>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Create a new listing
   *
   * @template P
   * @template EP
   * @param {P & ListingsCreateParameter} params
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<HttpResponse<ListingsResponse<"create", P, EP>>>}
   */
  async create<
    P extends ListingsCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<ListingsResponse<"create", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Update an existing listing
   *
   * @template P
   * @template EP
   * @param {P & ListingsUpdateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<ListingsResponse<"update", P, EP>>>}
   */
  async update<
    P extends ListingsUpdateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<ListingsResponse<"update", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/update`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Close a listing
   *
   * @template P
   * @template EP
   * @param {P & ListingsCloseParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<ListingsResponse<"close", P, EP>>>}
   */
  async close<
    P extends ListingsCloseParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<ListingsResponse<"close", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/close`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Open a previously closed listing
   *
   * @template P
   * @template EP
   * @param {P & ListingsOpenParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<ListingsResponse<"open", P, EP>>>}
   */
  async open<
    P extends ListingsOpenParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<ListingsResponse<"open", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/open`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Approve a pending listing (admin only)
   *
   * @template P
   * @template EP
   * @param {P & ListingsApproveParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<ListingsResponse<"approve", P, EP>>>}
   */
  async approve<
    P extends ListingsApproveParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<ListingsResponse<"approve", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/approve`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default Listings;