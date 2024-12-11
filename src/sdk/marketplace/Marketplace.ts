import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { MarketplaceResponse } from '../../types/marketplace/marketplace';

class Marketplace {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/marketplace';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async show() {
    return this.axios.get<MarketplaceResponse<'show'>>(`${this.endpoint}/show`, {
      ...this.headers,
    })
  }
}

export default Marketplace;