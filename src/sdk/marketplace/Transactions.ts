import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  TransactionsInitiateParameter,
  TransactionsInitiateSpeculativeParameter,
  TransactionsQueryParameter, TransactionsResponse,
  TransactionsShowParameter,
  TransactionsTransitionParameter,
  TransactionsTransitionSpeculativeParameter
} from '../../types/marketplace/transaction';
import { ExtraParameter } from '../../types/sharetribe';

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

  async query<P extends TransactionsQueryParameter>(params: P) {
    return this.axios.get<TransactionsResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }

  async initiate<P extends TransactionsInitiateParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<TransactionsResponse<'initiate', P, EP>>(`${this.endpoint}/initiate`, {...params, ...extraParams}, this.headers);
  }
  async initiateSpeculative<P extends TransactionsInitiateSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<TransactionsResponse<'initiateSpeculative', P, EP>>(`${this.endpoint}/initiate_speculative`, {...params, ...extraParams}, this.headers);
  }

  async transition<P extends TransactionsTransitionParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<TransactionsResponse<'transition', P, EP>>(`${this.endpoint}/transition`, {...params, ...extraParams}, this.headers);
  }

  async transitionSpeculative<P extends TransactionsTransitionSpeculativeParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<TransactionsResponse<'transitionSpeculative', P, EP>>(`${this.endpoint}/transition_speculative`, {...params, ...extraParams}, this.headers);
  }
}

export default Transactions;