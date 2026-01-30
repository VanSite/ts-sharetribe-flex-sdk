/**
 * @fileoverview Type definitions for SitemapData in the Sharetribe Marketplace API.
 *
 * The sitemap_data endpoints provide data for generating XML sitemaps:
 * - queryListings: Returns up to 10,000 most recent public listings
 * - queryAssets: Returns CMS pages/assets created in Console
 *
 * @see https://www.sharetribe.com/docs/concepts/sitemap-in-sharetribe/
 */

import {ApiMeta, UUID} from "../sharetribe";

/**
 * Minimal listing data for sitemap generation
 */
export interface SitemapListing {
  id: UUID;
  type: "listing";
}

/**
 * CMS asset data for sitemap generation
 */
export interface SitemapAsset {
  id: UUID;
  type: "asset";
  attributes: {
    assetPath: string;
  };
}

/**
 * Response from sitemap_data/query_listings
 *
 * Returns up to 10,000 most recent public listings.
 * Results are cached for 1 day.
 */
export interface SitemapListingsResponse {
  data: SitemapListing[];
  meta: ApiMeta;
}

/**
 * Response from sitemap_data/query_assets
 *
 * Returns CMS pages created in Console.
 * Excludes pages with built-in/custom paths.
 */
export interface SitemapAssetsResponse {
  data: SitemapAsset[];
  meta: ApiMeta;
}
