import { describe, expect, it } from "vitest";
import { generateCPF } from "../../src/services/cpf/cpf.generator.js";
import { validateCPF } from "../../src/services/cpf/cpf.validator.js";

describe("generateCPF", () => {
  it("should generate an unformatted valid CPF", () => {
    const cpf = generateCPF();

    expect(cpf).toMatch(/^\d{11}$/);
    expect(validateCPF(cpf).isValid).toBe(true);
  });

  it("should generate a formatted valid CPF", () => {
    const cpf = generateCPF({ formatted: true });

    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    expect(validateCPF(cpf).isValid).toBe(true);
  });
});