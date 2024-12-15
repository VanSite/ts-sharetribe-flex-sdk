import MarketplaceApi from './index';
import { CurrentUserChangeEmailParameter, CurrentUserChangePasswordParameter, CurrentUserCreateParameter, CurrentUserCreateWithIdpParameter, CurrentUserResponse, CurrentUserShowParameter, CurrentUserUpdateProfileParameter, CurrentUserVerifyEmailParameter } from '../../types/marketplace/currentUser';
import { ExtraParameter } from '../../types/sharetribe';
declare class CurrentUser {
    private readonly endpoint;
    private readonly axios;
    private readonly headers;
    readonly authRequired = true;
    constructor(api: MarketplaceApi);
    show<P extends CurrentUserShowParameter>(params: P): Promise<import("axios").AxiosResponse<CurrentUserResponse<"show", P>, any>>;
    delete<P extends CurrentUserCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<CurrentUserResponse<"delete", P>, any>>;
    create<P extends CurrentUserCreateParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<CurrentUserResponse<"create", P>, any>>;
    createWithIdp<P extends CurrentUserCreateWithIdpParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<CurrentUserResponse<"create_with_idp", P>, any>>;
    updateProfile<P extends CurrentUserUpdateProfileParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<CurrentUserResponse<"update_profile", P>, any>>;
    changePassword<P extends CurrentUserChangePasswordParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<CurrentUserResponse<"change_password", P>, any>>;
    changeEmail<P extends CurrentUserChangeEmailParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<CurrentUserResponse<"change_email", P>, any>>;
    verifyEmail<P extends CurrentUserVerifyEmailParameter, EP extends ExtraParameter>(params: P, extraParams: EP): Promise<import("axios").AxiosResponse<CurrentUserResponse<"verify_email", P>, any>>;
    sendVerificationEmail<P extends void>(): Promise<import("axios").AxiosResponse<CurrentUserResponse<"send_verification_email", P>, any>>;
    /**
     * @deprecated This API endpoint is DEPRECATED. Use /stripe_account/create instead!
     */
    createStripeAccount(): Promise<void>;
    /**
     * @deprecated This API endpoint is DEPRECATED. Use /stripe_account/update instead!
     */
    updateStripeAccount(): Promise<void>;
}
export default CurrentUser;
