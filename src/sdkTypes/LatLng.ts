/**
 * @fileoverview Provides the LatLng class for representing geographical coordinates.
 * This class encapsulates a latitude and longitude pair, with validation for numeric input.
 */

/**
 * Class representing a geographical coordinate pair (latitude and longitude).
 */
class LatLng {
  lat: number | string;
  lng: number | string;
  value: string;

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
    // Helper function to validate if a value is a number or a number-like string.
    const isNumberOrNumberString = (val: any): boolean => {
      if (typeof val === 'number') return true;
      return typeof val === 'string' && /^\d+(\.\d+)?$/.test(val);
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
    this.value = `${this.lat},${this.lng}`;
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

export default LatLng;
