/**
 * @fileoverview Provides the LatLngBounds class for representing geographical bounding boxes.
 * This class encapsulates a northeast (NE) and southwest (SW) pair of coordinates to define a rectangular area.
 */

import LatLng from './LatLng';

/**
 * Class representing a geographical bounding box with NE and SW coordinates.
 */
class LatLngBounds {
  ne: LatLng | { lat: number | string; lng: number | string };
  sw: LatLng | { lat: number | string; lng: number | string };
  value: string;

  /**
   * Creates an instance of the LatLngBounds class.
   *
   * @param {LatLng | { lat: number; lng: number }} ne - The northeast coordinate.
   * @param {LatLng | { lat: number; lng: number }} sw - The southwest coordinate.
   * @example
   * const ne = new LatLng(40.7128, -74.0060);
   * const sw = new LatLng(34.0522, -118.2437);
   * const bounds = new LatLngBounds(ne, sw);
   * console.log(bounds.toString()); // Outputs: '40.7128,-74.0060,34.0522,-118.2437'
   */
  constructor(
    ne: LatLng | { lat: number; lng: number },
    sw: LatLng | { lat: number; lng: number }
  ) {
    let isValid = true;

    // Helper function to check if a value is an object with numeric lat/lng.
    const isLatLngObject = (val: any): boolean =>
      val &&
      typeof val === 'object' &&
      typeof val.lat === 'number' &&
      typeof val.lng === 'number';

    // Validate the northeast (NE) coordinate.
    let neLatLng: LatLng;
    if (ne instanceof LatLng) {
      neLatLng = ne;
    } else if (isLatLngObject(ne)) {
      neLatLng = new LatLng(ne.lat, ne.lng);
    } else {
      console.warn(
        "Invalid 'ne' value. Must be an instance of LatLng or an object with lat and lng numbers."
      );
      isValid = false;
      neLatLng = new LatLng(Number(ne.lat), Number(ne.lng));
    }

    // Validate the southwest (SW) coordinate.
    let swLatLng: LatLng;
    if (sw instanceof LatLng) {
      swLatLng = sw;
    } else if (isLatLngObject(sw)) {
      swLatLng = new LatLng(sw.lat, sw.lng);
    } else {
      console.warn(
        "Invalid 'sw' value. Must be an instance of LatLng or an object with lat and lng numbers."
      );
      isValid = false;
      swLatLng = new LatLng(Number(sw.lat), Number(sw.lng));
    }

    this.ne = neLatLng;
    this.sw = swLatLng;
    this.value = `${this.ne.toString()},${this.sw.toString()}`;

    if (!isValid) {
      console.warn(
        "LatLngBounds must be an object with valid NE and SW values."
      );
    }
  }

  /**
   * Converts the LatLngBounds instance to a string representation.
   *
   * @returns {string} - A string in the format "NE_lat,NE_lng,SW_lat,SW_lng".
   * @example
   * const ne = new LatLng(40.7128, -74.0060);
   * const sw = new LatLng(34.0522, -118.2437);
   * const bounds = new LatLngBounds(ne, sw);
   * console.log(bounds.toString()); // Outputs: '40.7128,-74.0060,34.0522,-118.2437'
   */
  toString(): string {
    return `${this.ne.toString()},${this.sw.toString()}`;
  }
}

export default LatLngBounds;
