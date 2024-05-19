import { z } from 'zod';
import LatLng from './LatLng';

// Define the schema for LatLngBounds
export const LatLngBoundsSchema = z.object({
  ne: z.instanceof(LatLng).or(z.object({ lat: z.number(), lng: z.number() })),
  sw: z.instanceof(LatLng).or(z.object({ lat: z.number(), lng: z.number() }))
});

class LatLngBounds {
  ne: LatLng;
  sw: LatLng;

  constructor(ne: { lat: number; lng: number } | LatLng, sw: { lat: number; lng: number } | LatLng) {
    const validatedData = LatLngBoundsSchema.parse({ ne, sw });
    this.ne = ne instanceof LatLng ? validatedData.ne : new LatLng(validatedData.ne.lat, validatedData.ne.lng);
    this.sw = sw instanceof LatLng ? validatedData.sw : new LatLng(validatedData.sw.lat, validatedData.sw.lng);
  }

  toString() {
    return `${this.ne.toString()},${this.sw.toString()}`;
  }
}

export default LatLngBounds;
