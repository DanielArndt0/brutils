import { generateCEP } from "../../src/services/cep/cep.generator.js";

const formatted = process.argv.includes("--formatted");

const result = generateCEP({ formatted });

console.log(result);