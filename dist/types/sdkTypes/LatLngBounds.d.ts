import LatLng from './LatLng';
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
    constructor(ne: LatLng | {
        lat: number;
        lng: number;
    }, sw: LatLng | {
        lat: number;
        lng: number;
    });
    toString(): string;
}
export default LatLngBounds;
