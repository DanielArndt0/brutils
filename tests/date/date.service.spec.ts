import { describe, expect, it } from "vitest";

import {
  addToDate,
  convertDateToTimeZone,
  convertDateToUnix,
  convertUnixValue,
  diffDates,
  formatDateValue,
  parseDateValue,
  subtractFromDate
} from "../../src/services/date/index.js";

describe("date service", () => {
  it("should format and parse date values", () => {
    expect(formatDateValue("2024-01-02T03:04:05Z", "YYYY-MM-DD HH:mm:ss")).toBe(
      "2024-01-02 03:04:05"
    );

    expect(parseDateValue("2024-01-02T03:04:05Z")).toEqual({
      input: "2024-01-02T03:04:05Z",
      iso: "2024-01-02T03:04:05.000Z",
      unix: 1704164645,
      unixMs: 1704164645000
    });
  });

  it("should add and subtract time", () => {
    expect(addToDate("2024-01-01T00:00:00Z", { days: 1 })).toBe(
      "2024-01-02T00:00:00.000Z"
    );
    expect(subtractFromDate("2024-01-01T00:00:00Z", { hours: 2 })).toBe(
      "2023-12-31T22:00:00.000Z"
    );
  });

  it("should diff and convert unix and timezone values", () => {
    expect(
      diffDates("2024-01-01T00:00:00Z", "2024-01-03T00:00:00Z", "days")
    ).toEqual({
      from: "2024-01-01T00:00:00Z",
      to: "2024-01-03T00:00:00Z",
      unit: "days",
      value: 2
    });

    expect(convertDateToUnix("2024-01-01T00:00:00Z")).toEqual({
      input: "2024-01-01T00:00:00Z",
      sourceUnit: "milliseconds",
      iso: "2024-01-01T00:00:00.000Z",
      unix: 1704067200,
      unixMs: 1704067200000
    });

    expect(convertUnixValue(1704067200)).toEqual({
      input: 1704067200,
      sourceUnit: "seconds",
      iso: "2024-01-01T00:00:00.000Z",
      unix: 1704067200,
      unixMs: 1704067200000
    });

    expect(
      convertDateToTimeZone("2024-01-01T12:00:00Z", "America/Sao_Paulo")
    ).toEqual({
      input: "2024-01-01T12:00:00Z",
      timeZone: "America/Sao_Paulo",
      formatted: "2024-01-01 09:00:00",
      iso: "2024-01-01T12:00:00.000Z"
    });
  });
});
