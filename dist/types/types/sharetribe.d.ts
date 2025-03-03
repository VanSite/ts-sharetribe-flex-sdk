import UUIDClass from '../sdkTypes/UUID';
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
import { Transaction } from "./marketplace/transaction";
/**
 * A mapping of relationship types to their corresponding entities.
 */
export type RelationshipTypeMap = {
    'author': User;
    'booking': Booking;
    'currentStock': Stock;
    'customer': User;
    'defaultPaymentMethod': StripePaymentMethod;
    'images': Image;
    'listing': Listing;
    'marketplace': Marketplace;
    'messages': Message;
    'ownListing': OwnListing;
    'profileImage': Image;
    'provider': User;
    'reviews': Review;
    'sender': User;
    'stockReservation': StockReservation;
    'stripeAccount': StripeAccount;
    'stripeCustomer': StripeCustomer;
    'subject': User;
    'transaction': Transaction;
};
/**
 * Represents an API error returned by the backend.
 */
export type ApiError = {
    data: {
        id: string;
        status: number;
        code: string;
        title: string;
        details?: string;
        source?: {
            path: string[];
            type: string;
        };
    };
};
/**
 * Represents a universally unique identifier (UUID).
 */
export type UUID = typeof UUIDClass;
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
    data: A extends true ? {
        id: UUID;
        type: T;
    }[] : {
        id: UUID;
        type: T;
    };
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
