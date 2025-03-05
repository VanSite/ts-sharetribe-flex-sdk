/**
 * @fileoverview Provides the Listings class for managing listings in the Sharetribe Marketplace API.
 * This class allows querying and retrieving details of listings.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#listings
 */

import { AxiosInstance, AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import {
  ListingsShowParameter,
  ListingsResponse,
  ListingsQueryParameter,
} from "../../types/marketplace/listings";

/**
 * Class representing the Listings API.
 *
 * The Listings API provides methods to query and retrieve details of marketplace listings.
 */
class Listings {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the Listings class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + "/listings";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Retrieves details of a specific listing.
   *
   * @template P
   * @param {P & ListingsShowParameter} params - The parameters to identify the listing.
   * @returns {Promise<AxiosResponse<ListingsResponse<'show', P>>>} - A promise resolving to the listing details.
   *
   * @example
   * const response = await sdk.listings.show({ id: 'listing-id' });
   * const listing = response.data;
   */
  async show<P extends ListingsShowParameter>(
    params: P
  ): Promise<AxiosResponse<ListingsResponse<"show", P>>> {
    return this.axios.get<ListingsResponse<"show", P>>(
      `${this.endpoint}/show`,
      {
        headers: this.headers,
        params,
      }
    );
  }

  /**
   * Queries listings based on specified filters.
   *
   * @template P
   * @param {P & ListingsQueryParameter} params - Query parameters to filter listings.
   * @returns {Promise<AxiosResponse<ListingsResponse<'query', P>>>} - A promise resolving to the query results.
   *
   * @example
   * const response = await sdk.listings.query({ ids: ['listing-id-1', 'listing-id-2'] });
   * const listings = response.data;
   */
  async query<P extends ListingsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<ListingsResponse<"query", P>>> {
    return this.axios.get<ListingsResponse<"query", P>>(
      `${this.endpoint}/query`,
      {
        headers: this.headers,
        params,
      }
    );
  }
}

export default Listings;
