import crypto from "node:crypto";

import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type {
  CharsetName,
  PasswordGenerateOptions,
  TokenGenerateOptions,
  UuidGenerateOptions
} from "./id.types.js";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?/|~";

const CHARSET_MAP: Record<CharsetName, string> = {
  alnum: `${LOWERCASE}${UPPERCASE}${DIGITS}`,
  alpha: `${LOWERCASE}${UPPERCASE}`,
  numeric: DIGITS,
  hex: "0123456789abcdef",
  base64url: `${LOWERCASE}${UPPERCASE}${DIGITS}-_`,
  lower: LOWERCASE,
  upper: UPPERCASE
};

function ensurePositiveInteger(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 1) {
    throw new BRUtilsError(`${label} must be a positive integer.`);
  }
}

function resolveCount(count?: number): number {
  const resolved = count ?? 1;
  ensurePositiveInteger(resolved, "Count");
  return resolved;
}

function resolveLength(length: number | undefined, fallback: number): number {
  const resolved = length ?? fallback;
  ensurePositiveInteger(resolved, "Length");
  return resolved;
}

function charsetByName(name: CharsetName): string {
  return CHARSET_MAP[name];
}

function randomCharacter(charset: string): string {
  return charset[crypto.randomInt(0, charset.length)]!;
}

function randomString(length: number, charset: string): string {
  return Array.from({ length }, () => randomCharacter(charset)).join("");
}

function ensureNotEmptyCharset(charset: string): void {
  if (charset.length === 0) {
    throw new BRUtilsError(
      "The selected options produced an empty character set."
    );
  }
}

function ensureUppercasePresence(value: string): string {
  if (/[A-Z]/.test(value)) {
    return value;
  }

  const index = crypto.randomInt(0, value.length);
  const replacement = randomCharacter(UPPERCASE);

  return `${value.slice(0, index)}${replacement}${value.slice(index + 1)}`;
}

function resolveTokenCharset(charset?: CharsetName): string {
  return charsetByName(charset ?? "alnum");
}

function resolvePasswordCharset(options: PasswordGenerateOptions): string {
  let charset = options.charset
    ? charsetByName(options.charset)
    : `${LOWERCASE}${UPPERCASE}${DIGITS}${SYMBOLS}`;

  if (options.noNumbers) {
    charset = charset.replace(/[0-9]/g, "");
  }

  if (options.noSymbols) {
    charset = charset.replace(/[!@#$%^&*()_=+[\]{};:,.?/|~-]/g, "");
  }

  if (options.uppercase && !/[A-Z]/.test(charset)) {
    charset += UPPERCASE;
  }

  ensureNotEmptyCharset(charset);
  return charset;
}

export function generateUuidValues(
  options: UuidGenerateOptions = {}
): string[] {
  const count = resolveCount(options.count);
  return Array.from({ length: count }, () => crypto.randomUUID());
}

export function generateTokenValues(
  options: TokenGenerateOptions = {}
): string[] {
  const count = resolveCount(options.count);
  const length = resolveLength(options.length, 32);
  const charset = resolveTokenCharset(options.charset);

  return Array.from({ length: count }, () => randomString(length, charset));
}

export function generatePasswordValues(
  options: PasswordGenerateOptions = {}
): string[] {
  const count = resolveCount(options.count);
  const length = resolveLength(options.length, 16);
  const charset = resolvePasswordCharset(options);

  return Array.from({ length: count }, () => {
    let password = randomString(length, charset);

    if (options.uppercase) {
      password = ensureUppercasePresence(password);
    }

    return password;
  });
}

export const CHARSET_NAMES: CharsetName[] = [
  "alnum",
  "alpha",
  "numeric",
  "hex",
  "base64url",
  "lower",
  "upper"
];
