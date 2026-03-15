import type { Command } from "commander";

import {
  addToDate,
  convertDateToTimeZone,
  convertDateToUnix,
  convertUnixValue,
  currentDateTime,
  diffDates,
  formatDateValue,
  parseDateValue,
  subtractFromDate,
  type DateDiffUnit
} from "../../services/date/index.js";
import {
  computeChecksum,
  compareHash,
  computeHmac,
  computeMd5,
  computeSha1,
  computeSha256,
  computeSha512
} from "../../services/hash/index.js";
import {
  generatePasswordValues,
  generateTokenValues,
  generateUuidValues,
  type CharsetName
} from "../../services/id/index.js";
import { examples } from "../shared/help.js";
import {
  parseCharsetName,
  parseDateDiffUnit,
  parsePositiveInteger
} from "../shared/parsers.js";
import { printValue } from "../ui/output.js";

function printStringBatch(values: string[]): void {
  if (values.length === 1) {
    printValue(values[0]!);
    return;
  }

  printValue(values);
}

export function registerHelperCommands(program: Command): void {
  const hash = program
    .command("hash")
    .description("Digest helpers for text, files and HMAC operations.")
    .addHelpText(
      "after",
      examples([
        "brutils hash md5 --text hello",
        "brutils hash sha256 --file ./README.md",
        "brutils hash hmac --algo sha256 --key secret --text hello",
        "brutils hash checksum --file ./dist/cli.js --algo sha512",
        "brutils hash compare --file ./README.md --algo sha256 --expected <hash>"
      ])
    );

  hash
    .command("md5")
    .description("Compute an MD5 digest for text or a file.")
    .option("--text <value>", "Inline value to hash.")
    .option("--file <path>", "File to hash.")
    .action((options: { text?: string; file?: string }) => {
      printValue(computeMd5(options));
    });

  hash
    .command("sha1")
    .description("Compute a SHA-1 digest for text or a file.")
    .option("--text <value>", "Inline value to hash.")
    .option("--file <path>", "File to hash.")
    .action((options: { text?: string; file?: string }) => {
      printValue(computeSha1(options));
    });

  hash
    .command("sha256")
    .description("Compute a SHA-256 digest for text or a file.")
    .option("--text <value>", "Inline value to hash.")
    .option("--file <path>", "File to hash.")
    .action((options: { text?: string; file?: string }) => {
      printValue(computeSha256(options));
    });

  hash
    .command("sha512")
    .description("Compute a SHA-512 digest for text or a file.")
    .option("--text <value>", "Inline value to hash.")
    .option("--file <path>", "File to hash.")
    .action((options: { text?: string; file?: string }) => {
      printValue(computeSha512(options));
    });

  hash
    .command("hmac")
    .description("Compute an HMAC with a chosen algorithm.")
    .requiredOption("--key <value>", "Secret key for the HMAC.")
    .option("--algo <name>", "Hash algorithm to use.", "sha256")
    .option("--text <value>", "Inline value to hash.")
    .option("--file <path>", "File to hash.")
    .action(
      (options: {
        key: string;
        algo: string;
        text?: string;
        file?: string;
      }) => {
        printValue(computeHmac(options));
      }
    );

  hash
    .command("checksum")
    .description("Compute a digest for a file.")
    .requiredOption("--file <path>", "File to hash.")
    .option("--algo <name>", "Hash algorithm to use.", "sha256")
    .action((options: { file: string; algo?: string }) => {
      printValue(computeChecksum(options));
    });

  hash
    .command("compare")
    .description("Compare a computed hash against an expected value.")
    .requiredOption("--expected <hash>", "Expected hash value.")
    .option("--algo <name>", "Hash algorithm to use.", "sha256")
    .option("--text <value>", "Inline value to hash.")
    .option("--file <path>", "File to hash.")
    .action(
      (options: {
        expected: string;
        algo?: string;
        text?: string;
        file?: string;
      }) => {
        printValue(compareHash(options));
      }
    );

  const id = program
    .command("id")
    .description("UUID, token and password generation helpers.")
    .addHelpText(
      "after",
      examples([
        "brutils id uuid",
        "brutils id uuid --count 3",
        "brutils id token --length 24 --charset base64url",
        "brutils id password --length 20 --uppercase",
        "brutils id password --length 16 --no-symbols --no-numbers"
      ])
    );

  id.command("uuid")
    .description("Generate UUID values.")
    .option(
      "--count <number>",
      "How many UUIDs to generate.",
      parsePositiveInteger,
      1
    )
    .action((options: { count: number }) => {
      printStringBatch(generateUuidValues(options));
    });

  id.command("token")
    .description("Generate random tokens.")
    .option(
      "--count <number>",
      "How many tokens to generate.",
      parsePositiveInteger,
      1
    )
    .option("--length <number>", "Desired token length.", parsePositiveInteger)
    .option(
      "--charset <name>",
      "Allowed character preset: alnum, alpha, numeric, hex, base64url, lower or upper.",
      parseCharsetName
    )
    .action(
      (options: { count: number; length?: number; charset?: CharsetName }) => {
        printStringBatch(generateTokenValues(options));
      }
    );

  id.command("password")
    .description("Generate strong passwords.")
    .option(
      "--count <number>",
      "How many passwords to generate.",
      parsePositiveInteger,
      1
    )
    .option(
      "--length <number>",
      "Desired password length.",
      parsePositiveInteger
    )
    .option(
      "--charset <name>",
      "Allowed character preset: alnum, alpha, numeric, hex, base64url, lower or upper.",
      parseCharsetName
    )
    .option("--no-symbols", "Exclude symbols from generated passwords.")
    .option("--no-numbers", "Exclude digits from generated passwords.")
    .option("--uppercase", "Ensure at least one uppercase letter.")
    .action(
      (options: {
        count: number;
        length?: number;
        charset?: CharsetName;
        noSymbols?: boolean;
        noNumbers?: boolean;
        uppercase?: boolean;
      }) => {
        printStringBatch(generatePasswordValues(options));
      }
    );

  const date = program
    .command("date")
    .description("Date formatting, arithmetic and timezone helpers.")
    .addHelpText(
      "after",
      examples([
        "brutils date now",
        'brutils date format --date 2024-01-02T03:04:05Z --pattern "YYYY-MM-DD HH:mm:ss"',
        "brutils date add --date 2024-01-01T00:00:00Z --days 7",
        "brutils date diff --from 2024-01-01T00:00:00Z --to 2024-01-03T00:00:00Z --unit days",
        "brutils date unix --date 2024-01-01T00:00:00Z",
        "brutils date tz --from 2024-01-01T12:00:00Z --to America/Sao_Paulo"
      ])
    );

  date
    .command("now")
    .description("Print the current date and time.")
    .action(() => {
      printValue(currentDateTime());
    });

  date
    .command("format")
    .description("Format a date using a token pattern.")
    .requiredOption("--date <value>", "Input date/time value.")
    .requiredOption("--pattern <value>", "Formatting pattern.")
    .action((options: { date: string; pattern: string }) => {
      printValue(formatDateValue(options.date, options.pattern));
    });

  date
    .command("parse")
    .description("Parse a date string and return normalized metadata.")
    .requiredOption("--date <value>", "Input date/time value.")
    .action((options: { date: string }) => {
      printValue(parseDateValue(options.date));
    });

  date
    .command("add")
    .description("Add time to a date.")
    .requiredOption("--date <value>", "Input date/time value.")
    .option("--days <number>", "Day delta.", parsePositiveInteger)
    .option("--hours <number>", "Hour delta.", parsePositiveInteger)
    .option("--minutes <number>", "Minute delta.", parsePositiveInteger)
    .option("--seconds <number>", "Second delta.", parsePositiveInteger)
    .action(
      (options: {
        date: string;
        days?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
      }) => {
        printValue(addToDate(options.date, options));
      }
    );

  date
    .command("sub")
    .description("Subtract time from a date.")
    .requiredOption("--date <value>", "Input date/time value.")
    .option("--days <number>", "Day delta.", parsePositiveInteger)
    .option("--hours <number>", "Hour delta.", parsePositiveInteger)
    .option("--minutes <number>", "Minute delta.", parsePositiveInteger)
    .option("--seconds <number>", "Second delta.", parsePositiveInteger)
    .action(
      (options: {
        date: string;
        days?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
      }) => {
        printValue(subtractFromDate(options.date, options));
      }
    );

  date
    .command("diff")
    .description("Calculate the difference between two dates.")
    .requiredOption("--from <value>", "Source date/time value.")
    .requiredOption("--to <value>", "Target date/time value.")
    .option(
      "--unit <name>",
      "Output unit: seconds, minutes, hours or days.",
      parseDateDiffUnit,
      "seconds"
    )
    .action((options: { from: string; to: string; unit: DateDiffUnit }) => {
      printValue(diffDates(options.from, options.to, options.unit));
    });

  date
    .command("unix")
    .argument("[value]", "Unix seconds or milliseconds to convert to ISO.")
    .description("Convert to or from Unix timestamps.")
    .option("--date <value>", "Date/time value to convert to Unix.")
    .action((value: string | undefined, options: { date?: string }) => {
      if (options.date !== undefined) {
        printValue(convertDateToUnix(options.date));
        return;
      }

      if (value === undefined) {
        throw new Error("Provide either a positional unix value or --date.");
      }

      printValue(convertUnixValue(value));
    });

  date
    .command("tz")
    .description("Convert a date/time to a target time zone representation.")
    .requiredOption("--from <value>", "Source date/time value.")
    .requiredOption(
      "--to <value>",
      "Target IANA time zone, such as America/Sao_Paulo."
    )
    .action((options: { from: string; to: string }) => {
      printValue(convertDateToTimeZone(options.from, options.to));
    });
}
