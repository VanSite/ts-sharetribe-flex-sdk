import { SdkConfig } from './types/config';
import { createApisConfigs } from './utils/apis';
import { ApiConfigs } from './types/apiConfigs';
import axios, { AxiosInstance } from 'axios';
import AuthenticationApi from "./endpoints/auth";
import MarketplaceApi from './endpoints/marketplace';
import prepareAxiosInstance from './utils/prepare-axios-instance';
import Listings from './endpoints/marketplace/Listings';
import AvailabilityExceptions from './endpoints/marketplace/AvailabilityExceptions';
import Bookings from './endpoints/marketplace/Bookings';
import CurrentUser from './endpoints/marketplace/CurrentUser';
import Images from './endpoints/marketplace/Images';
import Marketplace from './endpoints/marketplace/Marketplace';
import Messages from './endpoints/marketplace/Messages';
import OwnListings from './endpoints/marketplace/OwnListings';
import PasswordReset from './endpoints/marketplace/PasswordReset';
import ProcessTransitions from './endpoints/marketplace/ProcessTransitions';
import Reviews from './endpoints/marketplace/Reviews';
import Stock from './endpoints/marketplace/Stock';
import StockAdjustments from './endpoints/marketplace/StockAdjustments';
import StripeAccount from './endpoints/marketplace/StripeAccount';
import StripeAccountLinks from './endpoints/marketplace/StripeAccountLinks';
import StripeCustomer from './endpoints/marketplace/StripeCustomer';
import StripePersons from './endpoints/marketplace/StripePersons';
import StripeSetupIntents from './endpoints/marketplace/StripeSetupIntents';
import TimeSlots from './endpoints/marketplace/TimeSlots';
import Transactions from './endpoints/marketplace/Transactions';
import Users from './endpoints/marketplace/Users';
import { AuthInfoResponse, LoginParameter, LoginWithIdpParameter, Scope } from './types/authentication';
import AssetsApi from './endpoints/assets';
import {DefaultSdkConfig} from "./utils/config";

class SharetribeSdk {
  sdkConfig: SdkConfig;
  apisConfigs: ApiConfigs;
  axios: AxiosInstance;

  // Endpoints
  auth: AuthenticationApi;
  api: MarketplaceApi;
  assetsApi: AssetsApi;

  // Api Endpoints
  listings: Listings;
  availabilityExceptions: AvailabilityExceptions;
  bookings: Bookings;
  currentUser: CurrentUser;
  images: Images;
  marketplace: Marketplace;
  messages: Messages;
  ownListings: OwnListings;
  passwordReset: PasswordReset;
  processTransitions: ProcessTransitions;
  reviews: Reviews;
  stock: Stock;
  stockAdjustments: StockAdjustments;
  stripeAccount: StripeAccount;
  stripeAccountLinks: StripeAccountLinks;
  stripeCustomer: StripeCustomer;
  stripePersons: StripePersons;
  stripeSetupIntents: StripeSetupIntents;
  timeslots: TimeSlots;
  transactions: Transactions;
  users: Users;

  // Asset Endpoints
  assetByAlias: AssetsApi['assetByAlias'];
  assetsByAlias: AssetsApi['assetsByAlias'];
  assetByVersion: AssetsApi['assetByVersion'];
  assetsByVersion: AssetsApi['assetsByVersion'];


  constructor(config: SdkConfig) {
    this.sdkConfig = {
      ...DefaultSdkConfig,
      ...config
    };
    this.apisConfigs = createApisConfigs();
    this.axios = axios.create({
      baseURL: `${this.sdkConfig.baseUrl}/${this.sdkConfig.version}/`,
    });
    prepareAxiosInstance(this);

    this.auth = new AuthenticationApi(this)
    this.api = new MarketplaceApi(this)
    this.assetsApi = new AssetsApi(this)

    // Api Endpoints
    this.availabilityExceptions = this.api.availabilityExceptions
    this.bookings = this.api.bookings
    this.currentUser = this.api.currentUser
    this.images = this.api.images
    this.listings = this.api.listings
    this.marketplace = this.api.marketplace
    this.messages = this.api.messages
    this.ownListings = this.api.ownListings
    this.passwordReset = this.api.passwordReset
    this.processTransitions = this.api.processTransitions
    this.reviews = this.api.reviews
    this.stock = this.api.stock
    this.stockAdjustments = this.api.stockAdjustments
    this.stripeAccount = this.api.stripeAccount
    this.stripeAccountLinks = this.api.stripeAccountLinks
    this.stripeCustomer = this.api.stripeCustomer
    this.stripePersons = this.api.stripePersons
    this.stripeSetupIntents = this.api.stripeSetupIntents
    this.timeslots = this.api.timeslots
    this.transactions = this.api.transactions
    this.users = this.api.users

    // Asset Endpoints
    this.assetByAlias = this.assetsApi.assetByAlias
    this.assetsByAlias = this.assetsApi.assetsByAlias
    this.assetByVersion = this.assetsApi.assetByVersion
    this.assetsByVersion = this.assetsApi.assetsByVersion
  };


  async login(params: LoginParameter) {
    return this.auth.token<'user'>({
      client_id: this.sdkConfig.clientId,
      grant_type: 'password',
      scope: 'user',
      ...params,
    });
  }

  async loginWithIdp(params: LoginWithIdpParameter) {
    if (this.sdkConfig.clientSecret === undefined) {
      throw new Error('clientSecret is required to login with idp');
    }
    return this.auth.authWithIdp({
      client_id: this.sdkConfig.clientId,
      client_secret: this.sdkConfig.clientSecret!,
      ...params,
    })
  }

  async logout() {
    const {access_token} = (await this.sdkConfig.tokenStore!.getToken())!
    return this.auth.revoke(access_token);
  }

  async exchangeToken() {
    const {access_token} = (await this.sdkConfig.tokenStore!.getToken())!
    if (this.sdkConfig.clientSecret === undefined) {
      throw new Error('clientSecret is required to exchange token');
    }
    return this.auth.token<'trusted:user'>({
      client_id: this.sdkConfig.clientId,
      client_secret: this.sdkConfig.clientSecret!,
      grant_type: 'token_exchange',
      scope: 'trusted:user',
      subject_token: access_token,
    })
  }

  async authInfo(): Promise<AuthInfoResponse> {
    const storedToken = await this.sdkConfig.tokenStore!.getToken()
    if (storedToken && storedToken.scope) {
      const tokenScope = storedToken.scope;
      const scopes = tokenScope.split(' ') as Scope[];
      const isAnonymous = tokenScope === 'public-read';

      const grantType = isAnonymous ? 'client_credentials' : 'refresh_token';

      return {scopes, isAnonymous, grantType};
    }

    return {}
  }
}

export default SharetribeSdk;