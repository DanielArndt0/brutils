# CEP

## Overview

The CEP module generates, validates, formats, strips and masks CEP values for testing and development workflows.

## CLI Commands

```bash
brutils cep generate
brutils cep generate --formatted
brutils cep generate --state PR --count 5

brutils cep validate 86010190
brutils cep validate 86010-190 --strict

brutils cep format 86010190
brutils cep strip 86010-190
brutils cep mask 86010190
brutils cep mask 86010190 --mask "###**-***"
```

## Actions

| Action     | Usage                                         | Description                                                        |
| ---------- | --------------------------------------------- | ------------------------------------------------------------------ |
| `generate` | `brutils cep generate [flags]`                | Generate synthetic CEP values.                                     |
| `validate` | `brutils cep validate <value> [--strict]`     | Validate structure and optional strict repeated-pattern rejection. |
| `format`   | `brutils cep format <value>`                  | Format a CEP as `00000-000`.                                       |
| `strip`    | `brutils cep strip <value>`                   | Remove punctuation and keep digits only.                           |
| `mask`     | `brutils cep mask <value> [--mask <pattern>]` | Mask a CEP for safe display.                                       |

## Flags

| Flag               | Applies to | Type    | Description                                          |
| ------------------ | ---------- | ------- | ---------------------------------------------------- |
| `--formatted`      | `generate` | boolean | Return generated values with CEP punctuation.        |
| `--state <uf>`     | `generate` | string  | Bias the leading digit using a Brazilian state code. |
| `--count <number>` | `generate` | integer | Generate multiple CEP values.                        |
| `--strict`         | `validate` | boolean | Reject repeated patterns such as `11111111`.         |
| `--mask <pattern>` | `mask`     | string  | Use `*` to hide digits and `#` to reveal them.       |

## Notes

- `brutils cep --help` shows examples and usage for the whole module.
- Generated CEP values are synthetic fixtures and do not perform real address resolution.
