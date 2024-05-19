import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { BookingsQueryParameter, BookingsResponse } from '../../types/marketplace/bookings';

class Bookings {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/bookings';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async query<P extends BookingsQueryParameter>(params: P) {
    return this.axios.get<BookingsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }
}

export default Bookings;