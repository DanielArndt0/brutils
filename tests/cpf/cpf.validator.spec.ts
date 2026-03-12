import { describe, expect, it } from "vitest";
import {
  formatCPFValue,
  maskCPF,
  stripCPF,
  validateCPF
} from "../../src/services/cpf/index.js";
describe("validateCPF", () => {
  it("validates known cpf", () => {
    const result = validateCPF("52998224725", { strict: true });
    expect(result.isValid).toBe(true);
    expect(result.formatted).toBe("529.982.247-25");
  });
  it("strict rejects repeated patterns only in strict mode", () => {
    expect(validateCPF("11111111111").isValid).toBe(true);
    expect(validateCPF("11111111111", { strict: true }).isValid).toBe(false);
  });
  it("formats, strips and masks", () => {
    expect(formatCPFValue("52998224725")).toBe("529.982.247-25");
    expect(stripCPF("529.982.247-25")).toBe("52998224725");
    expect(maskCPF("52998224725")).toBe("***.***.***-25");
  });
});
