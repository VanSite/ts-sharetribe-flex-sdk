import { SdkConfig } from "./types/config";
import { createApisConfigs } from "./utils/apis";
import { ApiConfigs } from "./types/apiConfigs";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import AuthenticationApi from "./endpoints/auth";
import MarketplaceApi from "./endpoints/marketplace";
import {
  prepareAxiosInstance,
  createAxiosConfig,
} from "./utils/prepare-axios-instance";
import Listings from "./endpoints/marketplace/Listings";
import AvailabilityExceptions from "./endpoints/marketplace/AvailabilityExceptions";
import Bookings from "./endpoints/marketplace/Bookings";
import CurrentUser from "./endpoints/marketplace/CurrentUser";
import Images from "./endpoints/marketplace/Images";
import Marketplace from "./endpoints/marketplace/Marketplace";
import Messages from "./endpoints/marketplace/Messages";
import OwnListings from "./endpoints/marketplace/OwnListings";
import PasswordReset from "./endpoints/marketplace/PasswordReset";
import ProcessTransitions from "./endpoints/marketplace/ProcessTransitions";
import Reviews from "./endpoints/marketplace/Reviews";
import Stock from "./endpoints/marketplace/Stock";
import StockAdjustments from "./endpoints/marketplace/StockAdjustments";
import StripeAccount from "./endpoints/marketplace/StripeAccount";
import StripeAccountLinks from "./endpoints/marketplace/StripeAccountLinks";
import StripeCustomer from "./endpoints/marketplace/StripeCustomer";
import StripePersons from "./endpoints/marketplace/StripePersons";
import StripeSetupIntents from "./endpoints/marketplace/StripeSetupIntents";
import TimeSlots from "./endpoints/marketplace/TimeSlots";
import Transactions from "./endpoints/marketplace/Transactions";
import Users from "./endpoints/marketplace/Users";
import {
  AuthInfoResponse,
  LoginParameter,
  LoginParameterType,
  LoginWithIdpParameter,
  RevokeResponse,
  Scope,
  TokenResponse,
} from "./types/authentication";
import AssetsApi from "./endpoints/assets";
import { DefaultSdkConfig } from "./utils/config";

class SharetribeSdk {
  /**
   * The SDK configuration object.
   * @type {SdkConfig}
   */
  sdkConfig: SdkConfig;

  /**
   * The API configuration object.
   * @type {ApiConfigs}
   */
  apisConfigs: ApiConfigs;

  /**
   * Axios instance for making HTTP requests.
   * @type {AxiosInstance}
   */
  axios: AxiosInstance;

  /**
   * Endpoint for handling authentication.
   * @type {AuthenticationApi}
   */
  auth: AuthenticationApi;

  /**
   * Main marketplace API instance.
   * @type {MarketplaceApi}
   */
  api: MarketplaceApi;

  /**
   * Assets API instance for managing assets.
   * @type {AssetsApi}
   */
  assetsApi: AssetsApi;

  // API Endpoints

  /**
   * Endpoint for managing listings.
   * @type {Listings}
   */
  listings: Listings;

  /**
   * Endpoint for managing availability exceptions.
   * @type {AvailabilityExceptions}
   */
  availabilityExceptions: AvailabilityExceptions;

  /**
   * Endpoint for managing bookings.
   * @type {Bookings}
   * */
  bookings: Bookings;

  /**
   * Endpoint for managing the current user.
   *  @type {CurrentUser}
   */
  currentUser: CurrentUser;

  /**
   * Endpoint for handling images.
   * @type {Images}
   */
  images: Images;

  /**
   * Endpoint for accessing marketplace details.
   *  @type {Marketplace}
   */
  marketplace: Marketplace;

  /**
   * Endpoint for managing messages.
   * @type {Messages}
   */
  messages: Messages;

  /**
   * Endpoint for managing own listings.
   * @type {OwnListings} */
  ownListings: OwnListings;

  /**
   * Endpoint for managing password resets.
   * @type {PasswordReset} */
  passwordReset: PasswordReset;

  /**
   * Endpoint for managing process transitions.
   * @type {ProcessTransitions} */
  processTransitions: ProcessTransitions;

  /**
   * Endpoint for managing reviews.
   *  @type {Reviews} */
  reviews: Reviews;

  /**
   * Endpoint for managing stock.
   * @type {Stock} */
  stock: Stock;

  /**
   * Endpoint for managing stock adjustments.
   * @type {StockAdjustments} */
  stockAdjustments: StockAdjustments;

  /**
   * Endpoint for managing stripe accounts.
   * @type {StripeAccount} */
  stripeAccount: StripeAccount;

  /**
   * Endpoint for managing stripe account links.
   * @type {StripeAccountLinks} */
  stripeAccountLinks: StripeAccountLinks;

  /**
   * Endpoint for managing stripe customers.
   * @type {StripeCustomer} */
  stripeCustomer: StripeCustomer;

  /**
   * Endpoint for managing stripe persons.
   * @type {StripePersons} */
  stripePersons: StripePersons;

  /**
   * Endpoint for managing stripe setup intents.
   * @type {StripeSetupIntents} */
  stripeSetupIntents: StripeSetupIntents;

  /**
   * Endpoint for managing timeslots.
   * @type {TimeSlots} */
  timeslots: TimeSlots;

  /**
   * Endpoint for managing transactions.
   * @type {Transactions} */
  transactions: Transactions;

  /**
   * Endpoint for managing users.
   * @type {Users} */
  users: Users;

  // Asset Endpoints

  /** @type {AssetsApi['assetByAlias']} */
  assetByAlias: AssetsApi["assetByAlias"];

  /** @type {AssetsApi['assetsByAlias']} */
  assetsByAlias: AssetsApi["assetsByAlias"];

  /** @type {AssetsApi['assetByVersion']} */
  assetByVersion: AssetsApi["assetByVersion"];

  /** @type {AssetsApi['assetsByVersion']} */
  assetsByVersion: AssetsApi["assetsByVersion"];

  /**
   * Creates an instance of the Sharetribe SDK.
   *
   * @constructor
   * @param {SdkConfig} config - The configuration object for the SDK.
   */
  constructor(config: SdkConfig) {
    this.sdkConfig = {
      ...DefaultSdkConfig,
      ...config,
    };

    this.apisConfigs = createApisConfigs();
    this.axios = axios.create(
      createAxiosConfig(this, {
        baseURL: `${this.sdkConfig.baseUrl}/${this.sdkConfig.version}/`,
        httpAgent: this.sdkConfig.httpAgent,
        httpsAgent: this.sdkConfig.httpsAgent,
      })
    );
    prepareAxiosInstance(this);

    this.auth = new AuthenticationApi(this);
    this.api = new MarketplaceApi(this);
    this.assetsApi = new AssetsApi(this);

    // Api Endpoints
    this.availabilityExceptions = this.api.availabilityExceptions;
    this.bookings = this.api.bookings;
    this.currentUser = this.api.currentUser;
    this.images = this.api.images;
    this.listings = this.api.listings;
    this.marketplace = this.api.marketplace;
    this.messages = this.api.messages;
    this.ownListings = this.api.ownListings;
    this.passwordReset = this.api.passwordReset;
    this.processTransitions = this.api.processTransitions;
    this.reviews = this.api.reviews;
    this.stock = this.api.stock;
    this.stockAdjustments = this.api.stockAdjustments;
    this.stripeAccount = this.api.stripeAccount;
    this.stripeAccountLinks = this.api.stripeAccountLinks;
    this.stripeCustomer = this.api.stripeCustomer;
    this.stripePersons = this.api.stripePersons;
    this.stripeSetupIntents = this.api.stripeSetupIntents;
    this.timeslots = this.api.timeslots;
    this.transactions = this.api.transactions;
    this.users = this.api.users;

    // Asset Endpoints
    this.assetByAlias = this.assetsApi.assetByAlias;
    this.assetsByAlias = this.assetsApi.assetsByAlias;
    this.assetByVersion = this.assetsApi.assetByVersion;
    this.assetsByVersion = this.assetsApi.assetsByVersion;
  }

  /**
   * Logs in a user using their credentials.
   *
   * @async
   * @param {LoginParameter} params - The login parameters.
   * @returns {Promise<AuthToken>} - The authentication token.
   */
  async login<T extends LoginParameterType>(
    params: LoginParameter<T>
  ): Promise<AxiosResponse<TokenResponse<"user">>> {
    return this.auth.token<"user">({
      client_id: this.sdkConfig.clientId,
      scope: "user",
      grant_type: "code" in params ? "authorization_code" : "password",
      ...params,
    });
  }

  /**
   * Logs in the marketplace operator as the marketplace user and returns a Promise
   *
   * @async
   * @param {LoginAsParameter} params - The login parameters.
   * @returns {Promise<AuthToken>} - The authentication token.
   */
  async loginAs(
    params: LoginParameter<"auth_code">
  ): Promise<AxiosResponse<TokenResponse<"user">>> {
    return this.auth.token<"user">({
      client_id: this.sdkConfig.clientId,
      grant_type: "authorization_code",
      scope: "user",
      ...params,
    });
  }

  /**
   * Logs in a user using an identity provider (IDP).
   *
   * @async
   * @param {LoginWithIdpParameter} params - The IDP login parameters.
   * @returns {Promise<AuthToken>} - The authentication token.
   */
  async loginWithIdp(
    params: LoginWithIdpParameter
  ): Promise<AxiosResponse<TokenResponse<"user">>> {
    if (this.sdkConfig.clientSecret === undefined) {
      throw new Error("clientSecret is required to login with idp");
    }
    return this.auth.authWithIdp({
      client_id: this.sdkConfig.clientId,
      client_secret: this.sdkConfig.clientSecret!,
      ...params,
    });
  }

  /**
   * Logs out the current user.
   *
   * @async
   * @returns {Promise<void>} - Resolves when the user is logged out.
   */
  async logout(): Promise<AxiosResponse<RevokeResponse>> {
    const { access_token } = (await this.sdkConfig.tokenStore!.getToken())!;
    return this.auth.revoke(access_token);
  }

  /**
   * Exchanges the current token for a trusted user token.
   *
   * @async
   * @returns {Promise<AuthToken>} - The exchanged token.
   */
  async exchangeToken(): Promise<AxiosResponse<TokenResponse<"trusted:user">>> {
    const { access_token } = (await this.sdkConfig.tokenStore!.getToken())!;
    if (this.sdkConfig.clientSecret === undefined) {
      throw new Error("clientSecret is required to exchange token");
    }
    return this.auth.token<"trusted:user">({
      client_id: this.sdkConfig.clientId,
      client_secret: this.sdkConfig.clientSecret!,
      grant_type: "token_exchange",
      scope: "trusted:user",
      subject_token: access_token,
    });
  }

  /**
   * Retrieves authentication info for the current user.
   *
   * @async
   * @returns {Promise<AuthInfoResponse>} - The authentication info.
   */
  async authInfo(): Promise<AuthInfoResponse> {
    const storedToken = await this.sdkConfig.tokenStore!.getToken();
    if (storedToken && storedToken.scope) {
      const tokenScope = storedToken.scope;
      const scopes = tokenScope.split(" ") as Scope[];
      const isAnonymous = tokenScope === "public-read";

      const grantType = isAnonymous ? "client_credentials" : "refresh_token";

      return { scopes, isAnonymous, grantType };
    }

    return {};
  }
}

export default SharetribeSdk;
