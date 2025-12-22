/**
 * @fileoverview Client for managing your own listings in the Sharetribe Marketplace API.
 *
 * Use this to create, edit, publish, close, and manage images for listings you own.
 * All operations require authentication.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#own-listings
 */

import type {AxiosInstance, AxiosResponse} from "axios";
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
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/own_listings`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch one of your listings by ID
   *
   * @template P
   * @param {P & OwnListingsShowParameter} params
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"show", P>>>}
   */
  async show<P extends OwnListingsShowParameter>(
    params: P
  ): Promise<AxiosResponse<OwnListingsResponse<"show", P>>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * List all your listings (drafts, published, closed)
   *
   * @template P
   * @param {P & OwnListingsQueryParameter} params
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"query", P>>>}
   */
  async query<P extends OwnListingsQueryParameter>(
    params?: P
  ): Promise<AxiosResponse<OwnListingsResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
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
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"create", P, EP>>>}
   */
  async create<
    P extends OwnListingsCreateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"create", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"createDraft", P, EP>>>}
   */
  async createDraft<
    P extends OwnListingsCreateDraftParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"createDraft", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"update", P, EP>>>}
   */
  async update<
    P extends OwnListingsUpdateParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"update", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"publishDraft", P, EP>>>}
   */
  async publishDraft<
    P extends OwnListingsPublishDraftParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"publishDraft", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"discardDraft", P>>>}
   */
  async discardDraft<P extends OwnListingsDiscardDraftParameter>(
    params: P
  ): Promise<AxiosResponse<OwnListingsResponse<"discardDraft", P>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"close", P, EP>>>}
   */
  async close<
    P extends OwnListingsCloseParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"close", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"open", P, EP>>>}
   */
  async open<
    P extends OwnListingsOpenParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"open", P, EP>>> {
    return this.axios.post(
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
   * @returns {Promise<AxiosResponse<OwnListingsResponse<"addImage", P, EP>>>}
   */
  async addImage<
    P extends OwnListingsAddImageParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"addImage", P, EP>>> {
    return this.axios.post(
      `${this.endpoint}/add_image`,
      {...params, ...extraParams},
      {headers: this.headers}
    );
  }
}

export default OwnListings;