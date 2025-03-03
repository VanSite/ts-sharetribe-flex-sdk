/**
 * @fileoverview Provides the LatLngBounds class for representing geographical bounding boxes.
 * This class encapsulates a northeast (NE) and southwest (SW) pair of coordinates to define a rectangular area.
 */
import LatLng from './LatLng';
/**
 * Class representing a geographical bounding box with NE and SW coordinates.
 */
declare class LatLngBounds {
    ne: LatLng | {
        lat: number | string;
        lng: number | string;
    };
    sw: LatLng | {
        lat: number | string;
        lng: number | string;
    };
    value: string;
    readonly _sdkType: 'LatLngBounds';
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
    constructor(ne: LatLng | {
        lat: number;
        lng: number;
    }, sw: LatLng | {
        lat: number;
        lng: number;
    });
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
    toString(): string;
}
export default LatLngBounds;
