import { describe, expect, it } from "vitest";
import { validateCEP } from "../../src/services/cep/cep.validator.js";

describe("validateCEP", () => {
  it("should validate unformatted CEP", () => {
    const result = validateCEP("86010190");

    expect(result.isValid).toBe(true);
    expect(result.formatted).toBe("86010-190");
  });

  it("should validate formatted CEP", () => {
    const result = validateCEP("86010-190");

    expect(result.isValid).toBe(true);
    expect(result.value).toBe("86010190");
  });

  it("should invalidate invalid CEP", () => {
    const result = validateCEP("123");

    expect(result.isValid).toBe(false);
  });
});