export type CharsetName =
  | "alnum"
  | "alpha"
  | "numeric"
  | "hex"
  | "base64url"
  | "lower"
  | "upper";

export interface UuidGenerateOptions {
  count?: number;
}

export interface TokenGenerateOptions {
  count?: number;
  length?: number;
  charset?: CharsetName;
}

export interface PasswordGenerateOptions {
  count?: number;
  length?: number;
  charset?: CharsetName;
  noSymbols?: boolean;
  noNumbers?: boolean;
  uppercase?: boolean;
}
