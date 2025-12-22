/**
 * @fileoverview Client for querying reviews in the Sharetribe Marketplace API.
 *
 * Use this to fetch your own reviews or reviews for listings you own.
 * Only returns reviews the current user is authorized to see.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#reviews
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {ReviewsQueryParameter, ReviewsResponse, ReviewsShowParameter,} from "../../types";

/**
 * Reviews API client (own reviews only)
 */
class Reviews {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/reviews`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Fetch a single review by ID
   *
   * @template P
   * @param {P & ReviewsShowParameter} params
   * @returns {Promise<AxiosResponse<ReviewsResponse<"show", P>>>}
   *
   * @example
   * const { data } = await sdk.reviews.show({ id: "rev-abc123" });
   */
  async show<P extends ReviewsShowParameter>(
    params: P
  ): Promise<AxiosResponse<ReviewsResponse<"show", P>>> {
    return this.axios.get(`${this.endpoint}/show`, {
      headers: this.headers,
      params,
    });
  }

  /**
   * Query your own reviews or reviews for your listings
   *
   * @template P
   * @param {P & ReviewsQueryParameter} params
   * @returns {Promise<AxiosResponse<ReviewsResponse<"query", P>>>}
   *
   * @example
   * // All reviews you've received
   * const { data } = await sdk.reviews.query({ subjectId: "current" });
   *
   * @example
   * // Reviews for one of your listings
   * await sdk.reviews.query({ listingId: "listing-abc123" });
   */
  async query<P extends ReviewsQueryParameter>(
    params: P
  ): Promise<AxiosResponse<ReviewsResponse<"query", P>>> {
    return this.axios.get(`${this.endpoint}/query`, {
      headers: this.headers,
      params,
    });
  }
}

export default Reviews;