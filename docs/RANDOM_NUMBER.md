# Utilitários aleatórios

## Visão geral

Os utilitários aleatórios abrangem geração de inteiros, geração de números de ponto flutuante, seleção em listas, embaralhamento de itens, lançamento de dados, cara ou coroa e saída determinística baseada em uma semente.

## Comandos

```bash
brutils random-number int --min 1 --max 100 --count 5 --sorted
brutils random-number float --min 0 --max 1 --count 3 --precision 4
brutils random-number pick --items "red,blue,green" --count 2 --unique
brutils random-number shuffle --file ./items.txt
brutils random-number dice --faces 20 --count 2
brutils random-number coin --seed 42

brutils number-picker run --min 1 --max 60 --seed 42
```

## Ações

| Comando                         | Uso                                                                    | Descrição                                    |
| ------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| `brutils random-number int`     | `brutils random-number int [flags]`                                    | Gera lotes de números inteiros.              |
| `brutils random-number float`   | `brutils random-number float [flags]`                                  | Gera lotes de números de ponto flutuante.    |
| `brutils random-number pick`    | `brutils random-number pick --items <csv> or --file <path> [flags]`    | Seleciona um ou mais itens.                  |
| `brutils random-number shuffle` | `brutils random-number shuffle --items <csv> or --file <path> [flags]` | Embaralha uma lista de itens.                |
| `brutils random-number dice`    | `brutils random-number dice [flags]`                                   | Lança um ou mais dados.                      |
| `brutils random-number coin`    | `brutils random-number coin [flags]`                                   | Realiza uma jogada de cara ou coroa.         |
| `brutils number-picker run`     | `brutils number-picker run [flags]`                                    | Seleciona um número inteiro em um intervalo. |

## Opções compartilhadas

| Opção                         | Aplicável a                               | Tipo    | Descrição                           |
| ----------------------------- | ----------------------------------------- | ------- | ----------------------------------- |
| `--seed <number>`             | maioria dos comandos aleatórios           | inteiro | Torna a saída determinística.       |
| `--format <plain\|json\|csv>` | `int`, `float`, `pick`, `shuffle`, `dice` | string  | Controla o formato de saída da CLI. |

## Opções específicas por ação

| Opção                  | Aplicável a                     | Tipo     | Descrição                                        |
| ---------------------- | ------------------------------- | -------- | ------------------------------------------------ |
| `--min <number>`       | `int`, `float`, `number-picker` | número   | Valor mínimo.                                    |
| `--max <number>`       | `int`, `float`, `number-picker` | número   | Valor máximo.                                    |
| `--count <number>`     | `int`, `float`, `pick`, `dice`  | inteiro  | Número de resultados a gerar.                    |
| `--sorted`             | `int`, `float`                  | booleano | Ordena a saída em ordem crescente.               |
| `--unique`             | `int`, `pick`                   | booleano | Evita duplicatas quando possível.                |
| `--precision <number>` | `float`                         | inteiro  | Precisão decimal dos números de ponto flutuante. |
| `--items <csv>`        | `pick`, `shuffle`               | string   | Itens de origem separados por vírgulas.          |
| `--file <path>`        | `pick`, `shuffle`               | string   | Carrega itens de um arquivo, um por linha.       |
| `--faces <number>`     | `dice`                          | inteiro  | Número de faces do dado.                         |

## Observações

- `brutils rand ...` funciona como um alias para `brutils random-number ...`.
- `brutils random-number generate ...` é um alias para `brutils random-number int ...`.
- `--items` e `--file` são mutuamente exclusivos.
