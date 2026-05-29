# HASH

## Visão geral

O módulo `hash` fornece utilitários de hash para textos informados diretamente, arquivos, operações HMAC, checksums de arquivos e comparações de hash.

## Comandos da CLI

```bash
brutils hash md5 --text hello
brutils hash sha1 --text hello
brutils hash sha256 --file ./README.md
brutils hash sha512 --text hello
brutils hash hmac --algo sha256 --key secret --text hello
brutils hash checksum --file ./dist/cli.js --algo sha512
brutils hash compare --file ./README.md --algo sha256 --expected <hash>
```

## Ações

| Ação       | Uso                                                                                        | Descrição                                        |
| ---------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `md5`      | `brutils hash md5 (--text <value> \| --file <path>)`                                       | Calcula um hash MD5.                             |
| `sha1`     | `brutils hash sha1 (--text <value> \| --file <path>)`                                      | Calcula um hash SHA-1.                           |
| `sha256`   | `brutils hash sha256 (--text <value> \| --file <path>)`                                    | Calcula um hash SHA-256.                         |
| `sha512`   | `brutils hash sha512 (--text <value> \| --file <path>)`                                    | Calcula um hash SHA-512.                         |
| `hmac`     | `brutils hash hmac --algo <name> --key <value> (--text <value> \| --file <path>)`          | Calcula um HMAC usando o algoritmo selecionado.  |
| `checksum` | `brutils hash checksum --file <path> [--algo <name>]`                                      | Calcula um hash para um arquivo.                 |
| `compare`  | `brutils hash compare --expected <hash> [--algo <name>] (--text <value> \| --file <path>)` | Compara um hash calculado com um valor esperado. |

## Opções

| Opção               | Aplicável a                   | Tipo   | Descrição                                      |
| ------------------- | ----------------------------- | ------ | ---------------------------------------------- |
| `--text <value>`    | ações de hash                 | string | Valor informado diretamente para gerar o hash. |
| `--file <path>`     | ações de hash                 | string | Arquivo para gerar o hash.                     |
| `--algo <name>`     | `hmac`, `checksum`, `compare` | string | Nome do algoritmo de hash.                     |
| `--key <value>`     | `hmac`                        | string | Chave secreta para o HMAC.                     |
| `--expected <hash>` | `compare`                     | string | Valor de hash esperado.                        |

## Observações

- `compare` retorna o hash calculado, o hash esperado e informa se eles correspondem.
- `checksum` usa `sha256` por padrão quando `--algo` é omitido.
