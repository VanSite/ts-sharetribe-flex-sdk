/**
 * @fileoverview Provides the OwnListings class for managing the authenticated user's listings in the Sharetribe Marketplace API.
 * This class includes methods for creating, updating, publishing, and managing the lifecycle of listings.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#own-listings
 */

import { AxiosInstance, AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import {
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
} from "../../types/marketplace/ownListings";
import { ExtraParameter } from "../../types/sharetribe";

/**
 * Class representing the Own Listings API.
 *
 * This class provides methods for the authenticated user to manage their listings, including creating, updating, publishing drafts, and adding images.
 */
class OwnListings {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the OwnListings class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + "/own_listings";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Retrieves details of a specific listing.
   *
   * @template P
   * @param {OwnListingsShowParameter} params - Parameters identifying the listing.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'show', P>>>} - A promise resolving to the listing details.
   *
   * @example
   * const response = await sdk.ownListings.show({ id: 'listing-id' });
   * const listing = response.data;
   */
  async show<P extends OwnListingsShowParameter>(
    params: P
  ): Promise<AxiosResponse<OwnListingsResponse<"show", P>>> {
    return this.axios.get<OwnListingsResponse<"show", P>>(
      `${this.endpoint}/show`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Queries the user's listings based on specified filters.
   *
   * @template P
   * @param {OwnListingsQueryParameter} params - Query parameters to filter listings.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'query', P>>>} - A promise resolving to the query results.
   *
   * @example
   * const response = await sdk.ownListings.query({});
   * const listings = response.data;
   */
  async query<P extends OwnListingsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<OwnListingsResponse<"query", P>>> {
    return this.axios.get<OwnListingsResponse<"query", P>>(
      `${this.endpoint}/query`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Creates a new listing.
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsCreateParameter} params - Parameters for the new listing.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'create', P, EP>>>} - A promise resolving to the created listing details.
   *
   * @example
   * const response = await sdk.ownListings.create({
   *    title: 'New Listing',
   *    description: 'Description',
   *    price: {
   *      amount: 1000,
   *      currency: 'USD'
   *    }
   *  });
   * const newListing = response.data;
   */
  async create<P extends OwnListingsCreateParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"create", P, EP>>> {
    return this.axios.post<OwnListingsResponse<"create", P, EP>>(
      `${this.endpoint}/create`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Creates a draft listing.
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsCreateDraftParameter} params - Parameters for the draft listing.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'createDraft', P, EP>>>} - A promise resolving to the created draft details.
   *
   * @example
   * const response = await sdk.ownListings.createDraft({
   *   title: 'Draft Listing',
   *   description: 'This is a draft',
   * });
   * const draft = response.data;
   */
  async createDraft<
    P extends OwnListingsCreateDraftParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"createDraft", P, EP>>> {
    return this.axios.post<OwnListingsResponse<"createDraft", P, EP>>(
      `${this.endpoint}/create_draft`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Updates an existing listing.
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsUpdateParameter} params - Parameters for updating the listing.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'update', P, EP>>>} - A promise resolving to the updated listing details.
   *
   * @example
   * const response = await sdk.ownListings.update({
   *   id: 'listing-id',
   *   title: 'Updated Listing Title',
   * });
   * const updatedListing = response.data;
   */
  async update<P extends OwnListingsUpdateParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"update", P, EP>>> {
    return this.axios.post<OwnListingsResponse<"update", P, EP>>(
      `${this.endpoint}/update`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Publishes a draft listing.
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsPublishDraftParameter} params - Parameters for publishing the draft listing.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'publishDraft', P, EP>>>} - A promise resolving to the published listing details.
   *
   * @example
   * const response = await sdk.ownListings.publishDraft({
   *   id: 'draft-id',
   * });
   * const publishedListing = response.data;
   */
  async publishDraft<
    P extends OwnListingsPublishDraftParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"publishDraft", P, EP>>> {
    return this.axios.post<OwnListingsResponse<"publishDraft", P, EP>>(
      `${this.endpoint}/publish_draft`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Discards a draft listing.
   *
   * @template P
   * @param {P & OwnListingsDiscardDraftParameter} params - Parameters for discarding the draft.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'discardDraft', P>>>} - A promise resolving to the discard confirmation.
   *
   * @example
   * const response = await sdk.ownListings.discardDraft({ id: 'draft-id' });
   * const result = response.data;
   */
  async discardDraft<P extends OwnListingsDiscardDraftParameter>(
    params: P
  ): Promise<AxiosResponse<OwnListingsResponse<"discardDraft", P>>> {
    return this.axios.post<OwnListingsResponse<"discardDraft", P>>(
      `${this.endpoint}/discard_draft`,
      params,
      { headers: this.headers }
    );
  }

  /**
   * Closes a listing.
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsCloseParameter} params - Parameters for closing the listing.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'close', P>>>} - A promise resolving to the closed listing details.
   *
   * @example
   * const response = await sdk.ownListings.close({ id: 'listing-id' });
   * const closedListing = response.data;
   */
  async close<P extends OwnListingsCloseParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"close", P>>> {
    return this.axios.post<OwnListingsResponse<"close", P>>(
      `${this.endpoint}/close`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Opens a listing.
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsOpenParameter} params - Parameters for opening the listing.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'open', P>>>} - A promise resolving to the opened listing details.
   *
   * @example
   * const response = await sdk.ownListings.open({ id: 'listing-id' });
   * const openedListing = response.data;
   */
  async open<P extends OwnListingsOpenParameter, EP extends ExtraParameter>(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"open", P>>> {
    return this.axios.post<OwnListingsResponse<"open", P>>(
      `${this.endpoint}/open`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }

  /**
   * Adds an image to a listing.
   *
   * @template P
   * @template EP
   * @param {P & OwnListingsAddImageParameter} params - Parameters specifying the image to add.
   * @param {EP | void} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<OwnListingsResponse<'addImage', P>>>} - A promise resolving to the updated listing details.
   *
   * @example
   * const response = await sdk.ownListings.addImage({
   *    id: 'listing-id', imageId: 'image-id'
   * });
   * const updatedListing = response.data;
   */
  async addImage<
    P extends OwnListingsAddImageParameter,
    EP extends ExtraParameter
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<OwnListingsResponse<"addImage", P>>> {
    return this.axios.post<OwnListingsResponse<"addImage", P>>(
      `${this.endpoint}/add_image`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default OwnListings;
