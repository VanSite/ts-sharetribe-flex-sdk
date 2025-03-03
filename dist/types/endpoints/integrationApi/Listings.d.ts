/**
 * @fileoverview Provides the Listings class for managing listings in the Sharetribe Integration API.
 * This class allows creating, updating, querying, and performing other operations on marketplace listings.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#listings
 */
import { AxiosResponse } from 'axios';
import IntegrationApi from './index';
import { ListingsApproveParameter, ListingsCloseParameter, ListingsCreateParameter, ListingsOpenParameter, ListingsQueryParameter, ListingsResponse, ListingsShowParameter, ListingsUpdateParameter } from '../../types/marketplace/listings';
import { ExtraParameter } from '../../types/sharetribe';
/**
 * Class representing the Listings API.
 *
 * The Listings API provides methods to manage marketplace listings, such as creating, updating, querying, and approving listings.
 */
declare class Listings {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    /**
     * Creates an instance of the Listings class.
     *
     * @param {IntegrationApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: IntegrationApi);
    /**
     * Retrieves details of a specific listing.
     *
     * @template P
     * @param {P & ListingsShowParameter} params - The parameters to identify the listing.
     * @returns {Promise<ListingsResponse<'show', P>>} - A promise resolving to the listing details.
     *
     * @example
     * const response = await integrationSdk.listings.show({
     *   id: 'listing-id'
     * });
     *
     * const listing = response.data;
     */
    show<P extends ListingsShowParameter>(params: P): Promise<AxiosResponse<ListingsResponse<'show', P>>>;
    /**
     * Queries listings based on specified filters.
     *
     * @template P
     * @param {P & ListingsQueryParameter} params - Query parameters to filter listings.
     * @returns {Promise<ListingsResponse<'query', P>>} - A promise resolving to the query results.
     *
     * @example
     * const response = await integrationSdk.listings.query({
     *   ids: ['listing-id-1', 'listing-id-2'],
     *   per_page: 10,
     *   page: 1
     * });
     *
     * const listings = response.data;
     */
    query<P extends ListingsQueryParameter>(params: P): Promise<AxiosResponse<ListingsResponse<'query', P>>>;
    /**
     * Creates a new listing.
     *
     * @template P
     * @template EP
     * @param {P & ListingsCreateParameter} params - Parameters for the new listing.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<ListingsResponse<'create', P, EP>>} - A promise resolving to the created listing.
     *
     * @example
     * const response = await integrationSdk.listings.create({
     *   title: 'New Listing',
     *   description: 'Description of the listing',
     *   authorId: 'user-id',
     *   state: 'published'
     * });
     *
     * const newListing = response.data;
     */
    create<P extends ListingsCreateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<ListingsResponse<'create', P, EP>>>;
    /**
     * Updates an existing listing.
     *
     * @template P
     * @template EP
     * @param {P & ListingsUpdateParameter} params - Parameters for the listing update.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<ListingsResponse<'update', P, EP>>} - A promise resolving to the updated listing.
     *
     * @example
     * const response = await integrationSdk.listings.update({
     *   id: 'listing-id',
     *   title: 'Updated Title'
     * });
     *
     * const updatedListing = response.data;
     */
    update<P extends ListingsUpdateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<ListingsResponse<'update', P, EP>>>;
    /**
     * Closes a listing.
     *
     * @template P
     * @template EP
     * @param {P & ListingsCloseParameter} params - Parameters to identify the listing to close.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<ListingsResponse<'close', P, EP>>} - A promise resolving to the closed listing.
     *
     * @example
     * const response = await integrationSdk.listings.close({
     *   id: 'listing-id'
     * });
     *
     * const closedListing = response.data;
     */
    close<P extends ListingsCloseParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<ListingsResponse<'close', P, EP>>>;
    /**
     * Opens a listing.
     *
     * @template P
     * @template EP
     * @param {P & ListingsOpenParameter} params - Parameters to identify the listing to open.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<ListingsResponse<'open', P, EP>>} - A promise resolving to the opened listing.
     *
     * @example
     * const response = await integrationSdk.listings.open({
     *   id: 'listing-id'
     * });
     *
     * const openedListing = response.data;
     */
    open<P extends ListingsOpenParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<ListingsResponse<'open', P, EP>>>;
    /**
     * Approves a listing.
     *
     * @template P
     * @template EP
     * @param {P & ListingsApproveParameter} params - Parameters to identify the listing to approve.
     * @param {EP | void} extraParams - Optional extra parameters for the request.
     * @returns {Promise<ListingsResponse<'approve', P, EP>>} - A promise resolving to the approved listing.
     *
     * @example
     * const response = await integrationSdk.listings.approve({
     *   id: 'listing-id'
     * });
     *
     * const approvedListing = response.data;
     */
    approve<P extends ListingsApproveParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<ListingsResponse<'approve', P, EP>>>;
}
export default Listings;
