import Money from '../sdkTypes/Money';
import LatLng from '../sdkTypes/LatLng';
import LatLngBounds from '../sdkTypes/LatLngBounds';
import UUID from '../sdkTypes/UUID';
import SharetribeSdk from '../sdk';
import IntegrationSdk from "../integrationSdk";
import BigDecimal from "../sdkTypes/BigDecimal";
/**
 * Converts a plain object with `amount` and `currency` to a `Money` instance.
 *
 * @param {Object} value - The value object containing amount and currency.
 * @param {number} value.amount - The monetary amount.
 * @param {string} value.currency - The currency code.
 * @returns {Money} A `Money` instance.
 */
export declare function convertToMoney(value: {
    amount: number;
    currency: string;
}): Money;
/**
 * Converts a plain object with `lat` and `lng` to a `LatLng` instance.
 *
 * @param {Object} value - The value object containing latitude and longitude.
 * @param {number} value.lat - Latitude value.
 * @param {number} value.lng - Longitude value.
 * @returns {LatLng} A `LatLng` instance.
 */
export declare function convertToLatLng(value: {
    lat: number;
    lng: number;
}): LatLng;
/**
 * Converts northeast and southwest coordinate objects to a `LatLngBounds` instance.
 *
 * @param {Object} ne - The northeast coordinates.
 * @param {number} ne.lat - Latitude value.
 * @param {number} ne.lng - Longitude value.
 * @param {Object} sw - The southwest coordinates.
 * @param {number} sw.lat - Latitude value.
 * @param {number} sw.lng - Longitude value.
 * @returns {LatLngBounds} A `LatLngBounds` instance.
 */
export declare function convertToLatLngBounds(ne: {
    lat: number;
    lng: number;
}, sw: {
    lat: number;
    lng: number;
}): LatLngBounds;
/**
 * Converts a string or Date object to a `Date` instance.
 *
 * @param {string|Date} value - The input value to convert.
 * @returns {Date} A `Date` instance.
 */
export declare function convertToDate(value: string | Date): Date;
/**
 * Converts a value based on its key to the appropriate SDK type.
 *
 * @param {string} key - The key indicating the value's type.
 * @param {*} value - The value to convert.
 * @returns {*} The converted value or the original value if no conversion is needed.
 * @throws Will throw an error if the `id` key has an invalid value.
 */
export declare function convertTypes(key: string, value: any): any;
/**
 * Converts a value based on its `_sdkType` property to the appropriate SDK type.
 * @param {*} value - The value to convert.
 * @returns {*} The converted value or the original value if no conversion is needed.
 */
export declare function toSdkTypes(value: any): LatLng | LatLngBounds | UUID | Money | BigDecimal | any;
/**
 * Recursively converts all values in an object from SDK types to plain objects.
 *
 * @param {Object} value - The object to process.
 */
export declare function recursiveConvertToSdkTypes(value: {
    [key: string]: any;
}): void;
/**
 * Recursively converts all values in an object from SDK types to plain objects.
 *
 * @param {Object} value - The object to process.
 */
export declare function convertFromSdkTypes(value: any): any;
/**
 * Recursively converts all values in an object from SDK types to plain objects.
 *
 * @param {Object} value - The object to process.
 */
export declare function recursiveConvertFromSdkTypes(value: {
    [key: string]: any;
}): void;
/**
 * Recursively applies a handler function to all values in an object.
 *
 * @param {Object} value - The object to process.
 * @param {Function} handler - The handler function to apply.
 */
export declare function recursiveApplyHandler(value: {
    [key: string]: any;
}, handler: any): void;
/**
 * Converts raw data into SDK-compatible types, applying type handlers if configured.
 *
 * @param {Object} data - The raw data to convert.
 * @param {SharetribeSdk|IntegrationSdk} sdk - The SDK instance to use.
 */
export declare function dataToType(data: any, sdk: SharetribeSdk | IntegrationSdk): void;
/**
 * Converts SDK-compatible types into plain data, applying type handlers if configured.
 *
 * @param {Object} data - The SDK-compatible data to convert.
 * @param {SharetribeSdk|IntegrationSdk} sdk - The SDK instance to use.
 */
export declare function typeToData(data: any, sdk: SharetribeSdk | IntegrationSdk): void;
