# Credit Card

## Overview

The credit card module generates synthetic card test data, detects card brands and validates card payloads.

## Supported Brands

- `visa`
- `mastercard`
- `amex`
- `elo`

## CLI Commands

```bash
brutils credit-card generate --brand visa
brutils credit-card generate --brand amex --formatted
brutils credit-card detect 4111111111111111

brutils credit-card validate --number 4111111111111111 --expiry 12/30 --cvv 123
brutils credit-card validate --number 4111111111111111 --expiry-month 12 --expiry-year 30 --cvv 123
```

## Actions

| Action     | Usage                                                                        | Description                            |
| ---------- | ---------------------------------------------------------------------------- | -------------------------------------- |
| `generate` | `brutils credit-card generate [flags]`                                       | Generate synthetic card test data.     |
| `validate` | `brutils credit-card validate --number <value> --cvv <value> [expiry flags]` | Validate card number, expiry and CVV.  |
| `detect`   | `brutils credit-card detect <number>`                                        | Detect the card brand from the number. |

## Flags

| Flag                            | Applies to | Type    | Description                                        |
| ------------------------------- | ---------- | ------- | -------------------------------------------------- |
| `--brand <brand>`               | `generate` | string  | Choose a specific brand to generate.               |
| `--formatted`                   | `generate` | boolean | Return the card number with spaces every 4 digits. |
| `--expiry-years-ahead <number>` | `generate` | integer | Maximum years ahead for generated expiry.          |
| `--number <value>`              | `validate` | string  | Card number to validate.                           |
| `--expiry <value>`              | `validate` | string  | Expiry in `MM/YY` format.                          |
| `--expiry-month <value>`        | `validate` | string  | Expiry month.                                      |
| `--expiry-year <value>`         | `validate` | string  | Expiry year.                                       |
| `--cvv <value>`                 | `validate` | string  | CVV code to validate.                              |

## Notes

- `brutils credit-card --help` shows module-level usage and examples.
- Validation checks number format, brand detection, expiry and CVV consistency.
