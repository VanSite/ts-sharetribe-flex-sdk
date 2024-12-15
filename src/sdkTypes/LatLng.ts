import { z } from 'zod';

// Define the schema using Zod
export const LatLngSchema = z.object({
  lat: z.union([z.number(), z.string().regex(/^\d+(\.\d+)?$/)], { message: "Latitude must be a number or a string that represents a number" }),
  lng: z.union([z.number(), z.string().regex(/^\d+(\.\d+)?$/)], { message: "Longitude must be a number or a string that represents a number" }),
});

// Type definition for the LatLng class based on the Zod schema
export type LatLngType = z.infer<typeof LatLngSchema>;

class LatLng {
  lat: number | string;
  lng: number | string;

  constructor(lat: string | number, lng: string | number) {
    // Use the Zod schema to parse the input and validate it
    const validatedData = LatLngSchema.parse({ lat, lng });

    this.lat = validatedData.lat;
    this.lng = validatedData.lng;
  }

  toString() {
    return `${this.lat},${this.lng}`;
  }
}


export default LatLng;
