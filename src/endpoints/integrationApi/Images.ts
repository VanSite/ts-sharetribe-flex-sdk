/**
 * @fileoverview Provides the Images class for handling image uploads in the Sharetribe Integration API.
 * This class allows uploading images to be used as resources in a Sharetribe marketplace.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#images
 */

import { AxiosInstance, AxiosResponse } from "axios";
import IntegrationApi from "./index";
import {
  ImagesResponse,
  ImagesUploadParameter,
} from "../../types/marketplace/images";
import { ExtraParameter } from "../../types/sharetribe";

/**
 * Class representing the Images API.
 *
 * The Images API allows uploading images to the marketplace for use in listings or other resources.
 */
class Images {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  /**
   * Creates an instance of the Images class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + "/images";
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Uploads an image to the marketplace.
   *
   * @template P
   * @template EP
   * @param {P & ImagesUploadParameter} params - The image upload parameters, including image data and related metadata.
   * @param {EP & ExtraParameter} extraParams - Optional additional parameters for the upload request.
   * @returns {Promise<ImagesResponse<'upload', EP>>} - A promise resolving to the upload response.
   *
   * @example
   * const response = await integrationSdk.images.upload({
   *   image: fileData,
   * });
   *
   * // Access the uploaded image details
   * const imageDetails = response.data;
   */
  async upload<P extends ImagesUploadParameter, EP extends ExtraParameter>(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<ImagesResponse<"upload", EP>>> {
    return this.axios.post<ImagesResponse<"upload", EP>>(
      `${this.endpoint}/upload`,
      { ...params, ...extraParams },
      { headers: this.headers }
    );
  }
}

export default Images;
