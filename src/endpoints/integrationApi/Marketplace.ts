/**
 * @fileoverview Provides the Marketplace class for interacting with the Sharetribe Integration API.
 * This class allows fetching details about the marketplace configuration.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#marketplace
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import IntegrationApi from './index';
import { MarketplaceResponse } from '../../types/marketplace/marketplace';

/**
 * Class representing the Marketplace API.
 *
 * The Marketplace API provides methods to retrieve marketplace configuration details.
 */
class Marketplace {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the Marketplace class.
   *
   * @param {MarketplaceApi} api - The Marketplace API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + '/marketplace';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Retrieves details about the marketplace configuration.
   *
   * @returns {Promise<AxiosResponse<MarketplaceResponse<'show'>>>} - A promise resolving to the marketplace details.
   *
   * @example
   * const response = await integrationSdk.marketplace.show();
   *
   * const marketplaceDetails = response.data;
   */
  async show(): Promise<AxiosResponse<MarketplaceResponse<'show'>>> {
    return this.axios.get<MarketplaceResponse<'show'>>(`${this.endpoint}/show`, {
      ...this.headers,
    });
  }
}

export default Marketplace;
