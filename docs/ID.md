# ID

> Official interface: use the `brutils` CLI commands shown below.

## Overview

The `id` module provides UUID, random token and password generation helpers for tests, auth flows and fixtures.

## CLI Commands

```bash
brutils id uuid
brutils id uuid --count 3
brutils id token --length 24 --charset base64url
brutils id token --count 2 --length 16 --charset hex
brutils id password --length 20 --uppercase
brutils id password --length 16 --no-symbols --no-numbers
```

## Actions

| Action     | Usage                                                                                                             | Description                |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `uuid`     | `brutils id uuid [--count <n>]`                                                                                   | Generate UUID values.      |
| `token`    | `brutils id token [--count <n>] [--length <n>] [--charset <name>]`                                                | Generate random tokens.    |
| `password` | `brutils id password [--count <n>] [--length <n>] [--charset <name>] [--no-symbols] [--no-numbers] [--uppercase]` | Generate strong passwords. |

## Flags

| Flag               | Applies to          | Type    | Description                                                                                  |
| ------------------ | ------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `--count <n>`      | all actions         | integer | Generate multiple values.                                                                    |
| `--length <n>`     | `token`, `password` | integer | Desired output length.                                                                       |
| `--charset <name>` | `token`, `password` | string  | Allowed character preset: `alnum`, `alpha`, `numeric`, `hex`, `base64url`, `lower`, `upper`. |
| `--no-symbols`     | `password`          | boolean | Exclude symbols from generated passwords.                                                    |
| `--no-numbers`     | `password`          | boolean | Exclude digits from generated passwords.                                                     |
| `--uppercase`      | `password`          | boolean | Ensure at least one uppercase letter.                                                        |

## Notes

- `token` defaults to the `alnum` charset.
- `password` includes symbols and numbers by default unless flags remove them.
