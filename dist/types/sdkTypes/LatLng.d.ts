import { z } from 'zod';
export declare const LatLngSchema: z.ZodObject<{
    lat: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    lng: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
}, "strip", z.ZodTypeAny, {
    lat: string | number;
    lng: string | number;
}, {
    lat: string | number;
    lng: string | number;
}>;
export type LatLngType = z.infer<typeof LatLngSchema>;
declare class LatLng {
    lat: number | string;
    lng: number | string;
    constructor(lat: string | number, lng: string | number);
    toString(): string;
}
export default LatLng;
