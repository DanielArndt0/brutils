# JSON

## Visão geral

O módulo `json` fornece utilitários locais para formatação, validação, edição, comparação e conversão de JSON.

## Comandos da CLI

```bash
brutils json format --file ./config.json --sort-keys
brutils json minify --value '{"name":"brutils","ok":true}'
brutils json validate --value '{"ok":true}'
brutils json get --file ./config.json --path server.port
brutils json set --file ./config.json --path flags.dev --set-value true --in-place
brutils json delete --file ./config.json --path obsoleteFlag --in-place
brutils json diff --left ./left.json --right ./right.json
brutils json merge --file ./base.json ./override.json
brutils json to-yaml --value '{"name":"brutils","ok":true}'
```

## Ações

| Ação       | Uso                                                                                                    | Descrição                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `format`   | `brutils json format (--file <path> \| --value <json>) [--indent <n>] [--sort-keys] [--in-place]`      | Formata JSON para facilitar a leitura.                             |
| `minify`   | `brutils json minify (--file <path> \| --value <json>) [--in-place]`                                   | Minifica JSON.                                                     |
| `validate` | `brutils json validate (--file <path> \| --value <json>)`                                              | Valida a sintaxe JSON.                                             |
| `get`      | `brutils json get (--file <path> \| --value <json>) --path <dot.path>`                                 | Lê um caminho no JSON.                                             |
| `set`      | `brutils json set (--file <path> \| --value <json>) --path <dot.path> --set-value <json> [--in-place]` | Grava um valor em um caminho no JSON.                              |
| `delete`   | `brutils json delete (--file <path> \| --value <json>) --path <dot.path> [--in-place]`                 | Remove um caminho do JSON.                                         |
| `diff`     | `brutils json diff --left <path-or-json> --right <path-or-json>`                                       | Compara dois arquivos JSON ou valores JSON informados diretamente. |
| `merge`    | `brutils json merge [--file <path>...] [--value <json>...]`                                            | Mescla várias fontes JSON.                                         |
| `to-yaml`  | `brutils json to-yaml (--file <path> \| --value <json>)`                                               | Converte JSON para YAML.                                           |

## Opções

| Opção                    | Aplicável a                         | Tipo     | Descrição                                                      |
| ------------------------ | ----------------------------------- | -------- | -------------------------------------------------------------- |
| `--file <path>`          | maioria das ações                   | string   | Lê JSON de um arquivo.                                         |
| `--value <json>`         | maioria das ações                   | string   | Lê JSON informado diretamente.                                 |
| `--path <dot.path>`      | `get`, `set`, `delete`              | string   | Caminho JSON no qual realizar a operação.                      |
| `--set-value <json>`     | `set`                               | string   | Novo valor JSON para o caminho.                                |
| `--indent <n>`           | `format`                            | inteiro  | Tamanho da indentação para facilitar a leitura.                |
| `--sort-keys`            | `format`                            | booleano | Ordena recursivamente as chaves dos objetos antes da exibição. |
| `--left <path-or-json>`  | `diff`                              | string   | Caminho do arquivo JSON ou valor JSON da esquerda.             |
| `--right <path-or-json>` | `diff`                              | string   | Caminho do arquivo JSON ou valor JSON da direita.              |
| `--in-place`             | `set`, `delete`, `format`, `minify` | booleano | Grava as alterações de volta no arquivo de entrada.            |

## Observações

- `--in-place` exige `--file`, pois um JSON informado diretamente não pode ser sobrescrito.
- `merge` aceita vários caminhos `--file` e/ou várias strings JSON `--value` no mesmo comando.
- `brutils json --help` exibe exemplos e instruções de uso de todo o módulo.
