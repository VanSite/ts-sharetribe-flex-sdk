import {AxiosInstance} from 'axios';
import MarketplaceApi from './index';
import {
  TransactionsQueryParameter,
  TransactionsResponse,
  TransactionsShowParameter,
  TransactionsTransitionParameter,
  TransactionsTransitionSpeculativeParameter,
  TransactionsUpdateMetadataParameter
} from '../../types/marketplace/transaction';
import {ExtraParameter} from '../../types/sharetribe';

class Transactions {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/transactions';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async show<P extends TransactionsShowParameter>(params: P) {
    return this.axios.get<TransactionsResponse<'show', P>>(`${this.endpoint}/show`, {
      ...this.headers,
      params
    })
  }

  async query<P extends TransactionsQueryParameter<true>>(params: P) {
    return this.axios.get<TransactionsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }

  async transition<P extends TransactionsTransitionParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<TransactionsResponse<'transition', P, EP>>(`${this.endpoint}/transition`, {...params, ...extraParams}, this.headers);
  }

  async transitionSpeculative<P extends TransactionsTransitionSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<TransactionsResponse<'transitionSpeculative', P, EP>>(`${this.endpoint}/transition_speculative`, {...params, ...extraParams}, this.headers);
  }

  async updateMetadata<P extends TransactionsUpdateMetadataParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<TransactionsResponse<'updateMetadata', P, EP>>(`${this.endpoint}/update_metadata`, {...params, ...extraParams}, this.headers);
  }
}

export default Transactions;