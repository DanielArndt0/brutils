# DATE

> Official interface: use the `brutils` CLI commands shown below.

## Overview

The `date` module provides quick helpers for formatting, parsing, arithmetic, unix conversion and time zone rendering.

## CLI Commands

```bash
brutils date now
brutils date format --date 2024-01-02T03:04:05Z --pattern "YYYY-MM-DD HH:mm:ss"
brutils date parse --date 2024-01-02T03:04:05Z
brutils date add --date 2024-01-01T00:00:00Z --days 7
brutils date sub --date 2024-01-01T00:00:00Z --hours 2
brutils date diff --from 2024-01-01T00:00:00Z --to 2024-01-03T00:00:00Z --unit days
brutils date unix --date 2024-01-01T00:00:00Z
brutils date unix 1704067200
brutils date tz --from 2024-01-01T12:00:00Z --to America/Sao_Paulo
```

## Actions

| Action   | Usage                                                                                        | Description                                         |
| -------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `now`    | `brutils date now`                                                                           | Print the current date/time snapshot.               |
| `format` | `brutils date format --date <value> --pattern <value>`                                       | Format a date using a token pattern.                |
| `parse`  | `brutils date parse --date <value>`                                                          | Parse a date string and return normalized metadata. |
| `add`    | `brutils date add --date <value> [--days <n>] [--hours <n>] [--minutes <n>] [--seconds <n>]` | Add time to a date.                                 |
| `sub`    | `brutils date sub --date <value> [--days <n>] [--hours <n>] [--minutes <n>] [--seconds <n>]` | Subtract time from a date.                          |
| `diff`   | `brutils date diff --from <value> --to <value> [--unit <name>]`                              | Calculate the difference between two dates.         |
| `unix`   | `brutils date unix [value] [--date <value>]`                                                 | Convert to or from Unix timestamps.                 |
| `tz`     | `brutils date tz --from <value> --to <value>`                                                | Render a date/time in a target IANA time zone.      |

## Flags

| Flag                | Applies to   | Type    | Description                                         |
| ------------------- | ------------ | ------- | --------------------------------------------------- |
| `--date <value>`    | most actions | string  | Input date/time.                                    |
| `--from <value>`    | `diff`, `tz` | string  | Source date/time.                                   |
| `--to <value>`      | `diff`, `tz` | string  | Target date/time or target time zone.               |
| `--days <n>`        | `add`, `sub` | integer | Day delta.                                          |
| `--hours <n>`       | `add`, `sub` | integer | Hour delta.                                         |
| `--minutes <n>`     | `add`, `sub` | integer | Minute delta.                                       |
| `--seconds <n>`     | `add`, `sub` | integer | Second delta.                                       |
| `--pattern <value>` | `format`     | string  | Formatting pattern.                                 |
| `--unit <name>`     | `diff`       | string  | Output unit: `seconds`, `minutes`, `hours`, `days`. |

## Notes

- `format` currently supports `YYYY`, `MM`, `DD`, `HH`, `mm` and `ss` tokens.
- `unix` accepts either a positional Unix value or `--date` for date-to-unix conversion.
