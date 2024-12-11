import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { TimeSlotsQueryParameter, TimeSlotsResponse } from '../../types/marketplace/timeSlots';

class TimeSlots{
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/timeslots';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async query<P extends TimeSlotsQueryParameter>(params: P) {
    return this.axios.get<TimeSlotsResponse<'query'>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }
}
export default TimeSlots;