import type { GeneratorOptions } from "../../core/types/common.types.js";
import { formatCNPJ } from "../../core/utils/format.js";
import { randomDigits } from "../../core/utils/random.js";

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

export function generateCNPJ(options: GeneratorOptions = {}): string {
  const rootDigits = randomDigits(8);
  const branchDigits = [0, 0, 0, 1];

  const baseDigits = [...rootDigits, ...branchDigits];

  const firstCheckDigit = calculateCNPJCheckDigit(baseDigits);
  const secondCheckDigit = calculateCNPJCheckDigit([
    ...baseDigits,
    firstCheckDigit
  ]);

  const cnpj = [...baseDigits, firstCheckDigit, secondCheckDigit].join("");

  return options.formatted ? formatCNPJ(cnpj) : cnpj;
}