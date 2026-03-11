import type { GeneratorOptions } from "../../core/types/common.types.js";
import { formatCPF } from "../../core/utils/format.js";
import { randomDigits } from "../../core/utils/random.js";

function calculateCPFCheckDigit(digits: number[]): number {
  const factorStart = digits.length + 1;

  const sum = digits.reduce((accumulator, digit, index) => {
    return accumulator + digit * (factorStart - index);
  }, 0);

  const remainder = (sum * 10) % 11;

  return remainder === 10 ? 0 : remainder;
}

export function generateCPF(options: GeneratorOptions = {}): string {
  const baseDigits = randomDigits(9);

  const firstCheckDigit = calculateCPFCheckDigit(baseDigits);
  const secondCheckDigit = calculateCPFCheckDigit([
    ...baseDigits,
    firstCheckDigit
  ]);

  const cpf = [...baseDigits, firstCheckDigit, secondCheckDigit].join("");

  return options.formatted ? formatCPF(cpf) : cpf;
}