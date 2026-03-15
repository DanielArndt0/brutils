# CNPJ

## Overview

The CNPJ module generates, validates, formats, strips and masks CNPJ values for testing and development workflows.

## CLI Commands

```bash
brutils cnpj generate
brutils cnpj generate --formatted
brutils cnpj generate --branch 12 --count 5 --unique

brutils cnpj validate 11444777000161
brutils cnpj validate 11.444.777/0001-61 --strict

brutils cnpj format 11444777000161
brutils cnpj strip 11.444.777/0001-61
brutils cnpj mask 11444777000161
brutils cnpj mask 11444777000161 --mask "##.***.***/****-##"
```

## Actions

| Action     | Usage                                          | Description                                                           |
| ---------- | ---------------------------------------------- | --------------------------------------------------------------------- |
| `generate` | `brutils cnpj generate [flags]`                | Generate synthetic valid CNPJ values.                                 |
| `validate` | `brutils cnpj validate <value> [--strict]`     | Validate size, digits and optional strict repeated-pattern rejection. |
| `format`   | `brutils cnpj format <value>`                  | Format a CNPJ as `00.000.000/0000-00`.                                |
| `strip`    | `brutils cnpj strip <value>`                   | Remove punctuation and keep digits only.                              |
| `mask`     | `brutils cnpj mask <value> [--mask <pattern>]` | Mask a CNPJ for safe display.                                         |

## Flags

| Flag                | Applies to | Type    | Description                                               |
| ------------------- | ---------- | ------- | --------------------------------------------------------- |
| `--formatted`       | `generate` | boolean | Return generated values with CNPJ punctuation.            |
| `--branch <number>` | `generate` | string  | Force a branch identifier. Values are padded to 4 digits. |
| `--count <number>`  | `generate` | integer | Generate multiple CNPJ values.                            |
| `--unique`          | `generate` | boolean | Avoid duplicates during batch generation.                 |
| `--strict`          | `validate` | boolean | Reject repeated patterns such as `00000000000000`.        |
| `--mask <pattern>`  | `mask`     | string  | Use `*` to hide digits and `#` to reveal them.            |

## Notes

- `brutils cnpj --help` shows examples and usage for the whole module.
- Generated values are synthetic and algorithmically valid.
