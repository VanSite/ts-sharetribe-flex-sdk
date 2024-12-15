import { z } from 'zod';
import LatLng from './LatLng';
export declare const LatLngBoundsSchema: z.ZodObject<{
    ne: z.ZodUnion<[z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lng: number;
    }, {
        lat: number;
        lng: number;
    }>]>;
    sw: z.ZodUnion<[z.ZodType<LatLng, z.ZodTypeDef, LatLng>, z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lng: number;
    }, {
        lat: number;
        lng: number;
    }>]>;
}, "strip", z.ZodTypeAny, {
    ne: LatLng | {
        lat: number;
        lng: number;
    };
    sw: LatLng | {
        lat: number;
        lng: number;
    };
}, {
    ne: LatLng | {
        lat: number;
        lng: number;
    };
    sw: LatLng | {
        lat: number;
        lng: number;
    };
}>;
declare class LatLngBounds {
    ne: LatLng;
    sw: LatLng;
    constructor(ne: {
        lat: number;
        lng: number;
    } | LatLng, sw: {
        lat: number;
        lng: number;
    } | LatLng);
    toString(): string;
}
export default LatLngBounds;
