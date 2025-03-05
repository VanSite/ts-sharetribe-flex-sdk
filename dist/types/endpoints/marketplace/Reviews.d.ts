/**
 * @fileoverview Provides the Reviews class for managing reviews in the Sharetribe Marketplace API.
 * This class includes methods for querying and retrieving details of reviews.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#reviews
 */
import { AxiosResponse } from "axios";
import MarketplaceApi from "./index";
import { ReviewsQueryParameter, ReviewsResponse, ReviewsShowParameter } from "../../types/marketplace/reviews";
/**
 * Class representing the Reviews API.
 *
 * The Reviews API provides methods for querying and retrieving details of reviews within the marketplace.
 */
declare class Reviews {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    /**
     * Creates an instance of the Reviews class.
     *
     * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
     */
    constructor(api: MarketplaceApi);
    /**
     * Retrieves details of a specific review.
     *
     * @template P
     * @param {P & ReviewsShowParameter} params - Parameters identifying the review.
     * @returns {Promise<AxiosResponse<ReviewsResponse<'show', P>>>} - A promise resolving to the review details.
     *
     * @example
     * const response = await sdk.reviews.show({ id: 'review-id' });
     * const review = response.data;
     */
    show<P extends ReviewsShowParameter>(params: P): Promise<AxiosResponse<ReviewsResponse<"show", P>>>;
    /**
     * Queries reviews based on specified filters.
     *
     * @template P
     * @param {P & ReviewsQueryParameter} params - Query parameters to filter reviews.
     * @returns {Promise<AxiosResponse<ReviewsResponse<'query', P>>>} - A promise resolving to the query results.
     *
     * @example
     * const response = await sdk.reviews.query({ listingId: 'listing-id', perPage: 10 });
     * const reviews = response.data;
     */
    query<P extends ReviewsQueryParameter>(params: P): Promise<AxiosResponse<ReviewsResponse<"query", P>>>;
}
export default Reviews;
//# sourceMappingURL=Reviews.d.ts.map