import {AxiosInstance} from 'axios';
import MarketplaceApi from './index';
import {
  ListingsApproveParameter,
  ListingsCloseParameter,
  ListingsCreateParameter,
  ListingsOpenParameter,
  ListingsQueryParameter,
  ListingsResponse,
  ListingsShowParameter,
  ListingsUpdateParameter
} from '../../types/marketplace/listings';
import {ExtraParameter} from "../../types/sharetribe";

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

  async create<P extends ListingsCreateParameter, EP extends ExtraParameter>(params: ListingsCreateParameter, extraParams: EP | void) {
    return this.axios.post<ListingsResponse<'create', P, EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, {});
  }

  async update<P extends ListingsUpdateParameter, EP extends ExtraParameter>(params: ListingsUpdateParameter, extraParams: EP | void) {
    return this.axios.post<ListingsResponse<'update', P, EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, {});
  }

  async close<P extends ListingsCloseParameter, EP extends ExtraParameter>(params: ListingsCloseParameter, extraParams: EP | void) {
    return this.axios.post<ListingsResponse<'close', P, EP>>(`${this.endpoint}/close`, {...params, ...extraParams}, {});
  }

  async open<P extends ListingsOpenParameter, EP extends ExtraParameter>(params: ListingsOpenParameter, extraParams: EP | void) {
    return this.axios.post<ListingsResponse<'open', P, EP>>(`${this.endpoint}/open`, {...params, ...extraParams}, {});
  }

  async approve<P extends ListingsApproveParameter, EP extends ExtraParameter>(params: ListingsApproveParameter, extraParams: EP | void) {
    return this.axios.post<ListingsResponse<'approve', P, EP>>(`${this.endpoint}/approve`, {...params, ...extraParams}, {});
  }

}

export default Listings;