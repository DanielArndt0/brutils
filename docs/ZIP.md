# ZIP

> Official interface: use the `brutils` CLI commands shown below.

## Overview

The ZIP module creates `.zip` files from source files or directories and can also list or test zip archives.

## CLI Commands

```bash
brutils zip create ./dist
brutils zip create ./dist ./artifacts/build.zip
brutils zip create ./dist --out ./artifacts/build.zip --force
brutils zip create ./dist --contents-only --exclude node_modules --exclude dist

brutils zip list ./artifacts/build.zip
brutils zip list ./artifacts/build.zip --match "**/*.txt"

brutils zip test ./artifacts/build.zip
```

## Actions

| Action   | Usage                                           | Description                               |
| -------- | ----------------------------------------------- | ----------------------------------------- |
| `create` | `brutils zip create <source> [out] [flags]`     | Create a zip archive.                     |
| `list`   | `brutils zip list <source> [--match <pattern>]` | List archive contents without extracting. |
| `test`   | `brutils zip test <source> [--match <pattern>]` | Test archive readability.                 |

## Flags

| Flag                      | Applies to               | Type              | Description                                              |
| ------------------------- | ------------------------ | ----------------- | -------------------------------------------------------- |
| `-o, --out <path>`        | `create`                 | string            | Explicit output file path.                               |
| `-l, --level <number>`    | `create`                 | integer           | Compression level from 0 to 9.                           |
| `-x, --exclude <glob...>` | `create`                 | repeatable string | Exclude matching files or folders.                       |
| `--contents-only`         | `create`                 | boolean           | Zip only the folder contents instead of the root folder. |
| `-f, --force`             | `create`                 | boolean           | Overwrite existing output.                               |
| `--dry-run`               | `create`                 | boolean           | Print the execution plan only.                           |
| `-v, --verbose`           | `create`                 | boolean           | Show verbose archive creation logs.                      |
| `-q, --quiet`             | `create`, `list`, `test` | boolean           | Suppress non-error output.                               |
| `--follow-symlinks`       | `create`                 | boolean           | Follow symbolic links during input collection.           |
| `--store`                 | `create`                 | boolean           | Store files without compression.                         |
| `--match <pattern>`       | `list`, `test`           | string            | Filter which archive entries are included.               |

## Notes

- `brutils zip run ...` is supported as an alias for `brutils zip create ...`.
- Use either positional `[out]` or `--out`, not both.
