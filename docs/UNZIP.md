# UNZIP

## Overview

The UNZIP module extracts `.zip` files into a destination directory and can also list or test archive contents.

## CLI Commands

```bash
brutils unzip extract ./build.zip
brutils unzip extract ./build.zip ./output
brutils unzip extract ./build.zip --out ./output --force
brutils unzip extract ./build.zip --flat --match "**/*.txt"

brutils unzip list ./build.zip
brutils unzip test ./build.zip
```

## Actions

| Action    | Usage                                             | Description               |
| --------- | ------------------------------------------------- | ------------------------- |
| `extract` | `brutils unzip extract <source> [out] [flags]`    | Extract a zip file.       |
| `list`    | `brutils unzip list <source> [--match <pattern>]` | List archive contents.    |
| `test`    | `brutils unzip test <source> [--match <pattern>]` | Test archive readability. |

## Flags

| Flag                | Applies to                | Type    | Description                                      |
| ------------------- | ------------------------- | ------- | ------------------------------------------------ |
| `-o, --out <path>`  | `extract`                 | string  | Explicit output directory.                       |
| `-f, --force`       | `extract`                 | boolean | Overwrite target directory if it already exists. |
| `--dry-run`         | `extract`                 | boolean | Print the extraction plan only.                  |
| `-v, --verbose`     | `extract`                 | boolean | Show verbose extraction logs.                    |
| `-q, --quiet`       | `extract`, `list`, `test` | boolean | Suppress non-error output.                       |
| `--flat`            | `extract`                 | boolean | Extract files without preserving nested folders. |
| `--match <pattern>` | `extract`, `list`, `test` | string  | Filter which entries are considered.             |

## Notes

- `brutils unzip run ...` works as an alias for `brutils unzip extract ...`.
- Only `.zip` files are supported.
