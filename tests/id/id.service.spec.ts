import { describe, expect, it } from "vitest";

import {
  generatePasswordValues,
  generateTokenValues,
  generateUuidValues
} from "../../src/services/id/index.js";

describe("id service", () => {
  it("should generate UUID values", () => {
    const values = generateUuidValues({ count: 2 });

    expect(values).toHaveLength(2);
    expect(new Set(values).size).toBe(2);
    expect(values[0]).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("should generate tokens with the requested charset and length", () => {
    const values = generateTokenValues({
      count: 2,
      length: 16,
      charset: "hex"
    });

    expect(values).toHaveLength(2);
    expect(values.every((value) => /^[0-9a-f]{16}$/.test(value))).toBe(true);
  });

  it("should generate passwords with flag-based constraints", () => {
    const password = generatePasswordValues({
      count: 1,
      length: 18,
      noNumbers: true,
      noSymbols: true,
      uppercase: true
    })[0]!;

    expect(password).toHaveLength(18);
    expect(password).toMatch(/^[A-Za-z]+$/);
    expect(password).toMatch(/[A-Z]/);
  });
});
