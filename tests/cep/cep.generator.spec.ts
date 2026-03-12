import { describe, expect, it } from "vitest";
import {
  generateCEP,
  generateCEPBatch,
  validateCEP
} from "../../src/services/cep/index.js";
describe("generateCEP", () => {
  it("generates valid CEP", () => {
    const cep = generateCEP();
    expect(cep).toMatch(/^\d{8}$/);
    expect(validateCEP(cep).isValid).toBe(true);
  });
  it("supports count and state", () => {
    expect(generateCEP({ state: "PR" })[0]).toBe("8");
    expect(generateCEPBatch({ count: 4 })).toHaveLength(4);
  });
});
