# CPF

## Visão geral

O módulo CPF gera, valida, formata, remove formatação e mascara valores de CPF para fluxos de trabalho de testes e desenvolvimento.

## Comandos da CLI

```bash
brutils cpf generate
brutils cpf generate --formatted
brutils cpf generate --formatted --state SP --count 5 --unique

brutils cpf validate 52998224725
brutils cpf validate 529.982.247-25 --strict

brutils cpf format 52998224725
brutils cpf strip 529.982.247-25
brutils cpf mask 52998224725
brutils cpf mask 52998224725 --mask "***.###.***-##"
```

## Ações

| Ação       | Uso                                           | Descrição                                                                                 |
| ---------- | --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `generate` | `brutils cpf generate [flags]`                | Gera valores de CPF sintéticos e válidos.                                                 |
| `validate` | `brutils cpf validate <value> [--strict]`     | Valida o tamanho, os dígitos e, opcionalmente, rejeita padrões repetidos no modo estrito. |
| `format`   | `brutils cpf format <value>`                  | Formata um CPF como `000.000.000-00`.                                                     |
| `strip`    | `brutils cpf strip <value>`                   | Remove a pontuação e mantém somente os dígitos.                                           |
| `mask`     | `brutils cpf mask <value> [--mask <pattern>]` | Mascara um CPF para exibição segura.                                                      |

## Opções

| Opção              | Aplicável a | Tipo     | Descrição                                                         |
| ------------------ | ----------- | -------- | ----------------------------------------------------------------- |
| `--formatted`      | `generate`  | booleano | Retorna os valores gerados com a pontuação de CPF.                |
| `--state <uf>`     | `generate`  | string   | Ajusta o dígito da região usando a sigla de um estado brasileiro. |
| `--count <number>` | `generate`  | inteiro  | Gera vários valores de CPF.                                       |
| `--unique`         | `generate`  | booleano | Evita duplicatas durante a geração em lote.                       |
| `--strict`         | `validate`  | booleano | Rejeita padrões repetidos como `11111111111`.                     |
| `--mask <pattern>` | `mask`      | string   | Use `*` para ocultar dígitos e `#` para exibi-los.                |

## Observações

- `brutils cpf --help` exibe exemplos e instruções de uso de todo o módulo.
- Os valores gerados são sintéticos e válidos de acordo com o algoritmo.
