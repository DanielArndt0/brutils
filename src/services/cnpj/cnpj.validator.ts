import type { ValidationResult } from "../../core/types/common.types.js";
import { allDigitsEqual, onlyDigits } from "../../core/utils/digits.js";
import { formatCNPJ } from "../../core/utils/format.js";

function calculateCNPJCheckDigit(digits: number[]): number {
  const weights =
    digits.length === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const sum = digits.reduce((accumulator, digit, index) => {
    return accumulator + digit * weights[index]!;
  }, 0);

  const remainder = sum % 11;

  return remainder < 2 ? 0 : 11 - remainder;
}

export function validateCNPJ(value: string): ValidationResult {
  const digits = onlyDigits(value);

  if (digits.length !== 14 || allDigitsEqual(digits)) {
    return {
      isValid: false,
      value: digits
    };
  }

  const baseDigits = digits
    .slice(0, 12)
    .split("")
    .map(Number);

  const firstCheckDigit = calculateCNPJCheckDigit(baseDigits);
  const secondCheckDigit = calculateCNPJCheckDigit([
    ...baseDigits,
    firstCheckDigit
  ]);

  const expectedCNPJ = [...baseDigits, firstCheckDigit, secondCheckDigit].join(
    ""
  );

  const isValid = digits === expectedCNPJ;

  return {
    isValid,
    value: digits,
    formatted: digits.length === 14 ? formatCNPJ(digits) : undefined
  };
}