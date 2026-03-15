import { BRUtilsError } from "../../core/errors/brutils.error.js";
import type {
  DateAdjustOptions,
  DateDiffResult,
  DateDiffUnit,
  DateSnapshot,
  ParsedDateResult,
  TimeZoneConversionResult,
  UnixConversionResult
} from "./date.types.js";

const DATE_DIFF_FACTORS: Record<DateDiffUnit, number> = {
  seconds: 1000,
  minutes: 60 * 1000,
  hours: 60 * 60 * 1000,
  days: 24 * 60 * 60 * 1000
};

function ensureValidDate(date: Date, input: string): void {
  if (Number.isNaN(date.getTime())) {
    throw new BRUtilsError(`Invalid date value: ${input}`);
  }
}

function parseDate(input: string): Date {
  const date = new Date(input);
  ensureValidDate(date, input);
  return date;
}

function ensureValidInteger(value: number | undefined, label: string): number {
  const resolved = value ?? 0;

  if (!Number.isInteger(resolved)) {
    throw new BRUtilsError(`${label} must be an integer.`);
  }

  return resolved;
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function snapshot(date: Date): DateSnapshot {
  const unixMs = date.getTime();

  return {
    iso: date.toISOString(),
    unix: Math.floor(unixMs / 1000),
    unixMs
  };
}

function formatUtcDate(date: Date, pattern: string): string {
  const replacements: Record<string, string> = {
    YYYY: String(date.getUTCFullYear()),
    MM: pad2(date.getUTCMonth() + 1),
    DD: pad2(date.getUTCDate()),
    HH: pad2(date.getUTCHours()),
    mm: pad2(date.getUTCMinutes()),
    ss: pad2(date.getUTCSeconds())
  };

  return pattern.replace(
    /YYYY|MM|DD|HH|mm|ss/g,
    (token) => replacements[token]!
  );
}

function adjustDate(
  date: Date,
  options: DateAdjustOptions,
  multiplier: 1 | -1
): Date {
  const days = ensureValidInteger(options.days, "Days");
  const hours = ensureValidInteger(options.hours, "Hours");
  const minutes = ensureValidInteger(options.minutes, "Minutes");
  const seconds = ensureValidInteger(options.seconds, "Seconds");

  const totalMs =
    days * DATE_DIFF_FACTORS.days +
    hours * DATE_DIFF_FACTORS.hours +
    minutes * DATE_DIFF_FACTORS.minutes +
    seconds * DATE_DIFF_FACTORS.seconds;

  return new Date(date.getTime() + multiplier * totalMs);
}

function ensureTimeZone(value: string): string {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value }).format(new Date());
    return value;
  } catch {
    throw new BRUtilsError(`Invalid time zone: ${value}`);
  }
}

function timeZoneParts(date: Date, timeZone: string): Record<string, string> {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  return formatter
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      if (part.type !== "literal") {
        acc[part.type] = part.value;
      }

      return acc;
    }, {});
}

export function currentDateTime(): DateSnapshot {
  return snapshot(new Date());
}

export function formatDateValue(value: string, pattern: string): string {
  return formatUtcDate(parseDate(value), pattern);
}

export function parseDateValue(value: string): ParsedDateResult {
  return {
    input: value,
    ...snapshot(parseDate(value))
  };
}

export function addToDate(value: string, options: DateAdjustOptions): string {
  return adjustDate(parseDate(value), options, 1).toISOString();
}

export function subtractFromDate(
  value: string,
  options: DateAdjustOptions
): string {
  return adjustDate(parseDate(value), options, -1).toISOString();
}

export function diffDates(
  from: string,
  to: string,
  unit: DateDiffUnit = "seconds"
): DateDiffResult {
  const left = parseDate(from);
  const right = parseDate(to);
  const factor = DATE_DIFF_FACTORS[unit];
  const raw = (right.getTime() - left.getTime()) / factor;

  return {
    from,
    to,
    unit,
    value: Number(raw.toFixed(6))
  };
}

export function convertDateToUnix(value: string): UnixConversionResult {
  return {
    input: value,
    sourceUnit: "milliseconds",
    ...snapshot(parseDate(value))
  };
}

export function convertUnixValue(value: string | number): UnixConversionResult {
  const normalized = String(value).trim();

  if (!/^-?\d+$/.test(normalized)) {
    throw new BRUtilsError(`Invalid Unix timestamp value: ${value}`);
  }

  const numeric = Number(normalized);
  const sourceUnit =
    Math.abs(numeric) >= 1_000_000_000_000 ? "milliseconds" : "seconds";
  const unixMs = sourceUnit === "seconds" ? numeric * 1000 : numeric;
  const date = new Date(unixMs);

  ensureValidDate(date, normalized);

  return {
    input: value,
    sourceUnit,
    ...snapshot(date)
  };
}

export function convertDateToTimeZone(
  value: string,
  timeZone: string
): TimeZoneConversionResult {
  const date = parseDate(value);
  const normalizedTimeZone = ensureTimeZone(timeZone);
  const parts = timeZoneParts(date, normalizedTimeZone);

  return {
    input: value,
    timeZone: normalizedTimeZone,
    formatted: `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`,
    iso: date.toISOString()
  };
}

export const DATE_DIFF_UNITS: DateDiffUnit[] = [
  "seconds",
  "minutes",
  "hours",
  "days"
];
