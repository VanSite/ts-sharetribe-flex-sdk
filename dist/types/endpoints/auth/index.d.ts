import { AuthWithIdpParameter, Endpoint, RevokeResponse, ScopeType, TokenResponse } from '../../types/authentication';
import SharetribeSdk from '../../sdk';
import IntegrationSdk from "../../integrationSdk";
declare class AuthenticationApi {
    private readonly endpoint;
    private readonly headers;
    private axios;
    constructor(sdk: SharetribeSdk | IntegrationSdk);
    token<S extends ScopeType>(params: Endpoint<S>): Promise<import("axios").AxiosResponse<TokenResponse<S>, any>>;
    authWithIdp<P extends AuthWithIdpParameter>(params: P): Promise<import("axios").AxiosResponse<import("../../types/authentication").AuthToken, any>>;
    revoke(token: string): Promise<import("axios").AxiosResponse<RevokeResponse, any>>;
    details(): Promise<import("axios").AxiosResponse<import("../../types/authentication").TokenDetails, any>>;
}
export default AuthenticationApi;
