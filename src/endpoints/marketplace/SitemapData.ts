/**
 * @fileoverview Client for querying sitemap data in the Sharetribe Marketplace API.
 *
 * Use this to generate XML sitemaps for SEO:
 * - queryListings: Up to 10,000 most recent public listing IDs
 * - queryAssets: CMS page asset paths from Console
 *
 * Note: Results are cached for 1 day by the API.
 *
 * @see https://www.sharetribe.com/docs/concepts/sitemap-in-sharetribe/
 */

import type {HttpClient, HttpResponse} from "../../types";
import type MarketplaceApi from "./index";
import {SitemapAssetsResponse, SitemapListingsResponse} from "../../types/marketplace/sitemapData";

/**
 * Sitemap Data API client
 *
 * Provides access to sitemap generation endpoints.
 * These endpoints return minimal data needed for sitemap XML generation.
 */
class SitemapData {
  private readonly httpClient: HttpClient;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/sitemap_data`;
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Query listing IDs for sitemap generation
   *
   * Returns up to 10,000 most recent public listings.
   * For marketplaces with more listings, use Integration API
   * with createdAt filtering for older listings.
   *
   * @returns {Promise<HttpResponse<SitemapListingsResponse>>}
   *
   * @example
   * const { data } = await sdk.sitemapData.queryListings();
   * // Generate sitemap URLs from listing IDs
   * data.data.forEach(listing => {
   *   console.log(`/l/${listing.id}`);
   * });
   */
  async queryListings(): Promise<HttpResponse<SitemapListingsResponse>> {
    return this.httpClient.get(`${this.endpoint}/query_listings`, {
      headers: this.headers,
    });
  }

  /**
   * Query CMS asset paths for sitemap generation
   *
   * Returns pages created in Sharetribe Console.
   * Excludes pages with built-in or custom paths.
   *
   * @returns {Promise<HttpResponse<SitemapAssetsResponse>>}
   *
   * @example
   * const { data } = await sdk.sitemapData.queryAssets();
   * // Generate sitemap URLs from asset paths
   * data.data.forEach(asset => {
   *   console.log(`/p/${asset.attributes.assetPath}`);
   * });
   */
  async queryAssets(): Promise<HttpResponse<SitemapAssetsResponse>> {
    return this.httpClient.get(`${this.endpoint}/query_assets`, {
      headers: this.headers,
    });
  }
}

export default SitemapData;
