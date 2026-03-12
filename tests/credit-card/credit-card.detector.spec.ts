import { describe, expect, it } from "vitest";
import { detectCreditCardBrand } from "../../src/services/credit-card/credit-card.detector.js";

describe("detectCreditCardBrand", () => {
  it("should detect visa", () => {
    expect(detectCreditCardBrand("4111111111111111")).toBe("visa");
  });

  it("should detect mastercard", () => {
    expect(detectCreditCardBrand("5555555555554444")).toBe("mastercard");
  });

  it("should detect amex", () => {
    expect(detectCreditCardBrand("340000000000009")).toBe("amex");
  });

  it("should return unknown for unsupported card", () => {
    expect(detectCreditCardBrand("1234567890123456")).toBe("unknown");
  });
});
