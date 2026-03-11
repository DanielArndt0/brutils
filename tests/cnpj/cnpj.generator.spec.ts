import { describe, expect, it } from "vitest";
import { generateCNPJ } from "../../src/services/cnpj/cnpj.generator.js";
import { validateCNPJ } from "../../src/services/cnpj/cnpj.validator.js";

describe("generateCNPJ", () => {
  it("should generate an unformatted valid CNPJ", () => {
    const cnpj = generateCNPJ();

    expect(cnpj).toMatch(/^\d{14}$/);
    expect(validateCNPJ(cnpj).isValid).toBe(true);
  });

  it("should generate a formatted valid CNPJ", () => {
    const cnpj = generateCNPJ({ formatted: true });

    expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
    expect(validateCNPJ(cnpj).isValid).toBe(true);
  });
});