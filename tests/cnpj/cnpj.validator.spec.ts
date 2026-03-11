import { describe, expect, it } from "vitest";
import { validateCNPJ } from "../../src/services/cnpj/cnpj.validator.js";

describe("validateCNPJ", () => {
  it("should validate a correct unformatted CNPJ", () => {
    const result = validateCNPJ("11444777000161");

    expect(result.isValid).toBe(true);
    expect(result.value).toBe("11444777000161");
    expect(result.formatted).toBe("11.444.777/0001-61");
  });

  it("should validate a correct formatted CNPJ", () => {
    const result = validateCNPJ("11.444.777/0001-61");

    expect(result.isValid).toBe(true);
    expect(result.value).toBe("11444777000161");
    expect(result.formatted).toBe("11.444.777/0001-61");
  });

  it("should invalidate a CNPJ with wrong check digits", () => {
    const result = validateCNPJ("11444777000162");

    expect(result.isValid).toBe(false);
  });

  it("should invalidate a CNPJ with all equal digits", () => {
    const result = validateCNPJ("11111111111111");

    expect(result.isValid).toBe(false);
  });

  it("should invalidate a CNPJ with invalid length", () => {
    const result = validateCNPJ("123456789");

    expect(result.isValid).toBe(false);
  });
});