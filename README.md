# Brutils

**brutils** is a modular command-line toolkit designed to provide useful utilities for developers.
It includes generators and validators for common data formats used in development, testing, and automation workflows.

The project is designed with a **modular service architecture**, allowing each tool to be used independently and later integrated into a full CLI interface.

---

# Features

Currently implemented utilities:

## Document Generators
- CPF generator
- CNPJ generator
- CEP generator
- Credit card generator

## Validators
- CPF validator
- CNPJ validator
- CEP validator
- Credit card validator

## Credit Card Utilities
- Card number generation
- Expiry date generation
- CVV generation
- Card brand detection
- Validation using the **Luhn algorithm**

---

# Project Structure

```
src/
  core/
    utils/
    types/

  services/
    cpf/
    cnpj/
    cep/
    credit-card/

scripts/
  cpf/
  cnpj/
  cep/
  credit-card/

tests/
```

The project separates **core utilities**, **services**, and **execution scripts**, making it easier to scale and maintain.

---

# Installation

Clone the repository:

```bash
git clone https://github.com/DanielArndt0/brutils.git
```

Install dependencies:

```bash
npm install
```

---

# Running the Tools

Currently the utilities are accessed using **npm scripts** that execute the service layer directly.

---

# CPF

## Generate CPF

```bash
npm run cpf:generate
```

Formatted:

```bash
npm run cpf:generate -- --formatted
```

## Validate CPF

```bash
npm run cpf:validate -- 52998224725
```

---

# CNPJ

## Generate CNPJ

```bash
npm run cnpj:generate
```

Formatted:

```bash
npm run cnpj:generate -- --formatted
```

## Validate CNPJ

```bash
npm run cnpj:validate -- 11444777000161
```

---

# CEP

## Generate CEP

```bash
npm run cep:generate
```

Formatted:

```bash
npm run cep:generate -- --formatted
```

## Validate CEP

```bash
npm run cep:validate -- 86010190
```

---

# Credit Card

The credit card module supports generation, validation and brand detection.

Supported brands:

- Visa
- Mastercard
- American Express
- Elo

## Generate Credit Card

Generate a Visa card:

```bash
npm run credit-card:generate -- --brand visa
```

Generate an Amex card:

```bash
npm run credit-card:generate -- --brand amex
```

Formatted output:

```bash
npm run credit-card:generate -- --brand visa --formatted
```

Example output:

```
{
  brand: 'visa',
  number: '4111 1111 1111 1111',
  expiryMonth: '08',
  expiryYear: '28',
  expiry: '08/28',
  cvv: '123'
}
```

---

## Detect Credit Card Brand

```bash
npm run credit-card:detect -- 4111111111111111
```

Output:

```
visa
```

---

## Validate Credit Card

```bash
npm run credit-card:validate -- --number 4111111111111111 --expiry 12/30 --cvv 123
```

Example result:

```
{
  isValid: true,
  brand: 'visa',
  number: '4111111111111111',
  numberValid: true,
  expiryValid: true,
  cvvValid: true
}
```

---

# Development

Run tests:

```bash
npm run test
```

Watch tests:

```bash
npm run test:watch
```

Run TypeScript checks:

```bash
npm run typecheck
```

Run linter:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

---

# Future CLI

The current project structure is designed to support a full CLI interface in future versions. The service layer implemented today will be used as the foundation for the final command-line experience.