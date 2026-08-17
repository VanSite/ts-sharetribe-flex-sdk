/**
 * @fileoverview Client for managing your own listings in the Sharetribe Marketplace API.
 *
 * Use this to create, edit, publish, close, and manage images for listings you own.
 * All operations require authentication.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#own-listings
 */

import type {HttpClient, HttpResponse} from "../../types";
import MarketplaceApi from "./index";
import {
  ExtraParameter,
  OwnListingsAddImageParameter,
  OwnListingsCloseParameter,
  OwnListingsCreateDraftParameter,
  OwnListingsCreateParameter,
  OwnListingsDiscardDraftParameter,
  OwnListingsOpenParameter,
  OwnListingsPublishDraftParameter,
  OwnListingsQueryParameter,
  OwnListingsResponse,
  OwnListingsShowParameter,
  OwnListingsUpdateParameter,
} from "../../types";

/**
 * Own Listings API client (authenticated user)
 */
class OwnListings {
  public readonly authRequired = true;
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/own_listings`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Fetch one of your listings by ID
   *
   * @template P
   * @param {P & OwnListingsShowParameter} params
   * @returns {Promise<HttpResponse<OwnListingsResponse<"show", P>>>}
   */
  async show<P extends OwnListingsShowParameter>(
    params: P
  ): Promise<HttpResponse<OwnListingsResponse<"show", P, {expand: true}>>> {
    return this.httpClient.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * List all your listings (drafts, published, closed)
   *
   * @template P
   * @param {P & OwnListingsQueryParameter} params
   * @returns {Promise<HttpResponse<OwnListingsResponse<"query", P>>>}
   */
  async query<P extends OwnListingsQueryParameter>(
    params?: P
  ): Promise<HttpResponse<OwnListingsResponse<"query", P>>> {
    return this.httpClient.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Create a published listing
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsCreateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<OwnListingsResponse<"create", P, EP>>>}
   */
  async create<
    P extends OwnListingsCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<OwnListingsResponse<"create", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/create`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Create a draft listing (for step-by-step creation)
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsCreateDraftParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<OwnListingsResponse<"createDraft", P, EP>>>}
   */
  async createDraft<
    P extends OwnListingsCreateDraftParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<OwnListingsResponse<"createDraft", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/create_draft`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Update a listing (draft or published)
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsUpdateParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<OwnListingsResponse<"update", P, EP>>>}
   */
  async update<
    P extends OwnListingsUpdateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<OwnListingsResponse<"update", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/update`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Publish a draft listing
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsPublishDraftParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<OwnListingsResponse<"publishDraft", P, EP>>>}
   */
  async publishDraft<
    P extends OwnListingsPublishDraftParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<OwnListingsResponse<"publishDraft", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/publish_draft`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Discard a draft listing
   *
   * @template P
   * @param {P & OwnListingsDiscardDraftParameter} params
   * @returns {Promise<HttpResponse<OwnListingsResponse<"discardDraft", P>>>}
   */
  async discardDraft<P extends OwnListingsDiscardDraftParameter>(
    params: P
  ): Promise<HttpResponse<OwnListingsResponse<"discardDraft", P>>> {
    return this.httpClient.post(
      `${this.endpoint}/discard_draft`,
      params,
      {headers: this.headers}
    );
  }

  /**
   * Close a published listing
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsCloseParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<OwnListingsResponse<"close", P, EP>>>}
   */
  async close<
    P extends OwnListingsCloseParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<OwnListingsResponse<"close", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/close`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Re-open a closed listing
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsOpenParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<OwnListingsResponse<"open", P, EP>>>}
   */
  async open<
    P extends OwnListingsOpenParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<OwnListingsResponse<"open", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/open`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }

  /**
   * Attach an uploaded image to a listing
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsAddImageParameter} params
   * @param {EP} [extraParams]
   * @returns {Promise<HttpResponse<OwnListingsResponse<"addImage", P, EP>>>}
   */
  async addImage<
    P extends OwnListingsAddImageParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<HttpResponse<OwnListingsResponse<"addImage", P, EP>>> {
    return this.httpClient.post(
      `${this.endpoint}/add_image`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default OwnListings;