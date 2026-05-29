# UNZIP

## Visão geral

O módulo UNZIP extrai arquivos `.zip` para um diretório de destino e também pode listar ou testar o conteúdo dos arquivos compactados.

## Comandos da CLI

```bash
brutils unzip extract ./build.zip
brutils unzip extract ./build.zip ./output
brutils unzip extract ./build.zip --out ./output --force
brutils unzip extract ./build.zip --flat --match "**/*.txt"

brutils unzip list ./build.zip
brutils unzip test ./build.zip
```

## Ações

| Ação      | Uso                                               | Descrição                                   |
| --------- | ------------------------------------------------- | ------------------------------------------- |
| `extract` | `brutils unzip extract <source> [out] [flags]`    | Extrai um arquivo zip.                      |
| `list`    | `brutils unzip list <source> [--match <pattern>]` | Lista o conteúdo do arquivo compactado.     |
| `test`    | `brutils unzip test <source> [--match <pattern>]` | Testa a legibilidade do arquivo compactado. |

## Opções

| Opção               | Aplicável a               | Tipo     | Descrição                                              |
| ------------------- | ------------------------- | -------- | ------------------------------------------------------ |
| `-o, --out <path>`  | `extract`                 | string   | Diretório de saída explícito.                          |
| `-f, --force`       | `extract`                 | booleano | Sobrescreve o diretório de destino caso ele já exista. |
| `--dry-run`         | `extract`                 | booleano | Exibe somente o plano de extração.                     |
| `-v, --verbose`     | `extract`                 | booleano | Exibe logs detalhados da extração.                     |
| `-q, --quiet`       | `extract`, `list`, `test` | booleano | Suprime saídas que não sejam erros.                    |
| `--flat`            | `extract`                 | booleano | Extrai os arquivos sem preservar pastas aninhadas.     |
| `--match <pattern>` | `extract`, `list`, `test` | string   | Filtra quais entradas serão consideradas.              |

## Observações

- `brutils unzip run ...` é aceito como um alias para `brutils unzip extract ...`.
- Somente arquivos `.zip` são compatíveis.
