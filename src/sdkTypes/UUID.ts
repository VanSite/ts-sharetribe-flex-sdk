import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// Define the UUID validation schema using a regular expression for UUID v4
export const UUIDSchema = z.object({
  uuid: z.string({
    message: 'uuid must be a string'
  })
});

export type UUIDType = z.infer<typeof UUIDSchema>;

class UUID {
  uuid: string

  constructor(uuid?: string) {
    const validatedData = UUIDSchema.parse({uuid: uuid || uuidv4()});
    this.uuid = validatedData.uuid
  }

  toString() {
    return this.uuid;
  }
}

export default UUID;
