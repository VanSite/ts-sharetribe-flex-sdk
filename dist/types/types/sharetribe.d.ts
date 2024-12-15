import { OwnListing } from './marketplace/ownListings';
import { User } from './marketplace/user';
import { Marketplace } from './marketplace/marketplace';
import { Listing } from './marketplace/listings';
import { Booking } from './marketplace/bookings';
import { StockReservation } from './marketplace/stockReservations';
import { Review } from './marketplace/reviews';
import { Message } from './marketplace/messages';
import { Image } from './marketplace/images';
import { StripeAccount } from './marketplace/stripeAccount';
import { StripeCustomer } from './marketplace/stripeCustomer';
import { Stock } from './marketplace/stock';
import { StripePaymentMethod } from './marketplace/stripePaymentMethod';
import { Transaction } from './marketplace/transaction';
import { z } from 'zod';
import { UUIDSchema } from '../sdkTypes/UUID';
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
 * 400  Bad request. Typically used to indicate that the request contained invalid query or body parameter or syntax.
 *
 * 401  Unauthorized. The API request was made with invalid or expired access token. The client must obtain a valid and fresh access token via the Authentication API.
 *
 * 402  Payment failed. Used to indicate error during payment processing. See Transactions.
 *
 * 403  Forbidden. The authenticated or anonymous user does not have access to the requested resource or API endpoint.
 *
 * 404  Not found. Returned by query endpoints when the requested resource is not found. Note that queries that return multiple resources DO NOT return a 404 error when no resource matches the query parameters. Instead, they return response with empty data array. See Response format.
 *
 * 409  Conflict. The command can not be completed. This is commonly caused by a missing resource, which is required by the command, a resource in an unexpected state, logic error in the request, etc.
 *
 * 500  Internal server error. The API failed to process the request due to unexpected error.
 *
 * @property {string} id - (uuid) The error ID. This is unique ID for each instance of an error
 * @property {string} status - HTTP status code for the error.
 * @property {string} code - Error code. Clients can use the error code to determine what the error was. See the list of error codes.
 * @property {string} title - Human readable error title. The title is always the same for a given error code.
 * @property {string} details - (string, optional) Human readable explanation of the error. This is an optional attribute and, when present, is intended to be used to aid API client development and debugging. API clients should not reply on the presence or the contents of this attribute.
 * @property {string} source - Indicates the request parameter (in query string or body) that caused the error, when possible.
 * @property {string} source.path - Array of strings, representing the (nested) path to a key in the request body or the name of the query parameter that the error is attributed to.
 * @property {string} source.type - Indicates whether the path represents a body or query parameter.
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
export type UUID = z.infer<typeof UUIDSchema>;
export type ApiMeta = {
    totalItems: number;
    totalPages: number;
    page: number;
    paginationLimit: number;
    perPage: number;
};
export type Relationship<A extends boolean, T extends string> = {
    data: A extends true ? {
        id: UUID;
        type: T;
    }[] : {
        id: UUID;
        type: T;
    };
};
export type QueryFields = `fields.${string}`;
export type QueryLimit = `limit.${string}`;
export type ImageVariant = `imageVariant.${string}`;
export interface ExtraParameter {
    expand?: boolean;
}
export interface ApiParameter {
    [keyof: QueryFields]: string[] | never;
    [keyof: QueryLimit]: number | never;
    [keyof: ImageVariant]: string | never;
}
export interface ApiResponse {
    errors?: ApiError[];
    meta?: ApiMeta;
}
export type LatLng = {
    lat: number;
    lng: number;
};
export type QueryPub = `pub_${string}`;
export type QueryMeta = `meta_${string}`;
export type Money = {
    amount: number;
    currency: string;
};
