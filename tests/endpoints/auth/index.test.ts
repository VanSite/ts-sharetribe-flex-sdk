import { urlEncodeFormData } from "../../../src/endpoints/auth";

// Tests for urlEncodeFormData function
describe("urlEncodeFormData", () => {
  // Test case 1: Empty object
  it("should return an empty string for empty object", () => {
    const result = urlEncodeFormData({});
    expect(result).toBe("");
  });

  // Test case 2: Basic key-value pairs
  it("should encode basic key-value pairs correctly", () => {
    const result = urlEncodeFormData({
      name: "John Doe",
      email: "john@example.com",
    });
    expect(result).toBe("name=John%20Doe&email=john%40example.com");
  });

  // Test case 3: Special characters
  it("should properly encode special characters", () => {
    const result = urlEncodeFormData({
      q: "search term with spaces & special chars: !@#$%^&*()",
    });
    expect(result).toBe(
      "q=search%20term%20with%20spaces%20%26%20special%20chars%3A%20!%40%23%24%25%5E%26*()"
    );
  });

  // Test case 4: Null and undefined values
  it("should skip null and undefined values", () => {
    const result = urlEncodeFormData({
      a: "value",
      b: null,
      c: undefined,
      d: "another value",
    });
    expect(result).toBe("a=value&d=another%20value");
  });

  // Test case 5: Nested objects
  it("should handle nested objects correctly", () => {
    const result = urlEncodeFormData({
      user: { name: "John", age: 30 },
    });
    expect(result).toBe("user=%7B%22name%22%3A%22John%22%2C%22age%22%3A30%7D");
  });

  // Test case 6: Arrays
  it("should handle arrays correctly", () => {
    const result = urlEncodeFormData({
      ids: [1, 2, 3],
    });
    expect(result).toBe("ids=1%2C2%2C3");
  });

  // Test case 7: Empty string
  it("should handle empty string values", () => {
    const result = urlEncodeFormData({
      name: "",
    });
    expect(result).toBe("name=");
  });

  // Test case 8: Boolean values
  it("should handle boolean values", () => {
    const result = urlEncodeFormData({
      active: true,
      disabled: false,
    });
    expect(result).toBe("active=true&disabled=false");
  });

  // Test case 9: Null input
  it("should return empty string for null input", () => {
    const result = urlEncodeFormData(null);
    expect(result).toBe("");
  });

  // Test case 10: Undefined input
  it("should return empty string for undefined input", () => {
    const result = urlEncodeFormData(undefined!);
    expect(result).toBe("");
  });
});
