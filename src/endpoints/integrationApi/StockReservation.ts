import {AxiosInstance} from 'axios';
import MarketplaceApi from './index';
import {StockReservationShowParameter, StockReservationsResponse} from "../../types/marketplace/stockReservations";

class StockReservation {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/stock_reservations';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async show<P extends StockReservationShowParameter>(params: P) {
    return this.axios.get<StockReservationsResponse<'show', P>>(`${this.endpoint}/show`, {
      ...this.headers,
      params
    })
  }
}

export default StockReservation;