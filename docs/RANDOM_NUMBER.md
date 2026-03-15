# Random Utilities

> Official interface: use the `brutils` CLI commands shown below.

## Overview

The random utilities cover integer generation, float generation, list picking, item shuffling, dice rolling, coin flipping and seeded deterministic output.

## Commands

```bash
brutils random-number int --min 1 --max 100 --count 5 --sorted
brutils random-number float --min 0 --max 1 --count 3 --precision 4
brutils random-number pick --items "red,blue,green" --count 2 --unique
brutils random-number shuffle --file ./items.txt
brutils random-number dice --faces 20 --count 2
brutils random-number coin --seed 42

brutils number-picker run --min 1 --max 60 --seed 42
```

## Actions

| Command                         | Usage                                                                  | Description                      |
| ------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| `brutils random-number int`     | `brutils random-number int [flags]`                                    | Generate integer batches.        |
| `brutils random-number float`   | `brutils random-number float [flags]`                                  | Generate floating-point batches. |
| `brutils random-number pick`    | `brutils random-number pick --items <csv> or --file <path> [flags]`    | Pick one or more items.          |
| `brutils random-number shuffle` | `brutils random-number shuffle --items <csv> or --file <path> [flags]` | Shuffle a list of items.         |
| `brutils random-number dice`    | `brutils random-number dice [flags]`                                   | Roll one or more dice.           |
| `brutils random-number coin`    | `brutils random-number coin [flags]`                                   | Flip a coin once.                |
| `brutils number-picker run`     | `brutils number-picker run [flags]`                                    | Pick one integer in a range.     |

## Shared flags

| Flag              | Applies to           | Type    | Description                         |
| ----------------- | -------------------- | ------- | ----------------------------------- | ------ | -------------------------- |
| `--seed <number>` | most random commands | integer | Make output deterministic.          |
| `--format <plain  | json                 | csv>`   | integer, float, pick, shuffle, dice | string | Control CLI output format. |

## Action-specific flags

| Flag                   | Applies to                | Type    | Description                           |
| ---------------------- | ------------------------- | ------- | ------------------------------------- |
| `--min <number>`       | int, float, number-picker | number  | Minimum value.                        |
| `--max <number>`       | int, float, number-picker | number  | Maximum value.                        |
| `--count <number>`     | int, float, pick, dice    | integer | Number of results to generate.        |
| `--sorted`             | int, float                | boolean | Sort output in ascending order.       |
| `--unique`             | int, pick                 | boolean | Avoid duplicates when possible.       |
| `--precision <number>` | float                     | integer | Decimal precision for floats.         |
| `--items <csv>`        | pick, shuffle             | string  | Comma-separated source items.         |
| `--file <path>`        | pick, shuffle             | string  | Load items from a file, one per line. |
| `--faces <number>`     | dice                      | integer | Number of sides on the die.           |

## Notes

- `brutils rand ...` works as an alias for `brutils random-number ...`.
- `brutils random-number generate ...` is an alias for `brutils random-number int ...`.
- `--items` and `--file` are mutually exclusive.
