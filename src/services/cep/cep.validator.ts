import type { ValidationResult } from "../../core/types/common.types.js";
import { onlyDigits } from "../../core/utils/digits.js";

function formatCEP(value: string): string {
  return value.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function validateCEP(value: string): ValidationResult {
  const digits = onlyDigits(value);

  const isValid = digits.length === 8;

  return {
    isValid,
    value: digits,
    formatted: isValid ? formatCEP(digits) : undefined
  };
}