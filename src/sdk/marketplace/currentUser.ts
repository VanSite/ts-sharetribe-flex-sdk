import { AxiosInstance } from 'axios';
import MarketplaceApi from './index';
import {
  CurrentUserChangeEmailParameter,
  CurrentUserChangePasswordParameter,
  CurrentUserCreateParameter,
  CurrentUserCreateWithIdpParameter,
  CurrentUserResponse,
  CurrentUserShowParameter, CurrentUserUpdateProfileParameter, CurrentUserVerifyEmailParameter
} from '../../types/marketplace/currentUser';
import { ExtraParameter } from '../../types/sharetribe';

class CurrentUser {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  constructor(api: MarketplaceApi) {
    this.endpoint = api.endpoint + '/current_user';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  async show<P extends CurrentUserShowParameter>(params: P) {
    return this.axios.get<CurrentUserResponse<'show', P>>(`${this.endpoint}/show`, {
      ...this.headers,
      params
    })
  }

  async delete<P extends CurrentUserCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<CurrentUserResponse<'delete', P>>(`${this.endpoint}/delete`, {...params, ...extraParams}, {...this.headers,})
  }

  async create<P extends CurrentUserCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<CurrentUserResponse<'create', P>>(`${this.endpoint}/create`, {...params, ...extraParams}, {...this.headers,})
  }

  async createWithIdp<P extends CurrentUserCreateWithIdpParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<CurrentUserResponse<'create_with_idp', P>>(`${this.endpoint}/create_with_idp`, {...params, ...extraParams}, {...this.headers,})
  }

  async updateProfile<P extends CurrentUserUpdateProfileParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<CurrentUserResponse<'update_profile', P>>(`${this.endpoint}/update_profile`, {...params, ...extraParams}, {...this.headers,})
  }

  async changePassword<P extends CurrentUserChangePasswordParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<CurrentUserResponse<'change_password', P>>(`${this.endpoint}/change_password`, {...params, ...extraParams}, {...this.headers,})
  }

  async changeEmail<P extends CurrentUserChangeEmailParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<CurrentUserResponse<'change_email', P>>(`${this.endpoint}/change_email`, {...params, ...extraParams}, {...this.headers,})
  }

  async verifyEmail<P extends CurrentUserVerifyEmailParameter, EP extends ExtraParameter>(params: P, extraParams: EP) {
    return this.axios.post<CurrentUserResponse<'verify_email', P>>(`${this.endpoint}/verify_email`, {...params, ...extraParams}, {...this.headers,})
  }

  async sendVerificationEmail<P extends void>() {
    return this.axios.post<CurrentUserResponse<'send_verification_email', P>>(`${this.endpoint}/send_verification_email`, null, {...this.headers,})
  }

  /**
   * @deprecated This API endpoint is DEPRECATED. Use /stripe_account/create instead!
   */
  async createStripeAccount() {
    throw new Error('This API endpoint is DEPRECATED. Use /stripe_account/create instead!');
  }

  /**
   * @deprecated This API endpoint is DEPRECATED. Use /stripe_account/update instead!
   */
  async updateStripeAccount() {
    throw new Error('This API endpoint is DEPRECATED. Use /stripe_account/update instead!');
  }
}

export default CurrentUser;