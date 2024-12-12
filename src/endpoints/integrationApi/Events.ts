import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { BookingsQueryParameter, BookingsResponse } from '../../types/marketplace/bookings';
import {EventQueryParameter, EventsResponse} from "../../types/integration/events";

class Events {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/bookings';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async query<P extends EventQueryParameter>(params: P) {
    return this.axios.get<EventsResponse<'query'>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }
}

export default Events;