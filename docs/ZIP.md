# ZIP

## Visão geral

O módulo ZIP cria arquivos `.zip` a partir de arquivos ou diretórios de origem e também pode listar ou testar arquivos compactados zip.

## Comandos da CLI

```bash
brutils zip create ./dist
brutils zip create ./dist ./artifacts/build.zip
brutils zip create ./dist --out ./artifacts/build.zip --force
brutils zip create ./dist --contents-only --exclude node_modules --exclude dist

brutils zip list ./artifacts/build.zip
brutils zip list ./artifacts/build.zip --match "**/*.txt"

brutils zip test ./artifacts/build.zip
```

## Ações

| Ação     | Uso                                             | Descrição                                           |
| -------- | ----------------------------------------------- | --------------------------------------------------- |
| `create` | `brutils zip create <source> [out] [flags]`     | Cria um arquivo compactado zip.                     |
| `list`   | `brutils zip list <source> [--match <pattern>]` | Lista o conteúdo do arquivo compactado sem extrair. |
| `test`   | `brutils zip test <source> [--match <pattern>]` | Testa a legibilidade do arquivo compactado.         |

## Opções

| Opção                     | Aplicável a              | Tipo             | Descrição                                                    |
| ------------------------- | ------------------------ | ---------------- | ------------------------------------------------------------ |
| `-o, --out <path>`        | `create`                 | string           | Caminho explícito do arquivo de saída.                       |
| `-l, --level <number>`    | `create`                 | inteiro          | Nível de compactação de 0 a 9.                               |
| `-x, --exclude <glob...>` | `create`                 | string repetível | Exclui arquivos ou pastas correspondentes.                   |
| `--contents-only`         | `create`                 | booleano         | Compacta somente o conteúdo da pasta, em vez da pasta raiz.  |
| `-f, --force`             | `create`                 | booleano         | Sobrescreve a saída existente.                               |
| `--dry-run`               | `create`                 | booleano         | Exibe somente o plano de execução.                           |
| `-v, --verbose`           | `create`                 | booleano         | Exibe logs detalhados da criação do arquivo compactado.      |
| `-q, --quiet`             | `create`, `list`, `test` | booleano         | Suprime saídas que não sejam erros.                          |
| `--follow-symlinks`       | `create`                 | booleano         | Segue links simbólicos durante a coleta das entradas.        |
| `--store`                 | `create`                 | booleano         | Armazena os arquivos sem compactação.                        |
| `--match <pattern>`       | `list`, `test`           | string           | Filtra quais entradas do arquivo compactado serão incluídas. |

## Observações

- `brutils zip run ...` é aceito como um alias para `brutils zip create ...`.
- Use o argumento posicional `[out]` ou `--out`, mas não os dois ao mesmo tempo.
