import { describe, expect, it } from "vitest";
import { generateCreditCard } from "../../src/services/credit-card/credit-card.generator.js";
import { validateCreditCard } from "../../src/services/credit-card/credit-card.validator.js";

describe("generateCreditCard", () => {
  it("should generate a valid visa card", () => {
    const card = generateCreditCard({ brand: "visa" });

    const result = validateCreditCard({
      number: card.number,
      expiry: card.expiry,
      cvv: card.cvv
    });

    expect(card.brand).toBe("visa");
    expect(result.isValid).toBe(true);
  });

  it("should generate a valid mastercard", () => {
    const card = generateCreditCard({ brand: "mastercard" });

    const result = validateCreditCard({
      number: card.number,
      expiry: card.expiry,
      cvv: card.cvv
    });

    expect(card.brand).toBe("mastercard");
    expect(result.isValid).toBe(true);
  });

  it("should generate a valid amex", () => {
    const card = generateCreditCard({ brand: "amex" });

    const result = validateCreditCard({
      number: card.number,
      expiry: card.expiry,
      cvv: card.cvv
    });

    expect(card.brand).toBe("amex");
    expect(card.cvv).toHaveLength(4);
    expect(result.isValid).toBe(true);
  });
});