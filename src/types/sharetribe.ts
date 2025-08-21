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

/**
 * A mapping of relationship types to their corresponding entities.
 */
export type RelationshipTypeMap<I extends boolean = false> = {
  author: User<I>;
  "author.marketplace": Marketplace;
  "author.profileImage": Image;
  "author.stripeAccount": StripeAccount;
  "author.effectivePermissionSet": CurrentUserPermissionSet;
  booking: Booking;
  "booking.transaction": Transaction;
  currentStock: Stock;
  customer: User<I>;
  "customer.marketplace": Marketplace;
  "customer.profileImage": Image;
  "customer.stripeAccount": StripeAccount;
  "customer.effectivePermissionSet": CurrentUserPermissionSet;
  defaultPaymentMethod: StripePaymentMethod;
  images: Image;
  listing: Listing<I>;
  "listing.marketplace": Marketplace;
  "listing.author": User<I>;
  "listing.images": Image;
  "listing.currentStock": Stock;
  marketplace: Marketplace;
  messages: Message;
  "messages.sender": User<I>;
  "messages.transaction": Transaction;
  ownListing: OwnListing;
  "ownListing.marketplace": Marketplace;
  "ownListing.author": User<I>;
  "ownListing.images": Image;
  "ownListing.currentStock": Stock;
  profileImage: Image;
  provider: User<I>;
  "provider.marketplace": Marketplace;
  "provider.profileImage": Image;
  "provider.stripeAccount": StripeAccount;
  "provider.effectivePermissionSet": CurrentUserPermissionSet;
  reviews: Review;
  "reviews.author": User<I>;
  "reviews.listing": Listing<I>;
  "reviews.subject": User<I>;
  "reviews.author.profileImage": Image;
  sender: User<I>;
  "sender.marketplace": Marketplace;
  "sender.profileImage": Image;
  "sender.stripeAccount": StripeAccount;
  "sender.effectivePermissionSet": CurrentUserPermissionSet;
  stockReservation: StockReservation;
  "stockReservation.transaction": Transaction;
  stripeAccount: StripeAccount;
  stripeCustomer: StripeCustomer;
  "stripeCustomer.defaultPaymentMethod": StripePaymentMethod;
  subject: User<I>;
  "subject.marketplace": Marketplace;
  "subject.profileImage": Image;
  "subject.stripeAccount": StripeAccount;
  "subject.effectivePermissionSet": CurrentUserPermissionSet;
  transaction: Transaction;
  "transaction.marketplace": Marketplace;
  "transaction.listing": Listing<I>;
  "transaction.provider": User<I>;
  "transaction.customer": User<I>;
  "transaction.booking": Booking;
  "transaction.stockReservation": StockReservation;
};

export type ApiErrorStatuses =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 409
  | 413
  | 429
  | 500;

export type ApiErrorCodes<S extends ApiErrorStatuses> = S extends 400
  ?
  | "unsupported-content-type"
  | "bad-request"
  | "validation-disallowed-key"
  | "validation-invalid-value"
  | "validation-invalid-params"
  | "validation-missing-key"
  : S extends 401
    ? "auth-invalid-access-token" | "auth-missing-access-token"
    : S extends 402
      ? "transaction-payment-failed"
      : S extends 403
        ? "forbidden"
        : S extends 404
          ? "not-found"
          : S extends 409
            ?
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
            | "transaction-locked	"
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
            : S extends 413
              ? "request-larger-than-content-length" | "request-upload-over-limit"
              : S extends 429
                ? "too-many-requests"
                : never;

/**
 * Represents an API error returned by the backend.
 */
export type ApiError<S extends ApiErrorStatuses = ApiErrorStatuses> = {
  id: string; // Unique ID for each instance of an error
  status: S; // HTTP status code
  code: ApiErrorCodes<S>; // Specific error code
  title: string; // Human-readable error title
  details?: string; // Optional explanation for debugging
  source?: {
    path: string[]; // Path to the parameter causing the error
    type: "body" | "query"; // Indicates body or query parameter
  };
};

/**
 * Represents an API error response.
 */
export type ApiErrorResponse = {
  name: string;
  message: string;
  status: number | undefined;
  statusText: string | undefined;
  data: {
    errors: ApiError[];
  }
};

/**
 * Represents a universally unique identifier (UUID).
 */
export type UUID = InstanceType<typeof UUIDClass>;

/**
 * Metadata for paginated API responses.
 */
export type ApiMeta = {
  totalItems: number;
  totalPages: number;
  page: number;
  paginationLimit: number;
  perPage: number;
};

/**
 * Represents a relationship to another entity in the API.
 */
export type Relationship<A extends boolean, T extends string> = {
  data: A extends true ? { id: UUID; type: T }[] : { id: UUID; type: T };
};

/**
 * Types for query fields, limits, and image variants.
 */
export type QueryFields = `fields.${string}`;
export type QueryLimit = `limit.${string}`;
export type ImageVariant = `imageVariant.${string}`;

/**
 * Extra parameter to expand or contract API responses.
 */
export interface ExtraParameter {
  expand?: boolean;
}

/**
 * Generic parameters used in API requests.
 */
export interface ApiParameter {
  [keyof: QueryFields]: string[] | never;

  [keyof: QueryLimit]: number | never;

  [keyof: ImageVariant]: string | never;
}

/**
 * Represents a latitude/longitude coordinate.
 */
export type LatLng = {
  lat: number;
  lng: number;
};

/**
 * Represents a latitude/longitude bounding box.
 */
export type LatLngBounds = {
  ne: LatLng;
  sw: LatLng;
};

/**
 * Query types for public, metadata, private, and protected data.
 */
export type QueryPub = `pub_${string}`;
export type QueryMeta = `meta_${string}`;
export type QueryPriv = `priv_${string}`;
export type QueryProt = `prot_${string}`;

/**
 * Additional parameters for API requests.
 */
export type ExtraParameterType = ExtraParameter | undefined;

/**
 * Represents a monetary value.
 */
export type Money = {
  amount: number;
  currency: string;
};
