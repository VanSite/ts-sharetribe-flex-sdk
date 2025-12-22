/**
 * @fileoverview Provides the LatLng class for representing geographical coordinates.
 * This class encapsulates a latitude and longitude pair, with validation for numeric input.
 */

import {SdkType} from "../types";

// Define a static class name
const LATLNG_SDK_TYPE = "LatLng";

/**
 * Class representing a geographical coordinate pair (latitude and longitude).
 */
class LatLng implements SdkType {
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
  constructor(lat: string | number, lng: string | number) {
    this._sdkType = LATLNG_SDK_TYPE;

    // Helper function to validate if a value is a number or a number-like string.
    const isNumberOrNumberString = (val: any): boolean => {
      if (typeof val === "number") return true;
      return typeof val === "string" && /^\d+(\.\d+)?$/.test(val);
    };

    // Validate latitude.
    if (!isNumberOrNumberString(lat)) {
      console.warn(
        "Latitude must be a number or a string that represents a number"
      );
    }

    // Validate longitude.
    if (!isNumberOrNumberString(lng)) {
      console.warn(
        "Longitude must be a number or a string that represents a number"
      );
    }

    // Assign values to instance properties.
    this.lat = lat;
    this.lng = lng;
  }

  /**
   * Converts the LatLng instance to a string representation.
   *
   * @returns {string} - A string in the format "latitude,longitude".
   * @example
   * const coordinates = new LatLng(37.7749, -122.4194);
   * console.log(coordinates.toString()); // Outputs: '37.7749,-122.4194'
   */
  toString(): string {
    return `${this.lat},${this.lng}`;
  }
}

// Default export for backward compatibility
export default LatLng;
