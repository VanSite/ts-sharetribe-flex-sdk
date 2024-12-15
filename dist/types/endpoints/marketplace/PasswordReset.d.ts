import MarketplaceApi from './index';
import { PasswordResetRequestParams, PasswordResetResetParams, PasswordResetResponse } from '../../types/marketplace/passwordReset';
import { ExtraParameter } from '../../types/sharetribe';
declare class PasswordReset {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    constructor(api: MarketplaceApi);
    request<P extends PasswordResetRequestParams, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<PasswordResetResponse<"request", EP>, any>>;
    reset<P extends PasswordResetResetParams, EP extends ExtraParameter>(params: P, extraParams: EP | void): Promise<import("axios").AxiosResponse<PasswordResetResponse<"reset", EP>, any>>;
}
export default PasswordReset;
