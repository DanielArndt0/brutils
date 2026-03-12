# CNPJ

## Overview

The CNPJ module provides generation and validation for Brazilian CNPJ numbers.

## Available Commands

### Generate CNPJ

```bash
npm run cnpj:generate
```

### Generate formatted CNPJ

```bash
npm run cnpj:generate -- --formatted
```

### Validate CNPJ

```bash
npm run cnpj:validate -- 11444777000161
```

## Flags

| Flag | Command | Type | Required | Description | Example |
|---|---|---|---|---|---|
| `--formatted` | `cnpj:generate` | boolean | No | Returns the generated CNPJ with punctuation. | `npm run cnpj:generate -- --formatted` |

## Notes

- Validation accepts formatted or unformatted CNPJ values.
- Generated values are algorithmically valid.
