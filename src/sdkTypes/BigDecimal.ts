import {z} from "zod";

// Define the schema using Zod
export const BigDecimalSchema = z.string({message: "BigDecimal must be a string"});

// Type definition for the Money class based on the Zod schema
export type BigDecimalType = z.infer<typeof BigDecimalSchema>;

class BigDecimal {
  value: string;

  constructor(value: string) {
    // Use the Zod schema to parse the input and validate it
    this.value = BigDecimalSchema.parse(value);
  }

  toString() {
    return `${this.value}`;
  }
}

export default BigDecimal