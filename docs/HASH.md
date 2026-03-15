# HASH

## Overview

The `hash` module provides digest helpers for inline text, files, HMAC operations, file checksums and hash comparisons.

## CLI Commands

```bash
brutils hash md5 --text hello
brutils hash sha1 --text hello
brutils hash sha256 --file ./README.md
brutils hash sha512 --text hello
brutils hash hmac --algo sha256 --key secret --text hello
brutils hash checksum --file ./dist/cli.js --algo sha512
brutils hash compare --file ./README.md --algo sha256 --expected <hash>
```

## Actions

| Action     | Usage                                                                                      | Description                                       |
| ---------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| `md5`      | `brutils hash md5 (--text <value> \| --file <path>)`                                       | Compute an MD5 digest.                            |
| `sha1`     | `brutils hash sha1 (--text <value> \| --file <path>)`                                      | Compute a SHA-1 digest.                           |
| `sha256`   | `brutils hash sha256 (--text <value> \| --file <path>)`                                    | Compute a SHA-256 digest.                         |
| `sha512`   | `brutils hash sha512 (--text <value> \| --file <path>)`                                    | Compute a SHA-512 digest.                         |
| `hmac`     | `brutils hash hmac --algo <name> --key <value> (--text <value> \| --file <path>)`          | Compute an HMAC using the chosen algorithm.       |
| `checksum` | `brutils hash checksum --file <path> [--algo <name>]`                                      | Compute a digest for a file.                      |
| `compare`  | `brutils hash compare --expected <hash> [--algo <name>] (--text <value> \| --file <path>)` | Compare a computed digest with an expected value. |

## Flags

| Flag                | Applies to                    | Type   | Description           |
| ------------------- | ----------------------------- | ------ | --------------------- |
| `--text <value>`    | hash actions                  | string | Inline value to hash. |
| `--file <path>`     | hash actions                  | string | File to hash.         |
| `--algo <name>`     | `hmac`, `checksum`, `compare` | string | Hash algorithm name.  |
| `--key <value>`     | `hmac`                        | string | Secret key for HMAC.  |
| `--expected <hash>` | `compare`                     | string | Expected hash value.  |

## Notes

- `compare` returns the computed hash, the expected hash and whether they match.
- `checksum` defaults to `sha256` when `--algo` is omitted.
