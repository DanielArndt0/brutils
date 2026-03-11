import { describe, expect, it } from "vitest";
import { generateCEP } from "../../src/services/cep/cep.generator.js";
import { validateCEP } from "../../src/services/cep/cep.validator.js";

describe("generateCEP", () => {
  it("should generate an unformatted CEP", () => {
    const cep = generateCEP();

    expect(cep).toMatch(/^\d{8}$/);
    expect(validateCEP(cep).isValid).toBe(true);
  });

  it("should generate a formatted CEP", () => {
    const cep = generateCEP({ formatted: true });

    expect(cep).toMatch(/^\d{5}-\d{3}$/);
    expect(validateCEP(cep).isValid).toBe(true);
  });
});