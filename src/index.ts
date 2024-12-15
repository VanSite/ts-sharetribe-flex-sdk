import sharetribeSdk from './sdk';
import integrationSdk from './integrationSdk';
import BigDecimal from "./sdkTypes/BigDecimal";
import UUID from "./sdkTypes/UUID";
import LatLng from "./sdkTypes/LatLng";
import LatLngBounds from "./sdkTypes/LatLngBounds";
import Money from "./sdkTypes/Money";
import MemoryStore from "./utils/stores/memory-store";
import BrowserStore from "./utils/stores/browser-store";
import ExpressStore from "./utils/stores/express-store";
import {createTypeHandler, objectQueryString} from "./utils/util";

export const skdTypes = {
  BigDecimal,
  LatLng,
  LatLngBounds,
  Money,
  UUID,
}

export const TokenStore = {
  MemoryStore,
  BrowserStore,
  ExpressStore,
}

export const util = {
  objectQueryString,
  createTypeHandler
}

export const SharetribeSdk = sharetribeSdk;
export const IntegrationSdk = integrationSdk;

export default {
  SharetribeSdk: sharetribeSdk,
  IntegrationSdk: integrationSdk,
  TokenStore,
  skdTypes,
  util
};