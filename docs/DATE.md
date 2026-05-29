# DATE

## Visão geral

O módulo `date` fornece utilitários rápidos para formatação, análise, operações aritméticas, conversão Unix e exibição em fusos horários.

## Comandos da CLI

```bash
brutils date now
brutils date format --date 2024-01-02T03:04:05Z --pattern "YYYY-MM-DD HH:mm:ss"
brutils date parse --date 2024-01-02T03:04:05Z
brutils date add --date 2024-01-01T00:00:00Z --days 7
brutils date sub --date 2024-01-01T00:00:00Z --hours 2
brutils date diff --from 2024-01-01T00:00:00Z --to 2024-01-03T00:00:00Z --unit days
brutils date unix --date 2024-01-01T00:00:00Z
brutils date unix 1704067200
brutils date tz --from 2024-01-01T12:00:00Z --to America/Sao_Paulo
```

## Ações

| Ação     | Uso                                                                                          | Descrição                                                    |
| -------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `now`    | `brutils date now`                                                                           | Exibe um registro da data e hora atuais.                     |
| `format` | `brutils date format --date <value> --pattern <value>`                                       | Formata uma data usando um padrão de tokens.                 |
| `parse`  | `brutils date parse --date <value>`                                                          | Analisa uma string de data e retorna metadados normalizados. |
| `add`    | `brutils date add --date <value> [--days <n>] [--hours <n>] [--minutes <n>] [--seconds <n>]` | Adiciona tempo a uma data.                                   |
| `sub`    | `brutils date sub --date <value> [--days <n>] [--hours <n>] [--minutes <n>] [--seconds <n>]` | Subtrai tempo de uma data.                                   |
| `diff`   | `brutils date diff --from <value> --to <value> [--unit <name>]`                              | Calcula a diferença entre duas datas.                        |
| `unix`   | `brutils date unix [value] [--date <value>]`                                                 | Converte para timestamps Unix ou a partir deles.             |
| `tz`     | `brutils date tz --from <value> --to <value>`                                                | Exibe uma data e hora em um fuso horário IANA de destino.    |

## Opções

| Opção               | Aplicável a       | Tipo    | Descrição                                                |
| ------------------- | ----------------- | ------- | -------------------------------------------------------- |
| `--date <value>`    | maioria das ações | string  | Data e hora de entrada.                                  |
| `--from <value>`    | `diff`, `tz`      | string  | Data e hora de origem.                                   |
| `--to <value>`      | `diff`, `tz`      | string  | Data e hora de destino ou fuso horário de destino.       |
| `--days <n>`        | `add`, `sub`      | inteiro | Variação em dias.                                        |
| `--hours <n>`       | `add`, `sub`      | inteiro | Variação em horas.                                       |
| `--minutes <n>`     | `add`, `sub`      | inteiro | Variação em minutos.                                     |
| `--seconds <n>`     | `add`, `sub`      | inteiro | Variação em segundos.                                    |
| `--pattern <value>` | `format`          | string  | Padrão de formatação.                                    |
| `--unit <name>`     | `diff`            | string  | Unidade de saída: `seconds`, `minutes`, `hours`, `days`. |

## Observações

- `format` atualmente aceita os tokens `YYYY`, `MM`, `DD`, `HH`, `mm` e `ss`.
- `unix` aceita um valor Unix posicional ou `--date` para conversão de data para Unix.
