import UUIDClass from "../sdkTypes/UUID";
import { User } from "./marketplace/user";
import { Booking } from "./marketplace/bookings";
import { Stock } from "./marketplace/stock";
import { StripePaymentMethod } from "./marketplace/stripePaymentMethod";
import { Image } from "./marketplace/images";
import { Listing } from "./marketplace/listings";
import Marketplace from "../endpoints/marketplace";
import { Message } from "./marketplace/messages";
import { OwnListing } from "./marketplace/ownListings";
import { Review } from "./marketplace/reviews";
import { StockReservation } from "./marketplace/stockReservations";
import { StripeAccount } from "./marketplace/stripeAccount";
import { StripeCustomer } from "./marketplace/stripeCustomer";
import { Transaction } from "./marketplace/transactions";
import { CurrentUserPermissionSet } from "./marketplace/currentUser";

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

/**
 * Represents an API error returned by the backend.
 */
export type ApiError = {
  data: {
    id: string; // Unique ID for each instance of an error
    status: number; // HTTP status code
    code: string; // Specific error code
    title: string; // Human-readable error title
    details?: string; // Optional explanation for debugging
    source?: {
      path: string[]; // Path to the parameter causing the error
      type: string; // Indicates body or query parameter
    };
  };
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
 * Represents a generic API response, optionally containing errors and metadata.
 */
export interface ApiResponse {
  errors?: ApiError[];
  meta?: ApiMeta;
}

/**
 * Represents a latitude/longitude coordinate.
 */
export type LatLng = {
  lat: number;
  lng: number;
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
