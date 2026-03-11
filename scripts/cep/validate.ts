import { validateCEP } from "../../src/services/cep/cep.validator.js";

const value = process.argv[2];

if (!value) {
  console.error("Usage: npm run cep:validate -- <cep>");
  process.exit(1);
}

console.log(validateCEP(value));