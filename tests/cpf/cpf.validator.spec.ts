import { describe, expect, it } from "vitest";
import { validateCPF } from "../../src/services/cpf/cpf.validator.js";

describe("validateCPF", () => {
  it("should validate a correct unformatted CPF", () => {
    const result = validateCPF("52998224725");

    expect(result.isValid).toBe(true);
    expect(result.value).toBe("52998224725");
    expect(result.formatted).toBe("529.982.247-25");
  });

  it("should validate a correct formatted CPF", () => {
    const result = validateCPF("529.982.247-25");

    expect(result.isValid).toBe(true);
    expect(result.value).toBe("52998224725");
    expect(result.formatted).toBe("529.982.247-25");
  });

  it("should invalidate a CPF with wrong check digits", () => {
    const result = validateCPF("52998224724");

    expect(result.isValid).toBe(false);
  });

  it("should invalidate a CPF with all equal digits", () => {
    const result = validateCPF("11111111111");

    expect(result.isValid).toBe(false);
  });

  it("should invalidate a CPF with invalid length", () => {
    const result = validateCPF("123456789");

    expect(result.isValid).toBe(false);
  });
});