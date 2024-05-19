import { defaultSdkConfig, sdkConfig, SdkConfig } from '../types/config';
import { createApisConfigs } from '../utils/apis';
import { ApiConfigs } from '../types/apiConfigs';
import axios, { AxiosInstance } from 'axios';
import AuthenticationApi from './authentication';
import MarketplaceApi from './marketplace';
import prepareAxiosInstance from '../utils/prepare-axios-instance';
import Listings from './marketplace/listings';
import AvailabilityExceptions from './marketplace/availabilityExceptions';
import Bookings from './marketplace/bookings';
import CurrentUser from './marketplace/currentUser';
import Images from './marketplace/images';
import Marketplace from './marketplace/marketplace';
import Messages from './marketplace/messages';
import OwnListings from './marketplace/ownListings';
import PasswordReset from './marketplace/passwordReset';
import ProcessTransitions from './marketplace/processTransitions';
import Reviews from './marketplace/reviews';
import Stock from './marketplace/stock';
import StockAdjustments from './marketplace/stockAdjustments';
import StripeAccount from './marketplace/stripeAccount';
import StripeAccountLinks from './marketplace/stripeAccountLinks';
import StripeCustomer from './marketplace/stripeCustomer';
import StripePersons from './marketplace/stripePersons';
import StripeSetupIntents from './marketplace/stripeSetupIntents';
import TimeSlots from './marketplace/timeSlots';
import Transactions from './marketplace/transactions';
import Users from './marketplace/users';
import { AuthInfoResponse, LoginParameter, LoginWithIdpParameter, Scope } from '../types/authentication';
import AssetsApi from './assets';

export const QUERY_PARAMETERS = [
  'include',
  'page',
  'perPage',
  'expand',
  'fields',
  'limit',
]


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
  review: Reviews;
  stock: Stock;
  stockAdjustments: StockAdjustments;
  stripeAccount: StripeAccount;
  stripeAccountLinks: StripeAccountLinks;
  stripeCustomer: StripeCustomer;
  stripePersons: StripePersons;
  stripeSetupIntents: StripeSetupIntents;
  timeSlots: TimeSlots;
  transactions: Transactions;
  users: Users;

  // Asset Endpoints
  assetByAlias: AssetsApi['assetByAlias'];
  assetsByAlias: AssetsApi['assetsByAlias'];
  assetByVersion: AssetsApi['assetByVersion'];
  assetsByVersion: AssetsApi['assetsByVersion'];


  constructor(config: SdkConfig) {
    sdkConfig.parse(config);
    this.sdkConfig = {
      ...defaultSdkConfig.parse({}),
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
    this.review = this.api.review
    this.stock = this.api.stock
    this.stockAdjustments = this.api.stockAdjustments
    this.stripeAccount = this.api.stripeAccount
    this.stripeAccountLinks = this.api.stripeAccountLinks
    this.stripeCustomer = this.api.stripeCustomer
    this.stripePersons = this.api.stripePersons
    this.stripeSetupIntents = this.api.stripeSetupIntents
    this.timeSlots = this.api.timeSlots
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

  async logout() {
    const {access_token} = (await this.sdkConfig.tokenStore!.getToken())!
    return this.auth.revoke(access_token);
  }

  async exchangeToken() {
    const {access_token} = (await this.sdkConfig.tokenStore!.getToken())!
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

    const isAnonymous = !storedToken?.refresh_token;
    const grantType = isAnonymous ? 'client_credentials' : 'refresh_token';
    return {isAnonymous, grantType}
  }

  async loginWithIdp(params: LoginWithIdpParameter) {
    return this.auth.authWithIdp({
      client_id: this.sdkConfig.clientId,
      client_secret: this.sdkConfig.clientSecret!,
      ...params,
    })
  }
}

export default SharetribeSdk;