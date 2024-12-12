import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  AvailabilityExceptionsCreateParameter,
  AvailabilityExceptionsDeleteParameter,
  AvailabilityExceptionsQueryParameter,
  AvailabilityExceptionsResponse
} from '../../types/marketplace/availabilityExceptions';
import { ExtraParameter } from '../../types/sharetribe';

class AvailabilityExceptions {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/availability_exceptions';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async query<P extends AvailabilityExceptionsQueryParameter>(params: P) {
    return this.axios.get<AvailabilityExceptionsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }

  async create<P extends AvailabilityExceptionsCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<AvailabilityExceptionsResponse<'create', P, EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, this.headers);
  }

  async delete<P extends AvailabilityExceptionsDeleteParameter>(params: P) {
    return this.axios.post<AvailabilityExceptionsResponse<'delete', P>>(`${this.endpoint}/delete`, params, this.headers);
  }
}

export default AvailabilityExceptions;
