# Cartão de crédito

## Visão geral

O módulo de cartão de crédito gera dados sintéticos de cartões para testes, detecta bandeiras e valida os dados dos cartões.

## Bandeiras compatíveis

- `visa`
- `mastercard`
- `amex`
- `elo`

## Comandos da CLI

```bash
brutils credit-card generate --brand visa
brutils credit-card generate --brand amex --formatted
brutils credit-card detect 4111111111111111

brutils credit-card validate --number 4111111111111111 --expiry 12/30 --cvv 123
brutils credit-card validate --number 4111111111111111 --expiry-month 12 --expiry-year 30 --cvv 123
```

## Ações

| Ação       | Uso                                                                          | Descrição                                      |
| ---------- | ---------------------------------------------------------------------------- | ---------------------------------------------- |
| `generate` | `brutils credit-card generate [flags]`                                       | Gera dados sintéticos de cartões para testes.  |
| `validate` | `brutils credit-card validate --number <value> --cvv <value> [expiry flags]` | Valida o número, a validade e o CVV do cartão. |
| `detect`   | `brutils credit-card detect <number>`                                        | Detecta a bandeira do cartão pelo número.      |

## Opções

| Opção                           | Aplicável a | Tipo     | Descrição                                                      |
| ------------------------------- | ----------- | -------- | -------------------------------------------------------------- |
| `--brand <brand>`               | `generate`  | string   | Seleciona uma bandeira específica para gerar.                  |
| `--formatted`                   | `generate`  | booleano | Retorna o número do cartão com espaços a cada 4 dígitos.       |
| `--expiry-years-ahead <number>` | `generate`  | inteiro  | Define o número máximo de anos futuros para a validade gerada. |
| `--number <value>`              | `validate`  | string   | Número do cartão a validar.                                    |
| `--expiry <value>`              | `validate`  | string   | Validade no formato `MM/YY`.                                   |
| `--expiry-month <value>`        | `validate`  | string   | Mês da validade.                                               |
| `--expiry-year <value>`         | `validate`  | string   | Ano da validade.                                               |
| `--cvv <value>`                 | `validate`  | string   | Código CVV a validar.                                          |

## Observações

- `brutils credit-card --help` exibe exemplos e instruções de uso do módulo.
- A validação verifica o formato do número, a detecção da bandeira, a validade e a consistência do CVV.
