import { z } from 'zod';

// Define the schema using Zod
export const MoneySchema = z.object({
  amount: z.number({message: 'Amount must be a number.'}).int({message: 'Amount must be an integer.'}),
  currency: z.string({message: 'Currency must be a string.'}).min(3, {message: 'Currency must be at least 3 characters long.'}),
});

// Type definition for the Money class based on the Zod schema
export type MoneyType = z.infer<typeof MoneySchema>;

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