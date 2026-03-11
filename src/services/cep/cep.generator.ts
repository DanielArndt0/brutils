import type { GeneratorOptions } from "../../core/types/common.types.js";
import { randomDigits } from "../../core/utils/random.js";

function formatCEP(value: string): string {
  return value.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function generateCEP(options: GeneratorOptions = {}): string {
  const digits = randomDigits(8).join("");

  if (options.formatted) {
    return formatCEP(digits);
  }

  return digits;
}