import { describe, expect, it } from "vitest";
import {
  formatCNPJValue,
  maskCNPJ,
  stripCNPJ,
  validateCNPJ
} from "../../src/services/cnpj/index.js";
describe("validateCNPJ", () => {
  it("validates known cnpj", () => {
    expect(validateCNPJ("11444777000161", { strict: true }).isValid).toBe(true);
  });
  it("strict rejects repeated patterns only in strict mode", () => {
    expect(validateCNPJ("00000000000000").isValid).toBe(true);
    expect(validateCNPJ("00000000000000", { strict: true }).isValid).toBe(
      false
    );
  });
  it("formats, strips and masks", () => {
    expect(formatCNPJValue("11444777000161")).toBe("11.444.777/0001-61");
    expect(stripCNPJ("11.444.777/0001-61")).toBe("11444777000161");
    expect(maskCNPJ("11444777000161")).toBe("**.***.***/****-61");
  });
});
