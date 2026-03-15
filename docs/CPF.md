# CPF

## Overview

The CPF module generates, validates, formats, strips and masks CPF values for testing and development workflows.

## CLI Commands

```bash
brutils cpf generate
brutils cpf generate --formatted
brutils cpf generate --formatted --state SP --count 5 --unique

brutils cpf validate 52998224725
brutils cpf validate 529.982.247-25 --strict

brutils cpf format 52998224725
brutils cpf strip 529.982.247-25
brutils cpf mask 52998224725
brutils cpf mask 52998224725 --mask "***.###.***-##"
```

## Actions

| Action     | Usage                                         | Description                                                           |
| ---------- | --------------------------------------------- | --------------------------------------------------------------------- |
| `generate` | `brutils cpf generate [flags]`                | Generate synthetic valid CPF values.                                  |
| `validate` | `brutils cpf validate <value> [--strict]`     | Validate size, digits and optional strict repeated-pattern rejection. |
| `format`   | `brutils cpf format <value>`                  | Format a CPF as `000.000.000-00`.                                     |
| `strip`    | `brutils cpf strip <value>`                   | Remove punctuation and keep digits only.                              |
| `mask`     | `brutils cpf mask <value> [--mask <pattern>]` | Mask a CPF for safe display.                                          |

## Flags

| Flag               | Applies to | Type    | Description                                         |
| ------------------ | ---------- | ------- | --------------------------------------------------- |
| `--formatted`      | `generate` | boolean | Return generated values with CPF punctuation.       |
| `--state <uf>`     | `generate` | string  | Bias the region digit using a Brazilian state code. |
| `--count <number>` | `generate` | integer | Generate multiple CPF values.                       |
| `--unique`         | `generate` | boolean | Avoid duplicates during batch generation.           |
| `--strict`         | `validate` | boolean | Reject repeated patterns such as `11111111111`.     |
| `--mask <pattern>` | `mask`     | string  | Use `*` to hide digits and `#` to reveal them.      |

## Notes

- `brutils cpf --help` shows examples and usage for the whole module.
- Generated values are synthetic and algorithmically valid.
