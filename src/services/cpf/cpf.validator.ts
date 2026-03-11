import type { ValidationResult } from "../../core/types/common.types.js";
import { allDigitsEqual, onlyDigits } from "../../core/utils/digits.js";
import { formatCPF } from "../../core/utils/format.js";

function calculateCPFCheckDigit(digits: number[]): number {
  const factorStart = digits.length + 1;

  const sum = digits.reduce((accumulator, digit, index) => {
    return accumulator + digit * (factorStart - index);
  }, 0);

  const remainder = (sum * 10) % 11;

  return remainder === 10 ? 0 : remainder;
}

export function validateCPF(value: string): ValidationResult {
  const digits = onlyDigits(value);

  if (digits.length !== 11 || allDigitsEqual(digits)) {
    return {
      isValid: false,
      value: digits
    };
  }

  const baseDigits = digits
    .slice(0, 9)
    .split("")
    .map(Number);

  const firstCheckDigit = calculateCPFCheckDigit(baseDigits);
  const secondCheckDigit = calculateCPFCheckDigit([
    ...baseDigits,
    firstCheckDigit
  ]);

  const expectedCPF = [...baseDigits, firstCheckDigit, secondCheckDigit].join("");

  const isValid = digits === expectedCPF;

  return {
    isValid,
    value: digits,
    formatted: digits.length === 11 ? formatCPF(digits) : undefined
  };
}