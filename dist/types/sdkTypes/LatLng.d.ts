declare class LatLng {
    lat: number | string;
    lng: number | string;
    value: string;
    constructor(lat: string | number, lng: string | number);
    toString(): string;
}
export default LatLng;
