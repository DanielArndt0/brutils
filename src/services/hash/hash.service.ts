import crypto from "node:crypto";
import fs from "node:fs";

import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type {
  ChecksumOptions,
  CompareHashOptions,
  CompareHashResult,
  FixedHashAlgorithm,
  HashSourceOptions,
  HmacOptions
} from "./hash.types.js";

interface ResolvedHashSource {
  kind: "text" | "file";
  content: Buffer;
}

function resolveHashSource(options: HashSourceOptions): ResolvedHashSource {
  if (options.text !== undefined && options.file !== undefined) {
    throw new BRUtilsError("Use either --text or --file, not both.");
  }

  if (options.text !== undefined) {
    return {
      kind: "text",
      content: Buffer.from(options.text, "utf-8")
    };
  }

  if (options.file !== undefined) {
    if (!fs.existsSync(options.file) || !fs.statSync(options.file).isFile()) {
      throw new BRUtilsError(`File does not exist: ${options.file}`);
    }

    return {
      kind: "file",
      content: fs.readFileSync(options.file)
    };
  }

  throw new BRUtilsError("One of --text or --file is required.");
}

function normalizeAlgorithm(value: string): string {
  const algorithm = value.toLowerCase();

  if (!crypto.getHashes().includes(algorithm)) {
    throw new BRUtilsError(`Unsupported hash algorithm: ${value}`);
  }

  return algorithm;
}

function digestBuffer(buffer: Buffer, algorithm: string): string {
  return crypto
    .createHash(normalizeAlgorithm(algorithm))
    .update(buffer)
    .digest("hex");
}

function normalizeExpectedHash(value: string): string {
  return value.trim().toLowerCase();
}

export function computeHash(
  options: HashSourceOptions,
  algorithm: string
): string {
  const source = resolveHashSource(options);
  return digestBuffer(source.content, algorithm);
}

export function computeMd5(options: HashSourceOptions): string {
  return computeHash(options, "md5");
}

export function computeSha1(options: HashSourceOptions): string {
  return computeHash(options, "sha1");
}

export function computeSha256(options: HashSourceOptions): string {
  return computeHash(options, "sha256");
}

export function computeSha512(options: HashSourceOptions): string {
  return computeHash(options, "sha512");
}

export function computeHmac(options: HmacOptions): string {
  const source = resolveHashSource(options);

  return crypto
    .createHmac(normalizeAlgorithm(options.algo), options.key)
    .update(source.content)
    .digest("hex");
}

export function computeChecksum(options: ChecksumOptions): string {
  return computeHash({ file: options.file }, options.algo ?? "sha256");
}

export function compareHash(options: CompareHashOptions): CompareHashResult {
  const source = resolveHashSource(options);
  const algorithm = normalizeAlgorithm(options.algo ?? "sha256");
  const actual = digestBuffer(source.content, algorithm);
  const expected = normalizeExpectedHash(options.expected);

  return {
    algorithm,
    actual,
    expected,
    matches: actual === expected,
    source: source.kind
  };
}

export const FIXED_HASH_ALGORITHMS: FixedHashAlgorithm[] = [
  "md5",
  "sha1",
  "sha256",
  "sha512"
];
