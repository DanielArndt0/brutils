# Seletor de números

## Visão geral

O seletor de números é um utilitário específico que retorna exatamente um número inteiro dentro de um intervalo, com saída determinística opcional baseada em uma semente.

## Comandos da CLI

```bash
brutils number-picker run --min 1 --max 10
brutils number-picker run --min 100 --max 999 --seed 42
```

## Opções

| Opção             | Tipo    | Descrição                     |
| ----------------- | ------- | ----------------------------- |
| `--min <number>`  | inteiro | Valor inteiro mínimo.         |
| `--max <number>`  | inteiro | Valor inteiro máximo.         |
| `--seed <number>` | inteiro | Torna a saída determinística. |

## Observações

- `brutils pick-number run ...` é aceito como um alias.
- Use `brutils number-picker run --help` para exibir a ajuda no terminal.
