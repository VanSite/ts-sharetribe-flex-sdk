/**
 * @fileoverview Provides the OwnListings class for managing the authenticated user's listings in the Sharetribe Marketplace API.
 * This class includes methods for creating, updating, publishing, and managing the lifecycle of listings.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#own-listings
 */
import { AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { OwnListingsAddImageParameter, OwnListingsCloseParameter, OwnListingsCreateDraftParameter, OwnListingsCreateParameter, OwnListingsDiscardDraftParameter, OwnListingsOpenParameter, OwnListingsPublishDraftParameter, OwnListingsQueryParameter, OwnListingsResponse, OwnListingsShowParameter, OwnListingsUpdateParameter } from '../../types/marketplace/ownListings';
import { ExtraParameter } from '../../types/sharetribe';
/**
 * Class representing the Own Listings API.
 *
 * This class provides methods for the authenticated user to manage their listings, including creating, updating, publishing drafts, and adding images.
 */
declare class OwnListings {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    /**
     * Creates an instance of the OwnListings class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
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
    show<P extends OwnListingsShowParameter>(params: P): Promise<AxiosResponse<OwnListingsResponse<'show', P>>>;
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
    query<P extends OwnListingsQueryParameter>(params: P): Promise<AxiosResponse<OwnListingsResponse<'query', P>>>;
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
    create<P extends OwnListingsCreateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<OwnListingsResponse<'create', P, EP>>>;
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
    createDraft<P extends OwnListingsCreateDraftParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<OwnListingsResponse<'createDraft', P, EP>>>;
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
    update<P extends OwnListingsUpdateParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<OwnListingsResponse<'update', P, EP>>>;
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
    publishDraft<P extends OwnListingsPublishDraftParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<OwnListingsResponse<'publishDraft', P, EP>>>;
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
    discardDraft<P extends OwnListingsDiscardDraftParameter>(params: P): Promise<AxiosResponse<OwnListingsResponse<'discardDraft', P>>>;
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
    close<P extends OwnListingsCloseParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<OwnListingsResponse<'close', P>>>;
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
    open<P extends OwnListingsOpenParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<OwnListingsResponse<'open', P>>>;
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
    addImage<P extends OwnListingsAddImageParameter, EP extends ExtraParameter>(params: P, extraParams?: EP): Promise<AxiosResponse<OwnListingsResponse<'addImage', P>>>;
}
export default OwnListings;
