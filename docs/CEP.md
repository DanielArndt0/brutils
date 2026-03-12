# CEP

## Overview

The CEP module provides generation and validation for CEP values.

## Available Commands

### Generate CEP

```bash
npm run cep:generate
```

### Generate formatted CEP

```bash
npm run cep:generate -- --formatted
```

### Validate CEP

```bash
npm run cep:validate -- 86010190
```

## Flags

| Flag | Command | Type | Required | Description | Example |
|---|---|---|---|---|---|
| `--formatted` | `cep:generate` | boolean | No | Returns the generated CEP with punctuation. | `npm run cep:generate -- --formatted` |

## Notes

- Validation accepts formatted or unformatted CEP values.
- CEP validation in the current version checks structure and length.
