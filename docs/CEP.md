# CEP

## Visão geral

O módulo CEP gera, valida, formata, remove formatação e mascara valores de CEP para fluxos de trabalho de testes e desenvolvimento.

## Comandos da CLI

```bash
brutils cep generate
brutils cep generate --formatted
brutils cep generate --state PR --count 5

brutils cep validate 86010190
brutils cep validate 86010-190 --strict

brutils cep format 86010190
brutils cep strip 86010-190
brutils cep mask 86010190
brutils cep mask 86010190 --mask "###**-***"
```

## Ações

| Ação       | Uso                                           | Descrição                                                                       |
| ---------- | --------------------------------------------- | ------------------------------------------------------------------------------- |
| `generate` | `brutils cep generate [flags]`                | Gera valores sintéticos de CEP.                                                 |
| `validate` | `brutils cep validate <value> [--strict]`     | Valida a estrutura e, opcionalmente, rejeita padrões repetidos no modo estrito. |
| `format`   | `brutils cep format <value>`                  | Formata um CEP como `00000-000`.                                                |
| `strip`    | `brutils cep strip <value>`                   | Remove a pontuação e mantém somente os dígitos.                                 |
| `mask`     | `brutils cep mask <value> [--mask <pattern>]` | Mascara um CEP para exibição segura.                                            |

## Opções

| Opção              | Aplicável a | Tipo     | Descrição                                                        |
| ------------------ | ----------- | -------- | ---------------------------------------------------------------- |
| `--formatted`      | `generate`  | booleano | Retorna os valores gerados com a pontuação de CEP.               |
| `--state <uf>`     | `generate`  | string   | Ajusta o primeiro dígito usando a sigla de um estado brasileiro. |
| `--count <number>` | `generate`  | inteiro  | Gera vários valores de CEP.                                      |
| `--strict`         | `validate`  | booleano | Rejeita padrões repetidos como `11111111`.                       |
| `--mask <pattern>` | `mask`      | string   | Use `*` para ocultar dígitos e `#` para exibi-los.               |

## Observações

- `brutils cep --help` exibe exemplos e instruções de uso de todo o módulo.
- Os valores de CEP gerados são dados sintéticos para testes e não realizam consultas reais de endereço.
