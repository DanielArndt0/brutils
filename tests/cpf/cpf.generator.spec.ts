import { describe, expect, it } from "vitest";
import {
  generateCPF,
  generateCPFBatch,
  validateCPF
} from "../../src/services/cpf/index.js";
describe("generateCPF", () => {
  it("generates valid CPF", () => {
    const cpf = generateCPF();
    expect(cpf).toMatch(/^\d{11}$/);
    expect(validateCPF(cpf, { strict: true }).isValid).toBe(true);
  });
  it("generates formatted valid CPF", () => {
    const cpf = generateCPF({ formatted: true });
    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    expect(validateCPF(cpf, { strict: true }).isValid).toBe(true);
  });
  it("generates unique CPFs", () => {
    const values = generateCPFBatch({ count: 5, unique: true });
    expect(new Set(values).size).toBe(5);
  });
  it("supports state bias", () => {
    expect(generateCPF({ state: "SP" })[8]).toBe("8");
  });
});
