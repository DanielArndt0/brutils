# Number Picker

> Official interface: use the `brutils` CLI commands shown below.

## Overview

The number picker is a focused helper that returns exactly one integer in a range, with optional seeded deterministic output.

## CLI Commands

```bash
brutils number-picker run --min 1 --max 10
brutils number-picker run --min 100 --max 999 --seed 42
```

## Flags

| Flag              | Type    | Description                |
| ----------------- | ------- | -------------------------- |
| `--min <number>`  | integer | Minimum integer value.     |
| `--max <number>`  | integer | Maximum integer value.     |
| `--seed <number>` | integer | Make output deterministic. |

## Notes

- `brutils pick-number run ...` is supported as an alias.
- Use `brutils number-picker run --help` for inline help.
