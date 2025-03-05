/**
 * @fileoverview Provides the Bookings class for managing bookings in the Sharetribe Marketplace API.
 * This class allows querying booking records.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#bookings
 */
import { AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import { BookingsQueryParameter, BookingsResponse } from "../../types/marketplace/bookings";
/**
 * Class representing the Bookings API.
 *
 * The Bookings API provides methods to query booking records for marketplace resources.
 */
declare class Bookings {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    /**
     * Creates an instance of the Bookings class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Queries booking records based on specified filters.
     *
     * @template P
     * @param {P & BookingsQueryParameter} params - Query parameters to filter booking records.
     * @returns {Promise<AxiosResponse<BookingsResponse<'query', P>>>} - A promise resolving to the query results.
     *
     * @example
     * const response = await sdk.bookings.query({
     *   listingId: 'listing-id',
     *   start: '2024-12-01T00:00:00Z',
     *   end: '2024-12-31T23:59:59Z',
     * });
     *
     * const bookings = response.data;
     */
    query<P extends BookingsQueryParameter>(params: P): Promise<AxiosResponse<BookingsResponse<"query", P>>>;
}
export default Bookings;
//# sourceMappingURL=Bookings.d.ts.map