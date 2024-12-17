class Money {
  amount: number;
  currency: string;

  constructor(amount: number, currency: string) {
    let isValid = true;

    if (!Number.isInteger(amount)) {
      console.warn('Amount must be an integer.');
      isValid = false;
    }

    if (currency.length < 3) {
      console.warn('Currency must be at least 3 characters long.');
      isValid = false;
    }

    this.amount = amount;
    this.currency = currency;

    if (!isValid) {
      console.warn('Invalid Money values provided.');
    }
  }
}

export default Money;
