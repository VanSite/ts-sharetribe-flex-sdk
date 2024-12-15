import {z} from 'zod';
import LatLng from './LatLng';

// Define the schema for LatLngBounds
export const LatLngBoundsSchema = z.object({
  ne: z.instanceof(LatLng, {message: 'ne must be an instance of LatLng'}).or(z.object({
    lat: z.number(),
    lng: z.number()
  }, {message: 'ne must be an object with lat and lng'})),
  sw: z.instanceof(LatLng, {message: 'sw must be an instance of LatLng'}).or(z.object({
    lat: z.number(),
    lng: z.number()
  }, {message: 'sw must be an object with lat and lng'})),
}, {message: 'LatLngBounds must be an object with ne and sw'});

class LatLngBounds {
  ne: LatLng;
  sw: LatLng;

  constructor(ne: { lat: number; lng: number } | LatLng, sw: { lat: number; lng: number } | LatLng) {
    const validatedData = LatLngBoundsSchema.parse({ne, sw});
    this.ne = ne instanceof LatLng ? validatedData.ne : new LatLng(validatedData.ne.lat, validatedData.ne.lng);
    this.sw = sw instanceof LatLng ? validatedData.sw : new LatLng(validatedData.sw.lat, validatedData.sw.lng);
  }

  toString() {
    return `${this.ne.toString()},${this.sw.toString()}`;
  }
}

export default LatLngBounds;
