import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  ProcessTransitionsQueryParameter,
  ProcessTransitionsResponse
} from '../../types/marketplace/processTransitions';

class ProcessTransitions {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;
  public readonly authRequired = true;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/process_transitions';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async query<P extends ProcessTransitionsQueryParameter>(params: P) {
    return this.axios.get<ProcessTransitionsResponse<'query'>>('query', {
      ...this.headers,
      params
    })
  }
}

export default ProcessTransitions;