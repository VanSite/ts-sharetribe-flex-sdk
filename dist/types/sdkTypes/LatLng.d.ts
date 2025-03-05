/**
 * @fileoverview Provides the LatLng class for representing geographical coordinates.
 * This class encapsulates a latitude and longitude pair, with validation for numeric input.
 */
import { SdkType } from "../types/sdk-types";
declare const LATLNG_SDK_TYPE = "LatLng";
/**
 * Class representing a geographical coordinate pair (latitude and longitude).
 */
declare class LatLng implements SdkType {
    lat: number | string;
    lng: number | string;
    readonly _sdkType: typeof LATLNG_SDK_TYPE;
    /**
     * Creates an instance of the LatLng class.
     *
     * @param {string | number} lat - The latitude value. Must be a number or a string that represents a number.
     * @param {string | number} lng - The longitude value. Must be a number or a string that represents a number.
     * @example
     * const coordinates = new LatLng(37.7749, -122.4194);
     * console.log(coordinates.toString()); // Outputs: '37.7749,-122.4194'
     */
    constructor(lat: string | number, lng: string | number);
    /**
     * Converts the LatLng instance to a string representation.
     *
     * @returns {string} - A string in the format "latitude,longitude".
     * @example
     * const coordinates = new LatLng(37.7749, -122.4194);
     * console.log(coordinates.toString()); // Outputs: '37.7749,-122.4194'
     */
    toString(): string;
}
export default LatLng;
//# sourceMappingURL=LatLng.d.ts.map