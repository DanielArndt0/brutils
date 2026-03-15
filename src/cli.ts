#!/usr/bin/env node
import fs from "node:fs";
import { Command } from "commander";

import {
  formatCPFValue,
  generateCPF,
  generateCPFBatch,
  maskCPF,
  stripCPF,
  validateCPF,
  type CPFStateCode
} from "./services/cpf/index.js";
import {
  formatCNPJValue,
  generateCNPJ,
  generateCNPJBatch,
  maskCNPJ,
  stripCNPJ,
  validateCNPJ
} from "./services/cnpj/index.js";
import {
  formatCEPValue,
  generateCEP,
  generateCEPBatch,
  maskCEP,
  stripCEP,
  validateCEP,
  type CEPStateCode
} from "./services/cep/index.js";
import {
  detectCreditCardBrand,
  generateCreditCard,
  validateCreditCard,
  type CreditCardBrand
} from "./services/credit-card/index.js";
import {
  flipCoin,
  generateRandomFloats,
  generateRandomIntegers,
  pickRandomItems,
  rollDice,
  shuffleRandomItems
} from "./services/random-number/index.js";
import { pickRandomNumber } from "./services/number-picker/index.js";
import { createZip, listZip, testZip } from "./services/zip/index.js";
import {
  extractZipFile,
  listUnzip,
  testUnzip
} from "./services/unzip/index.js";

const BRAZILIAN_STATES = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO"
] as const;

const CARD_BRANDS = ["visa", "mastercard", "amex", "elo"] as const;
const RANDOM_OUTPUT_FORMATS = ["plain", "json", "csv"] as const;

type RandomOutputFormat = (typeof RANDOM_OUTPUT_FORMATS)[number];

function parseInteger(value: string): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new Error(`Expected an integer, received "${value}".`);
  }

  return parsed;
}

function parsePositiveInteger(value: string): number {
  const parsed = parseInteger(value);

  if (parsed < 1) {
    throw new Error(`Expected a positive integer, received "${value}".`);
  }

  return parsed;
}

function parseNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Expected a numeric value, received "${value}".`);
  }

  return parsed;
}

function parseState(value: string): CPFStateCode | CEPStateCode {
  const normalized = value.toUpperCase();

  if (
    !BRAZILIAN_STATES.includes(normalized as (typeof BRAZILIAN_STATES)[number])
  ) {
    throw new Error(
      `Invalid state "${value}". Use one of: ${BRAZILIAN_STATES.join(", ")}.`
    );
  }

  return normalized as CPFStateCode | CEPStateCode;
}

function parseCardBrand(value: string): CreditCardBrand {
  const normalized = value.toLowerCase();

  if (!CARD_BRANDS.includes(normalized as CreditCardBrand)) {
    throw new Error(
      `Invalid brand "${value}". Use one of: ${CARD_BRANDS.join(", ")}.`
    );
  }

  return normalized as CreditCardBrand;
}

function parseRandomFormat(value: string): RandomOutputFormat {
  const normalized = value.toLowerCase();

  if (!RANDOM_OUTPUT_FORMATS.includes(normalized as RandomOutputFormat)) {
    throw new Error(
      `Invalid output format "${value}". Use one of: ${RANDOM_OUTPUT_FORMATS.join(", ")}.`
    );
  }

  return normalized as RandomOutputFormat;
}

function readItems(items?: string, file?: string): string[] {
  if (items && file) {
    throw new Error("Use either --items or --file, not both.");
  }

  if (!items && !file) {
    throw new Error("One of --items or --file is required.");
  }

  if (items) {
    const parsed = items
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (parsed.length === 0) {
      throw new Error("The --items value did not produce any usable items.");
    }

    return parsed;
  }

  const content = fs.readFileSync(file!, "utf-8");
  const parsed = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (parsed.length === 0) {
    throw new Error(
      "The file passed to --file did not contain any usable items."
    );
  }

  return parsed;
}

function printValue(value: unknown): void {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    console.log(value);
    return;
  }

  if (Array.isArray(value)) {
    if (
      value.every(
        (item) => typeof item === "string" || typeof item === "number"
      )
    ) {
      console.log(value.join("\n"));
      return;
    }
  }

  console.log(JSON.stringify(value, null, 2));
}

function printRandomValues(
  values: Array<string | number>,
  format: RandomOutputFormat
): void {
  if (format === "json") {
    console.log(JSON.stringify(values, null, 2));
    return;
  }

  if (format === "csv") {
    console.log(values.join(","));
    return;
  }

  console.log(values.join("\n"));
}

const program = new Command();

program
  .name("brutils")
  .description("Core Brazilian developer utilities CLI.")
  .version("0.1.0")
  .showHelpAfterError("(use --help for detailed usage)")
  .showSuggestionAfterError(true)
  .addHelpText(
    "after",
    `
Examples:
  brutils cpf generate --formatted
  brutils cpf validate 529.982.247-25 --strict
  brutils cnpj generate --formatted --count 5 --unique
  brutils cep mask 86010190 --mask "###**-***"
  brutils credit-card generate --brand visa --formatted
  brutils random-number int --min 1 --max 60 --count 6 --unique --sorted
  brutils number-picker run --min 1 --max 60 --seed 42
  brutils zip create ./folder --out ./backup.zip --force
  brutils unzip extract ./backup.zip --out ./restored --force
`
  );

const cpf = program
  .command("cpf")
  .description("Generate, validate, format, strip and mask CPF values.")
  .addHelpText(
    "after",
    `
Examples:
  brutils cpf generate --formatted
  brutils cpf generate --formatted --state SP --count 5 --unique
  brutils cpf validate 52998224725 --strict
  brutils cpf format 52998224725
  brutils cpf strip 529.982.247-25
  brutils cpf mask 52998224725 --mask "***.###.***-##"
`
  );

cpf
  .command("generate")
  .description("Generate synthetic valid CPF values.")
  .option("--formatted", "Return generated values with CPF punctuation.")
  .option(
    "--state <uf>",
    "Bias the region digit using a Brazilian state code.",
    parseState
  )
  .option(
    "--count <number>",
    "Generate multiple CPFs.",
    parsePositiveInteger,
    1
  )
  .option("--unique", "Avoid duplicates during batch generation.")
  .action(
    (options: {
      formatted?: boolean;
      state?: CPFStateCode;
      count: number;
      unique?: boolean;
    }) => {
      const values =
        options.count > 1
          ? generateCPFBatch({
              formatted: options.formatted,
              state: options.state,
              count: options.count,
              unique: options.unique
            })
          : [
              generateCPF({
                formatted: options.formatted,
                state: options.state
              })
            ];

      printValue(values);
    }
  );

cpf
  .command("validate")
  .argument("<value>", "CPF value to validate.")
  .description(
    "Validate a CPF using size, check digits and optional strict repeated-pattern rejection."
  )
  .option("--strict", "Reject repeated patterns such as 11111111111.")
  .action((value: string, options: { strict?: boolean }) => {
    printValue(validateCPF(value, { strict: options.strict }));
  });

cpf
  .command("format")
  .argument("<value>", "CPF value to format.")
  .description("Format a CPF as 000.000.000-00.")
  .action((value: string) => {
    printValue(formatCPFValue(value));
  });

cpf
  .command("strip")
  .argument("<value>", "CPF value to normalize to digits only.")
  .description("Remove punctuation and keep digits only.")
  .action((value: string) => {
    printValue(stripCPF(value));
  });

cpf
  .command("mask")
  .argument("<value>", "CPF value to mask.")
  .description("Mask a CPF for safe display.")
  .option(
    "--mask <pattern>",
    'Custom mask. Use "*" to hide digits and "#" to reveal them.'
  )
  .action((value: string, options: { mask?: string }) => {
    printValue(maskCPF(value, { pattern: options.mask }));
  });

const cnpj = program
  .command("cnpj")
  .description("Generate, validate, format, strip and mask CNPJ values.")
  .addHelpText(
    "after",
    `
Examples:
  brutils cnpj generate --formatted
  brutils cnpj generate --branch 12 --count 3 --unique
  brutils cnpj validate 11.444.777/0001-61 --strict
  brutils cnpj format 11444777000161
  brutils cnpj strip 11.444.777/0001-61
  brutils cnpj mask 11444777000161 --mask "##.***.***/****-##"
`
  );

cnpj
  .command("generate")
  .description("Generate synthetic valid CNPJ values.")
  .option("--formatted", "Return generated values with CNPJ punctuation.")
  .option(
    "--branch <number>",
    "Force a branch identifier. Values are left-padded to 4 digits."
  )
  .option(
    "--count <number>",
    "Generate multiple CNPJs.",
    parsePositiveInteger,
    1
  )
  .option("--unique", "Avoid duplicates during batch generation.")
  .action(
    (options: {
      formatted?: boolean;
      branch?: string;
      count: number;
      unique?: boolean;
    }) => {
      const values =
        options.count > 1
          ? generateCNPJBatch({
              formatted: options.formatted,
              branch: options.branch,
              count: options.count,
              unique: options.unique
            })
          : [
              generateCNPJ({
                formatted: options.formatted,
                branch: options.branch
              })
            ];

      printValue(values);
    }
  );

cnpj
  .command("validate")
  .argument("<value>", "CNPJ value to validate.")
  .description(
    "Validate a CNPJ using size, check digits and optional strict repeated-pattern rejection."
  )
  .option("--strict", "Reject repeated patterns such as 00000000000000.")
  .action((value: string, options: { strict?: boolean }) => {
    printValue(validateCNPJ(value, { strict: options.strict }));
  });

cnpj
  .command("format")
  .argument("<value>", "CNPJ value to format.")
  .description("Format a CNPJ as 00.000.000/0000-00.")
  .action((value: string) => {
    printValue(formatCNPJValue(value));
  });

cnpj
  .command("strip")
  .argument("<value>", "CNPJ value to normalize to digits only.")
  .description("Remove punctuation and keep digits only.")
  .action((value: string) => {
    printValue(stripCNPJ(value));
  });

cnpj
  .command("mask")
  .argument("<value>", "CNPJ value to mask.")
  .description("Mask a CNPJ for safe display.")
  .option(
    "--mask <pattern>",
    'Custom mask. Use "*" to hide digits and "#" to reveal them.'
  )
  .action((value: string, options: { mask?: string }) => {
    printValue(maskCNPJ(value, { pattern: options.mask }));
  });

const cep = program
  .command("cep")
  .description("Generate, validate, format, strip and mask CEP values.")
  .addHelpText(
    "after",
    `
Examples:
  brutils cep generate --formatted
  brutils cep generate --state PR --count 5
  brutils cep validate 86010-190 --strict
  brutils cep format 86010190
  brutils cep strip 86010-190
  brutils cep mask 86010190 --mask "###**-***"
`
  );

cep
  .command("generate")
  .description("Generate synthetic CEP values for testing.")
  .option("--formatted", "Return generated values with CEP punctuation.")
  .option(
    "--state <uf>",
    "Bias the leading digit using a Brazilian state code.",
    parseState
  )
  .option(
    "--count <number>",
    "Generate multiple CEP values.",
    parsePositiveInteger,
    1
  )
  .action(
    (options: { formatted?: boolean; state?: CEPStateCode; count: number }) => {
      const values =
        options.count > 1
          ? generateCEPBatch({
              formatted: options.formatted,
              state: options.state,
              count: options.count
            })
          : [
              generateCEP({
                formatted: options.formatted,
                state: options.state
              })
            ];

      printValue(values);
    }
  );

cep
  .command("validate")
  .argument("<value>", "CEP value to validate.")
  .description(
    "Validate CEP structure and optional strict repeated-pattern rejection."
  )
  .option("--strict", "Reject repeated patterns such as 11111111.")
  .action((value: string, options: { strict?: boolean }) => {
    printValue(validateCEP(value, { strict: options.strict }));
  });

cep
  .command("format")
  .argument("<value>", "CEP value to format.")
  .description("Format a CEP as 00000-000.")
  .action((value: string) => {
    printValue(formatCEPValue(value));
  });

cep
  .command("strip")
  .argument("<value>", "CEP value to normalize to digits only.")
  .description("Remove punctuation and keep digits only.")
  .action((value: string) => {
    printValue(stripCEP(value));
  });

cep
  .command("mask")
  .argument("<value>", "CEP value to mask.")
  .description("Mask a CEP for safe display.")
  .option(
    "--mask <pattern>",
    'Custom mask. Use "*" to hide digits and "#" to reveal them.'
  )
  .action((value: string, options: { mask?: string }) => {
    printValue(maskCEP(value, { pattern: options.mask }));
  });

const creditCard = program
  .command("credit-card")
  .alias("card")
  .description("Generate, validate and detect test credit card data.")
  .addHelpText(
    "after",
    `
Examples:
  brutils credit-card generate --brand visa --formatted
  brutils credit-card validate --number 4111111111111111 --expiry 12/30 --cvv 123
  brutils credit-card validate --number 4111111111111111 --expiry-month 12 --expiry-year 30 --cvv 123
  brutils credit-card detect 4111111111111111
`
  );

creditCard
  .command("generate")
  .description("Generate synthetic card test data.")
  .option("--brand <brand>", "Card brand to generate.", parseCardBrand)
  .option("--formatted", "Return the card number with spaces every 4 digits.")
  .option(
    "--expiry-years-ahead <number>",
    "Maximum number of years ahead for generated expiry.",
    parsePositiveInteger
  )
  .action(
    (options: {
      brand?: CreditCardBrand;
      formatted?: boolean;
      expiryYearsAhead?: number;
    }) => {
      printValue(generateCreditCard(options));
    }
  );

creditCard
  .command("validate")
  .description("Validate card number, expiry and CVV.")
  .requiredOption("--number <value>", "Card number to validate.")
  .option("--expiry <value>", "Expiry in MM/YY format.")
  .option("--expiry-month <value>", "Expiry month.")
  .option("--expiry-year <value>", "Expiry year.")
  .requiredOption("--cvv <value>", "CVV to validate.")
  .action(
    (options: {
      number: string;
      expiry?: string;
      expiryMonth?: string;
      expiryYear?: string;
      cvv: string;
    }) => {
      printValue(validateCreditCard(options));
    }
  );

creditCard
  .command("detect")
  .argument("<number>", "Card number to inspect.")
  .description("Detect the card brand from a card number.")
  .action((number: string) => {
    printValue(detectCreditCardBrand(number));
  });

const randomNumber = program
  .command("random-number")
  .alias("rand")
  .description(
    "Generate random integers, floats, picks, shuffles, dice rolls and coin flips."
  )
  .addHelpText(
    "after",
    `
Examples:
  brutils random-number int --min 1 --max 100 --count 5 --sorted
  brutils random-number float --min 0 --max 1 --count 3 --precision 4
  brutils random-number pick --items "red,blue,green" --count 2 --unique
  brutils random-number shuffle --file ./items.txt
  brutils random-number dice --faces 20 --count 2
  brutils random-number coin --seed 42
`
  );

randomNumber
  .command("int")
  .alias("generate")
  .description("Generate random integers within a range.")
  .option("--min <number>", "Minimum integer value.", parseInteger)
  .option("--max <number>", "Maximum integer value.", parseInteger)
  .option(
    "--count <number>",
    "How many values to generate.",
    parsePositiveInteger,
    1
  )
  .option("--unique", "Avoid duplicates when generating multiple values.")
  .option("--sorted", "Sort the generated values in ascending order.")
  .option(
    "--seed <number>",
    "Seed used for deterministic output.",
    parseInteger
  )
  .option(
    "--format <mode>",
    "Output mode: plain, json or csv.",
    parseRandomFormat,
    "plain"
  )
  .action(
    (options: {
      min?: number;
      max?: number;
      count: number;
      unique?: boolean;
      sorted?: boolean;
      seed?: number;
      format: RandomOutputFormat;
    }) => {
      const values = generateRandomIntegers(options);
      printRandomValues(values, options.format);
    }
  );

randomNumber
  .command("float")
  .description("Generate random floating-point numbers within a range.")
  .option("--min <number>", "Minimum numeric value.", parseNumber)
  .option("--max <number>", "Maximum numeric value.", parseNumber)
  .option(
    "--count <number>",
    "How many values to generate.",
    parsePositiveInteger,
    1
  )
  .option("--sorted", "Sort the generated values in ascending order.")
  .option(
    "--precision <number>",
    "Number of decimal places to preserve.",
    parsePositiveInteger
  )
  .option(
    "--seed <number>",
    "Seed used for deterministic output.",
    parseInteger
  )
  .option(
    "--format <mode>",
    "Output mode: plain, json or csv.",
    parseRandomFormat,
    "plain"
  )
  .action(
    (options: {
      min?: number;
      max?: number;
      count: number;
      sorted?: boolean;
      precision?: number;
      seed?: number;
      format: RandomOutputFormat;
    }) => {
      const values = generateRandomFloats(options);
      printRandomValues(values, options.format);
    }
  );

randomNumber
  .command("pick")
  .description("Pick one or more items from a list.")
  .option("--items <csv>", "Comma-separated items to pick from.")
  .option("--file <path>", "Read source items from a text file (one per line).")
  .option(
    "--count <number>",
    "How many items to pick.",
    parsePositiveInteger,
    1
  )
  .option("--unique", "Avoid duplicate picks when possible.")
  .option(
    "--seed <number>",
    "Seed used for deterministic output.",
    parseInteger
  )
  .option(
    "--format <mode>",
    "Output mode: plain, json or csv.",
    parseRandomFormat,
    "plain"
  )
  .action(
    (options: {
      items?: string;
      file?: string;
      count: number;
      unique?: boolean;
      seed?: number;
      format: RandomOutputFormat;
    }) => {
      const values = pickRandomItems({
        items: readItems(options.items, options.file),
        count: options.count,
        ...(options.unique !== undefined ? { unique: options.unique } : {}),
        ...(options.seed !== undefined ? { seed: options.seed } : {})
      });

      printRandomValues(values, options.format);
    }
  );

randomNumber
  .command("shuffle")
  .description("Shuffle a list of items.")
  .option("--items <csv>", "Comma-separated items to shuffle.")
  .option("--file <path>", "Read source items from a text file (one per line).")
  .option(
    "--seed <number>",
    "Seed used for deterministic output.",
    parseInteger
  )
  .option(
    "--format <mode>",
    "Output mode: plain, json or csv.",
    parseRandomFormat,
    "plain"
  )
  .action(
    (options: {
      items?: string;
      file?: string;
      seed?: number;
      format: RandomOutputFormat;
    }) => {
      const values = shuffleRandomItems({
        items: readItems(options.items, options.file),
        ...(options.seed !== undefined ? { seed: options.seed } : {})
      });

      printRandomValues(values, options.format);
    }
  );

randomNumber
  .command("dice")
  .description("Roll one or more dice.")
  .option(
    "--faces <number>",
    "Number of faces on the die.",
    parsePositiveInteger,
    6
  )
  .option(
    "--count <number>",
    "How many rolls to generate.",
    parsePositiveInteger,
    1
  )
  .option(
    "--seed <number>",
    "Seed used for deterministic output.",
    parseInteger
  )
  .option(
    "--format <mode>",
    "Output mode: plain, json or csv.",
    parseRandomFormat,
    "plain"
  )
  .action(
    (options: {
      faces: number;
      count: number;
      seed?: number;
      format: RandomOutputFormat;
    }) => {
      const values = rollDice(options);
      printRandomValues(values, options.format);
    }
  );

randomNumber
  .command("coin")
  .description("Flip a coin once.")
  .option(
    "--seed <number>",
    "Seed used for deterministic output.",
    parseInteger
  )
  .action((options: { seed?: number }) => {
    printValue(flipCoin(options));
  });

const numberPicker = program
  .command("number-picker")
  .alias("pick-number")
  .description("Pick a single random integer within a range.")
  .addHelpText(
    "after",
    `
Examples:
  brutils number-picker run --min 1 --max 10
  brutils number-picker run --min 100 --max 999 --seed 42
`
  );

numberPicker
  .command("run")
  .description("Pick one random integer.")
  .option("--min <number>", "Minimum integer value.", parseInteger)
  .option("--max <number>", "Maximum integer value.", parseInteger)
  .option(
    "--seed <number>",
    "Seed used for deterministic output.",
    parseInteger
  )
  .action((options: { min?: number; max?: number; seed?: number }) => {
    printValue(pickRandomNumber(options));
  });

const zip = program
  .command("zip")
  .description("Create zip archives and inspect them.")
  .addHelpText(
    "after",
    `
Examples:
  brutils zip create ./folder
  brutils zip create ./folder ./backup.zip
  brutils zip create ./folder --out ./backup.zip --force
  brutils zip create ./folder --contents-only --exclude node_modules --exclude dist
  brutils zip list ./backup.zip --match "**/*.txt"
  brutils zip test ./backup.zip
`
  );

zip
  .command("create")
  .alias("run")
  .argument("<source>", "File or folder to archive.")
  .argument("[out]", "Optional output .zip file path.")
  .description("Create a zip archive from a source path.")
  .option("-o, --out <path>", "Explicit output file path.")
  .option(
    "-l, --level <number>",
    "Compression level from 0 to 9.",
    parseInteger
  )
  .option(
    "-x, --exclude <glob...>",
    "Glob patterns to exclude when zipping folder contents."
  )
  .option(
    "--contents-only",
    "Zip only the folder contents instead of the folder root."
  )
  .option("-f, --force", "Overwrite output if it already exists.")
  .option("--dry-run", "Print the execution plan without writing the archive.")
  .option("-v, --verbose", "Show verbose archive creation logs.")
  .option("-q, --quiet", "Suppress non-error output.")
  .option("--follow-symlinks", "Follow symbolic links while collecting inputs.")
  .option("--store", "Store files without compression.")
  .action(
    async (
      source: string,
      out: string | undefined,
      options: {
        out?: string;
        level?: number;
        exclude?: string[];
        contentsOnly?: boolean;
        force?: boolean;
        dryRun?: boolean;
        verbose?: boolean;
        quiet?: boolean;
        followSymlinks?: boolean;
        store?: boolean;
      }
    ) => {
      const plan = await createZip(source, out, options);

      if (!options.quiet) {
        printValue(plan);
      }
    }
  );

zip
  .command("list")
  .argument("<source>", "Existing .zip file to inspect.")
  .description("List archive contents without extracting.")
  .option("--match <pattern>", "Filter which archive entries are included.")
  .option("-q, --quiet", "Suppress non-error output.")
  .action(
    async (source: string, options: { match?: string; quiet?: boolean }) => {
      const result = await listZip(source, options.match);

      if (!options.quiet) {
        printValue(result);
      }
    }
  );

zip
  .command("test")
  .argument("<source>", "Existing .zip file to validate.")
  .description("Test archive readability without extracting files.")
  .option("--match <pattern>", "Filter which archive entries are included.")
  .option("-q, --quiet", "Suppress non-error output.")
  .action(
    async (source: string, options: { match?: string; quiet?: boolean }) => {
      const result = await testZip(source, options.match);

      if (!options.quiet) {
        printValue(result);
      }
    }
  );

const unzip = program
  .command("unzip")
  .description("Extract zip archives and inspect them.")
  .addHelpText(
    "after",
    `
Examples:
  brutils unzip extract ./backup.zip
  brutils unzip extract ./backup.zip ./output
  brutils unzip extract ./backup.zip --out ./output --force
  brutils unzip extract ./backup.zip --flat --match "**/*.txt"
  brutils unzip list ./backup.zip
  brutils unzip test ./backup.zip
`
  );

unzip
  .command("extract")
  .alias("run")
  .argument("<source>", "Existing .zip file to extract.")
  .argument("[out]", "Optional destination directory.")
  .description("Extract a zip archive.")
  .option("-o, --out <path>", "Explicit output directory.")
  .option("-f, --force", "Overwrite the target directory if it already exists.")
  .option("--dry-run", "Print the extraction plan without writing files.")
  .option("-v, --verbose", "Show verbose extraction logs.")
  .option("-q, --quiet", "Suppress non-error output.")
  .option("--flat", "Extract files without preserving nested folders.")
  .option("--match <pattern>", "Filter which archive entries are extracted.")
  .action(
    async (
      source: string,
      out: string | undefined,
      options: {
        out?: string;
        force?: boolean;
        dryRun?: boolean;
        verbose?: boolean;
        quiet?: boolean;
        flat?: boolean;
        match?: string;
      }
    ) => {
      const plan = await extractZipFile(source, out, options);

      if (!options.quiet) {
        printValue(plan);
      }
    }
  );

unzip
  .command("list")
  .argument("<source>", "Existing .zip file to inspect.")
  .description("List archive contents without extracting.")
  .option("--match <pattern>", "Filter which archive entries are included.")
  .option("-q, --quiet", "Suppress non-error output.")
  .action(
    async (source: string, options: { match?: string; quiet?: boolean }) => {
      const result = await listUnzip(source, options.match);

      if (!options.quiet) {
        printValue(result);
      }
    }
  );

unzip
  .command("test")
  .argument("<source>", "Existing .zip file to validate.")
  .description("Test archive readability without extracting files.")
  .option("--match <pattern>", "Filter which archive entries are included.")
  .option("-q, --quiet", "Suppress non-error output.")
  .action(
    async (source: string, options: { match?: string; quiet?: boolean }) => {
      const result = await testUnzip(source, options.match);

      if (!options.quiet) {
        printValue(result);
      }
    }
  );

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
