/**
 * @fileoverview Provides the Images class for managing images in the Sharetribe Marketplace API.
 * This class allows uploading images for marketplace listings and resources.
 *
 * For more details, refer to the Marketplace API documentation:
 * https://www.sharetribe.com/api-reference/marketplace.html#images
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import MarketplaceApi from './index';
import { ImagesResponse, ImagesUploadParameter } from '../../types/marketplace/images';
import { ExtraParameter } from '../../types/sharetribe';

/**
 * Class representing the Images API.
 *
 * The Images API provides methods to upload images for marketplace resources.
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
  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/images';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Uploads an image to the marketplace.
   *
   * @template P
   * @template EP
   * @param {P & ImagesUploadParameter} params - The image upload parameters, including the image file and metadata.
   * @param {EP & ExtraParameter} extraParams - Optional extra parameters for the request.
   * @returns {Promise<AxiosResponse<ImagesResponse<'upload', EP>>>} - A promise resolving to the uploaded image details.
   *
   * @example
   * const response = await sdk.images.upload({
   *   image: file,
   * });
   *
   * const uploadedImage = response.data;
   */
  async upload<P extends ImagesUploadParameter, EP extends ExtraParameter>(
    params: P,
    extraParams: EP
  ): Promise<AxiosResponse<ImagesResponse<'upload', EP>>> {
    return this.axios.post<ImagesResponse<'upload', EP>>(
      `${this.endpoint}/upload`,
      { ...params, ...extraParams },
      { ...this.headers }
    );
  }
}

export default Images;
