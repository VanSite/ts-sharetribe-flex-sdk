/**
 * @fileoverview Client for uploading images in the Sharetribe Marketplace API.
 *
 * Use this to upload images for listings, user profiles, or other resources.
 * Returns an image resource with variants ready for responsive display.
 *
 * @see https://www.sharetribe.com/api-reference/marketplace.html#images
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import MarketplaceApi from "./index";
import {ExtraParameter, ImagesResponse, ImagesUploadParameter,} from "../../types";

/**
 * Images API client
 */
class Images {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = `${api.endpoint}/images`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Upload an image
   *
   * @template P
   * @template EP
   * @param {P & ImagesUploadParameter} params - Must include `image: File`
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<AxiosResponse<ImagesResponse<"upload", EP>>>}
   *
   * @example
   * const file = inputElement.files[0];
   * const { data } = await sdk.images.upload({ image: file });
   * console.log(data.id); // → "img-abc123"
   * console.log(data.attributes.variants["square-small"]?.url);
   */
  async upload<
    P extends ImagesUploadParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<ImagesResponse<"upload", EP>>> {
    const formData = new FormData();

    // Append all defined fields (skip null/undefined)
    Object.entries({...params, ...extraParams}).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });

    return this.axios.post(`${this.endpoint}/upload`, formData, {
      headers: {
        ...this.headers,
        // Let browser set correct boundary
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default Images;