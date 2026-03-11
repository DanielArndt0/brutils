import { validateCNPJ } from "../../src/services/cnpj/cnpj.validator.js";

const value = process.argv[2];

if (!value) {
  console.error("Usage: npm run cnpj:validate -- <cnpj>");
  process.exit(1);
}

console.log(validateCNPJ(value));