import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import { ExtraParameter } from '../../types/sharetribe';
import { MessagesQueryParameter, MessagesResponse, MessagesSendParameter } from '../../types/marketplace/messages';

class Messages {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/messages';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async query<P extends MessagesQueryParameter>(params: P) {
    return this.axios.get<MessagesResponse<'query', P>>(`${this.endpoint}/query`, {
      ...this.headers,
      params
    })
  }

  async send<P extends MessagesSendParameter, EP extends ExtraParameter>(params: P, extraParams: EP | void) {
    return this.axios.post<MessagesResponse<'send', P, EP>>(`${this.endpoint}/create`, {...params, ...extraParams}, this.headers);
  }
}

export default Messages;