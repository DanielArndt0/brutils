export type DateDiffUnit = "seconds" | "minutes" | "hours" | "days";

export interface DateAdjustOptions {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface DateSnapshot {
  iso: string;
  unix: number;
  unixMs: number;
}

export interface ParsedDateResult extends DateSnapshot {
  input: string;
}

export interface DateDiffResult {
  from: string;
  to: string;
  unit: DateDiffUnit;
  value: number;
}

export interface UnixConversionResult extends DateSnapshot {
  input: string | number;
  sourceUnit: "seconds" | "milliseconds";
}

export interface TimeZoneConversionResult {
  input: string;
  timeZone: string;
  formatted: string;
  iso: string;
}
