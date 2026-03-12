import { describe, expect, it } from "vitest";
import {
  formatCEPValue,
  maskCEP,
  stripCEP,
  validateCEP
} from "../../src/services/cep/index.js";
describe("validateCEP", () => {
  it("validates CEP", () => {
    expect(validateCEP("86010190").isValid).toBe(true);
  });
  it("strict rejects repeated patterns", () => {
    expect(validateCEP("11111111").isValid).toBe(true);
    expect(validateCEP("11111111", { strict: true }).isValid).toBe(false);
  });
  it("formats, strips and masks", () => {
    expect(formatCEPValue("86010190")).toBe("86010-190");
    expect(stripCEP("86010-190")).toBe("86010190");
    expect(maskCEP("86010190")).toBe("*****-190");
  });
});
