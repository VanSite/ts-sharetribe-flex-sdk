/**
 * @fileoverview Provides the TimeSlots class for managing time slots in the Sharetribe Marketplace API.
 * This class includes methods for querying available time slots for marketplace resources.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#time-slots
 */
import { AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import { TimeSlotsQueryParameter, TimeSlotsResponse } from "../../types/marketplace/timeSlots";
/**
 * Class representing the Time Slots API.
 *
 * The Time Slots API provides methods for querying available time slots for bookings.
 */
declare class TimeSlots {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    /**
     * Creates an instance of the TimeSlots class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Queries available time slots based on specified filters.
     *
     * @template P
     * @param {P & TimeSlotsQueryParameter} params - Query parameters for filtering time slots.
     * @returns {Promise<AxiosResponse<TimeSlotsResponse<'query'>>>} - A promise resolving to the query results.
     *
     * @example
     * const response = await sdk.timeSlots.query({
     *   listingId: 'listing-id',
     *   start: '2024-01-01T00:00:00Z',
     *   end: '2024-01-07T23:59:59Z',
     * });
     * const timeSlots = response.data;
     */
    query<P extends TimeSlotsQueryParameter>(params: P): Promise<AxiosResponse<TimeSlotsResponse<"query">>>;
}
export default TimeSlots;
//# sourceMappingURL=TimeSlots.d.ts.map