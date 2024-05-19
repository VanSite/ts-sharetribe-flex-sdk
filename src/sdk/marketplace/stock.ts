import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { StockCompareAndSetParameter, StockResponse } from '../../types/marketplace/stock';
import { ExtraParameter } from '../../types/sharetribe';

class Stock{
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stock';
    this.axios = api.axios;
  }

  async compareAndSet<P extends StockCompareAndSetParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<StockResponse<'compareAndSet', EP>>(`${this.endpoint}/compare_and_set`, {...params, ...extraParams});
  }
}
export default Stock;