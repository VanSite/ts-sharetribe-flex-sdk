import UUIDClass from "../sdkTypes/UUID";
import {User} from "./marketplace/user";
import {Booking} from "./marketplace/bookings";
import {Stock} from "./marketplace/stock";
import {StripePaymentMethod} from "./marketplace/stripePaymentMethod";
import {Image} from "./marketplace/images";
import {Listing} from "./marketplace/listings";
import {Marketplace} from "./marketplace/marketplace";
import {Message} from "./marketplace/messages";
import {OwnListing} from "./marketplace/ownListings";
import {Review} from "./marketplace/reviews";
import {StockReservation} from "./marketplace/stockReservations";
import {StripeAccount} from "./marketplace/stripeAccount";
import {StripeCustomer} from "./marketplace/stripeCustomer";
import {Transaction} from "./marketplace/transactions";
import {CurrentUserPermissionSet} from "./marketplace/currentUser";
import {StockAdjustment} from "./marketplace/stockAdjustment";
import {ImageAsset} from "./assets";

/**
 * A mapping of relationship types to their corresponding entities.
 * The `I` flag controls whether private/protected user data is included.
 */
export type RelationshipTypeMap<I extends boolean = false> = {
  "author.effectivePermissionSet": CurrentUserPermissionSet;
  "author.marketplace": Marketplace;
  "author.profileImage": Image;
  "author.stripeAccount": StripeAccount;
  "booking.transaction": Transaction;
  "customer.effectivePermissionSet": CurrentUserPermissionSet;
  "customer.marketplace": Marketplace;
  "customer.profileImage": Image;
  "customer.stripeAccount": StripeAccount;
  "effectivePermissionSet": CurrentUserPermissionSet;
  "listing.author": User<I>;
  "listing.currentStock": Stock;
  "listing.images": Image;
  "listing.marketplace": Marketplace;
  "messages.sender": User<I>;
  "messages.transaction": Transaction;
  "ownListing.author": User<I>;
  "ownListing.currentStock": Stock;
  "ownListing.images": Image;
  "ownListing.marketplace": Marketplace;
  "provider.effectivePermissionSet": CurrentUserPermissionSet;
  "provider.marketplace": Marketplace;
  "provider.profileImage": Image;
  "provider.stripeAccount": StripeAccount;
  "reviews.author": User<I>;
  "reviews.author.profileImage": Image;
  "reviews.listing": Listing<I>;
  "reviews.subject": User<I>;
  "sender.effectivePermissionSet": CurrentUserPermissionSet;
  "sender.marketplace": Marketplace;
  "sender.profileImage": Image;
  "sender.stripeAccount": StripeAccount;
  "stockReservation.transaction": Transaction;
  "stripeCustomer.defaultPaymentMethod": StripePaymentMethod;
  "subject.effectivePermissionSet": CurrentUserPermissionSet;
  "subject.marketplace": Marketplace;
  "subject.profileImage": Image;
  "subject.stripeAccount": StripeAccount;
  "transaction.booking": Booking;
  "transaction.customer": User<I>;
  "transaction.listing": Listing<I>;
  "transaction.marketplace": Marketplace;
  "transaction.messages": Message;
  "transaction.provider": User<I>;
  "transaction.reviews": Review;
  "transaction.stockReservation": StockReservation;
  author: User<I>;
  booking: Booking;
  currentStock: Stock;
  customer: User<I>;
  defaultPaymentMethod: StripePaymentMethod;
  imageAsset: ImageAsset;
  images: Image;
  listing: Listing<I>;
  marketplace: Marketplace;
  messages: Message;
  ownListing: OwnListing;
  profileImage: Image;
  provider: User<I>;
  reviews: Review;
  sender: User<I>;
  stockAdjustment: StockAdjustment;
  stockReservation: StockReservation;
  stripeAccount: StripeAccount;
  stripeCustomer: StripeCustomer;
  subject: User<I>;
  transaction: Transaction;
};

/**
 * HTTP status codes that can return API errors
 */
export const ApiErrorStatuses = {
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  Conflict: 409,
  PayloadTooLarge: 413,
  TooManyRequests: 429,
  ServerError: 500,
} as const;

export type ApiErrorStatus = typeof ApiErrorStatuses[keyof typeof ApiErrorStatuses];

/**
 * Strongly typed error codes per status
 */
export type ApiErrorCode =
// 400
  | "unsupported-content-type"
  | "bad-request"
  | "validation-disallowed-key"
  | "validation-invalid-value"
  | "validation-invalid-params"
  | "validation-missing-key"

  // 401
  | "auth-invalid-access-token"
  | "auth-missing-access-token"

  // 402
  | "transaction-payment-failed"

  // 403
  | "forbidden"

  // 404
  | "not-found"

  // 409 - grouped for readability
  | "conflict"
  | "image-invalid"
  | "image-invalid-content"
  | "email-taken"
  | "email-already-verified"
  | "email-unverified"
  | "email-not-found"
  | "listing-not-found"
  | "listing-invalid-state"
  | "stripe-account-not-found"
  | "stripe-missing-api-key"
  | "stripe-invalid-payment-intent-status"
  | "stripe-customer-not-found"
  | "stripe-multiple-payment-methods-not-supported"
  | "stripe-payment-method-type-not-supported"
  | "user-missing-stripe-account"
  | "user-is-banned"
  | "user-not-found"
  | "transaction-locked"
  | "transaction-not-found"
  | "transaction-listing-not-found"
  | "transaction-booking-state-not-pending"
  | "transaction-booking-state-not-accepted"
  | "transaction-invalid-transition"
  | "transaction-invalid-action-sequence"
  | "transaction-missing-listing-price"
  | "transaction-missing-stripe-account"
  | "transaction-same-author-and-customer"
  | "transaction-stripe-account-disabled-charges"
  | "transaction-stripe-account-disabled-payouts"
  | "transaction-charge-zero-payin"
  | "transaction-charge-zero-payout"
  | "transaction-zero-payin"
  | "transaction-unknown-alias"
  | "transaction-provider-banned-or-deleted"
  | "transaction-customer-banned-or-deleted"

  // 413
  | "request-larger-than-content-length"
  | "request-upload-over-limit"

  // 429
  | "too-many-requests";

/**
 * Single API error object
 */
export interface ApiError {
  id: string;
  status: ApiErrorStatus;
  code: ApiErrorCode;
  title: string;
  detail?: string;
  source?: {
    pointer?: string; // JSON pointer like "/data/attributes/bio"
    parameter?: string; // query param name
  };
  meta?: Record<string, unknown>;
}

/**
 * Full error response from Sharetribe API
 */
export interface ApiErrorResponse {
  errors: ApiError[];
}

/**
 *
 */
export interface SharetribeApiError {
  name: string;
  message: string;
  status?: number;
  statusText?: string,
  data: any
}

/**
 * UUID wrapper instance
 */
export type UUID = InstanceType<typeof UUIDClass>;

/**
 * Pagination metadata
 */
export interface ApiMeta {
  totalItems: number;
  totalPages: number;
  page: number;
  perPage: number;
  paginationLimit?: number;
}

/**
 * Relationship object in API responses
 */
export type Relationship<
  IsArray extends boolean = false,
  Type extends keyof RelationshipTypeMap = keyof RelationshipTypeMap
> = IsArray extends true
  ? { data: { id: UUID; type: Type }[] }
  : { data: { id: UUID; type: Type } | null };

/**
 * Query parameter prefixes
 */
export type QueryFields = `fields.${string}`;
export type QueryLimit = `limit.${string}`;
export type QueryImageVariant = `imageVariant.${string}`;

/**
 * Public, metadata, private, protected data query keys
 */
export type QueryPub = `pub_${string}`;
export type QueryMeta = `meta_${string}`;
export type QueryPriv = `priv_${string}`;
export type QueryProt = `prot_${string}`;

/**
 * Optional expand control
 */
export interface ExpandParam {
  expand?: boolean;
}

export type ExtraParameter = ExpandParam | undefined;
export type ExtraParameterType = ExtraParameter;

/**
 * Base API parameter interface (index signatures are now safe)
 */
export interface ApiParameter {
  /** Select fields: fields.listings=title,description */
  [K: QueryFields]: string | undefined;

  /** Pagination limits per resource type */
  [K: QueryLimit]: number | undefined;

  /** Image variants */
  [K: QueryImageVariant]: string | undefined;

  /** Public custom fields */
  [K: QueryPub]: string | undefined;

  /** Metadata fields */
  [K: QueryMeta]: string | undefined;

  /** Private fields (admin only) */
  [K: QueryPriv]: string | undefined;

  /** Protected fields (trusted user) */
  [K: QueryProt]: string | undefined;
}

/**
 * Geographic types
 */
export interface LatLng {
  lat: number;
  lng: number;
}

export interface LatLngBounds {
  ne: LatLng;
  sw: LatLng;
}

/**
 * Money amount with currency
 */
export interface Money {
  amount: number; // in minor units (e.g. cents)
  currency: string; // ISO 4217 code
}