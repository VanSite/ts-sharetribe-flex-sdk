import { AuthWithIdpParameter, Endpoint, RevokeResponse, ScopeType, TokenResponse } from '../../types/authentication';
import { AxiosInstance } from 'axios';
import SharetribeSdk from '../../sdk';
import IntegrationSdk from "../../integrationSdk";

class AuthenticationApi {
  private readonly endpoint: string;
  private readonly headers: Record<string, string>;
  private axios: AxiosInstance;

  constructor(sdk: SharetribeSdk | IntegrationSdk) {
    const config = sdk.apisConfigs.auth(sdk.sdkConfig);
    this.endpoint = config.baseUrl;
    this.headers = config.headers;
    this.axios = sdk.axios;
  }

  async token<S extends ScopeType>(params: Endpoint<S>) {
    return this.axios.post<TokenResponse<S>>(`${this.endpoint}/token`, params, {  // Replace `any` with the actual type
      headers: this.headers,
    });
  }

  async authWithIdp<P extends AuthWithIdpParameter>(params: P) {  // Replace `any` with the actual type
    return this.axios.post<TokenResponse<"user">>(`${this.endpoint}/auth_with_idp`, params, {
      headers: this.headers
    });
  }

  async revoke(token: string) {  // Replace `any` with the actual type
    return this.axios.post<RevokeResponse>(`${this.endpoint}/revoke`, {token}, {
      headers: this.headers,
    });
  }

  async details() {
    return this.axios.get<TokenResponse<'details'>>(`${this.endpoint}/details`, {
      headers: this.headers,
    });
  }

}

export default AuthenticationApi;