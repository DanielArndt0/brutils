import { generateCPF } from "../../src/services/cpf/cpf.generator.js";

const formatted = process.argv.includes("--formatted");

const result = generateCPF({ formatted });

console.log(result);