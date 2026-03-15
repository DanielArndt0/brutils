export type FixedHashAlgorithm = "md5" | "sha1" | "sha256" | "sha512";

export interface HashSourceOptions {
  text?: string;
  file?: string;
}

export interface HmacOptions extends HashSourceOptions {
  algo: string;
  key: string;
}

export interface ChecksumOptions {
  file: string;
  algo?: string;
}

export interface CompareHashOptions extends HashSourceOptions {
  algo?: string;
  expected: string;
}

export interface CompareHashResult {
  algorithm: string;
  actual: string;
  expected: string;
  matches: boolean;
  source: "text" | "file";
}
