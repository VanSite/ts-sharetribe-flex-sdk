import { z } from 'zod';

// Define the schema using Zod
export const MoneySchema = z.object({
  amount: z.number().int(),
  currency: z.string().length(3),
});

// Type definition for the Money class based on the Zod schema
type MoneyType = z.infer<typeof MoneySchema>;

class Money {
  amount: number;
  currency: string;

  constructor(amount: number, currency: string) {
    // Use the Zod schema to parse the input and validate it
    const validatedData = MoneySchema.parse({amount, currency});

    this.amount = validatedData.amount;
    this.currency = validatedData.currency;
  }
}

export default Money