import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { ListingsShowParameter, ListingsResponse, ListingsQueryParameter } from '../../types/marketplace/listings';

class Listings {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/listings';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async show<P extends ListingsShowParameter>(params: P) {
    return this.axios.get<ListingsResponse<'show', P>>(`${this.endpoint}/show`, {
      ...this.headers,
      params
    })
  }

  async query<P extends ListingsQueryParameter>(params: P) {
    return this.axios.get<ListingsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }
}

export default Listings;