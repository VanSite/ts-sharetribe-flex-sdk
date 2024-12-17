class BigDecimal {
  value: string;

  constructor(value: any) {
    if (typeof value !== 'string') {
      console.warn("BigDecimal must be a string");
    }
    // Convert the value to string regardless, to maintain compatibility
    this.value = String(value);
  }

  toString() {
    return `${this.value}`;
  }
}

export default BigDecimal;