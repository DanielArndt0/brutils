import { validateCPF } from "../../src/services/cpf/cpf.validator.js";

const value = process.argv[2];

if (!value) {
  console.error("Usage: npm run cpf:validate -- <cpf>");
  process.exit(1);
}

console.log(validateCPF(value));