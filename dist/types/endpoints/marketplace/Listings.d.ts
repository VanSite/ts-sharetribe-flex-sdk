/**
 * @fileoverview Provides the Listings class for managing listings in the Sharetribe Marketplace API.
 * This class allows querying and retrieving details of listings.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#listings
 */
import { AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { ListingsShowParameter, ListingsResponse, ListingsQueryParameter } from '../../types/marketplace/listings';
/**
 * Class representing the Listings API.
 *
 * The Listings API provides methods to query and retrieve details of marketplace listings.
 */
declare class Listings {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    /**
     * Creates an instance of the Listings class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
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
    show<P extends ListingsShowParameter>(params: P): Promise<AxiosResponse<ListingsResponse<'show', P>>>;
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
    query<P extends ListingsQueryParameter>(params: P): Promise<AxiosResponse<ListingsResponse<'query', P>>>;
}
export default Listings;
