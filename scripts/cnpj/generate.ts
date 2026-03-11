import { generateCNPJ } from "../../src/services/cnpj/cnpj.generator.js";

const formatted = process.argv.includes("--formatted");

const result = generateCNPJ({ formatted });

console.log(result);