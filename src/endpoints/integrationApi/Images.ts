/**
 * @fileoverview Client for uploading images in the Sharetribe Integration API.
 *
 * Images uploaded via this endpoint can be attached to listings, user profiles, or used as assets.
 *
 * @see https://www.sharetribe.com/api-reference/integration.html#images
 */

import type {AxiosInstance, AxiosResponse} from "axios";
import IntegrationApi from "./index";
import {ExtraParameter, ImagesResponse, ImagesUploadParameter} from "../../types";

/**
 * Images API client
 */
class Images {
  public readonly authRequired = true;
  private readonly axios: AxiosInstance;
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;

  constructor(api: IntegrationApi) {
    this.endpoint = `${api.endpoint}/images`;
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Upload an image
   *
   * @template P
   * @template EP
   * @param {P & ImagesUploadParameter} params - Upload parameters (must include `image: File`)
   * @param {EP} [extraParams] - Optional extra parameters (e.g. `expand: true`)
   * @returns {Promise<AxiosResponse<ImagesResponse<"upload", EP>>>}
   *
   * @example
   * const file = input.files[0];
   * const { data } = await sdk.images.upload({ image: file });
   * console.log(data.id); // → "img-abc123"
   */
  async upload<
    P extends ImagesUploadParameter,
    EP extends ExtraParameter | undefined = undefined
  >(
    params: P,
    extraParams?: EP
  ): Promise<AxiosResponse<ImagesResponse<"upload", EP>>> {
    const formData = new FormData();

    // Append all params (including extraParams)
    Object.entries({...params, ...extraParams}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    return this.axios.post(`${this.endpoint}/upload`, formData, {
      headers: {
        ...this.headers,
        // Let browser set Content-Type with proper boundary
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default Images;