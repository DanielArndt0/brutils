# CPF

## Overview

The CPF module provides generation and validation for Brazilian CPF numbers.

## Available Commands

### Generate CPF

```bash
npm run cpf:generate
```

### Generate formatted CPF

```bash
npm run cpf:generate -- --formatted
```

### Validate CPF

```bash
npm run cpf:validate -- 52998224725
```

## Flags

| Flag | Command | Type | Required | Description | Example |
|---|---|---|---|---|---|
| `--formatted` | `cpf:generate` | boolean | No | Returns the generated CPF with punctuation. | `npm run cpf:generate -- --formatted` |

## Notes

- Validation accepts formatted or unformatted CPF values.
- Generated values are algorithmically valid.
