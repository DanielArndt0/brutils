import { describe, expect, it } from "vitest";
import {
  generateCNPJ,
  generateCNPJBatch,
  validateCNPJ
} from "../../src/services/cnpj/index.js";
describe("generateCNPJ", () => {
  it("generates valid CNPJ", () => {
    const cnpj = generateCNPJ();
    expect(cnpj).toMatch(/^\d{14}$/);
    expect(validateCNPJ(cnpj, { strict: true }).isValid).toBe(true);
  });
  it("supports branch", () => {
    expect(generateCNPJ({ branch: "12" }).slice(8, 12)).toBe("0012");
  });
  it("generates unique batch", () => {
    const values = generateCNPJBatch({ count: 5, unique: true });
    expect(new Set(values).size).toBe(5);
  });
});
