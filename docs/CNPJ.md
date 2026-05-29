# CNPJ

## Visão geral

O módulo CNPJ gera, valida, formata, remove formatação e mascara valores de CNPJ para fluxos de trabalho de testes e desenvolvimento.

## Comandos da CLI

```bash
brutils cnpj generate
brutils cnpj generate --formatted
brutils cnpj generate --branch 12 --count 5 --unique

brutils cnpj validate 11444777000161
brutils cnpj validate 11.444.777/0001-61 --strict

brutils cnpj format 11444777000161
brutils cnpj strip 11.444.777/0001-61
brutils cnpj mask 11444777000161
brutils cnpj mask 11444777000161 --mask "##.***.***/****-##"
```

## Ações

| Ação       | Uso                                            | Descrição                                                                                 |
| ---------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `generate` | `brutils cnpj generate [flags]`                | Gera valores de CNPJ sintéticos e válidos.                                                |
| `validate` | `brutils cnpj validate <value> [--strict]`     | Valida o tamanho, os dígitos e, opcionalmente, rejeita padrões repetidos no modo estrito. |
| `format`   | `brutils cnpj format <value>`                  | Formata um CNPJ como `00.000.000/0000-00`.                                                |
| `strip`    | `brutils cnpj strip <value>`                   | Remove a pontuação e mantém somente os dígitos.                                           |
| `mask`     | `brutils cnpj mask <value> [--mask <pattern>]` | Mascara um CNPJ para exibição segura.                                                     |

## Opções

| Opção               | Aplicável a | Tipo     | Descrição                                                                    |
| ------------------- | ----------- | -------- | ---------------------------------------------------------------------------- |
| `--formatted`       | `generate`  | booleano | Retorna os valores gerados com a pontuação de CNPJ.                          |
| `--branch <number>` | `generate`  | string   | Define um identificador de filial. Os valores são preenchidos até 4 dígitos. |
| `--count <number>`  | `generate`  | inteiro  | Gera vários valores de CNPJ.                                                 |
| `--unique`          | `generate`  | booleano | Evita duplicatas durante a geração em lote.                                  |
| `--strict`          | `validate`  | booleano | Rejeita padrões repetidos como `00000000000000`.                             |
| `--mask <pattern>`  | `mask`      | string   | Use `*` para ocultar dígitos e `#` para exibi-los.                           |

## Observações

- `brutils cnpj --help` exibe exemplos e instruções de uso de todo o módulo.
- Os valores gerados são sintéticos e válidos de acordo com o algoritmo.
