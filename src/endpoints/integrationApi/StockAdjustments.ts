import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  StockAdjustmentsCreateParameter,
  StockAdjustmentsQueryParameter, StockAdjustmentsResponse
} from '../../types/marketplace/stockAdjustment';
import { ExtraParameter } from '../../types/sharetribe';

class StockAdjustments{
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stock_adjustments';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async query<P extends StockAdjustmentsQueryParameter>(params: P) {
    return this.axios.get<StockAdjustmentsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }

  async create<P extends StockAdjustmentsCreateParameter, EP extends ExtraParameter | undefined>(params: P, extraParams: EP) {
    return this.axios.post<StockAdjustmentsResponse<'create', P, EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, this.headers);
  }
}
export default StockAdjustments;