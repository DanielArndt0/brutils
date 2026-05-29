# ID

## Visão geral

O módulo `id` fornece utilitários para gerar UUIDs, tokens aleatórios e senhas para testes, fluxos de autenticação e dados de teste.

## Comandos da CLI

```bash
brutils id uuid
brutils id uuid --count 3
brutils id token --length 24 --charset base64url
brutils id token --count 2 --length 16 --charset hex
brutils id password --length 20 --uppercase
brutils id password --length 16 --no-symbols --no-numbers
```

## Ações

| Ação       | Uso                                                                                                               | Descrição               |
| ---------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `uuid`     | `brutils id uuid [--count <n>]`                                                                                   | Gera valores UUID.      |
| `token`    | `brutils id token [--count <n>] [--length <n>] [--charset <name>]`                                                | Gera tokens aleatórios. |
| `password` | `brutils id password [--count <n>] [--length <n>] [--charset <name>] [--no-symbols] [--no-numbers] [--uppercase]` | Gera senhas fortes.     |

## Opções

| Opção              | Aplicável a         | Tipo     | Descrição                                                                                            |
| ------------------ | ------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `--count <n>`      | todas as ações      | inteiro  | Gera vários valores.                                                                                 |
| `--length <n>`     | `token`, `password` | inteiro  | Tamanho desejado para a saída.                                                                       |
| `--charset <name>` | `token`, `password` | string   | Conjunto de caracteres permitido: `alnum`, `alpha`, `numeric`, `hex`, `base64url`, `lower`, `upper`. |
| `--no-symbols`     | `password`          | booleano | Exclui símbolos das senhas geradas.                                                                  |
| `--no-numbers`     | `password`          | booleano | Exclui dígitos das senhas geradas.                                                                   |
| `--uppercase`      | `password`          | booleano | Garante pelo menos uma letra maiúscula.                                                              |

## Observações

- `token` usa o conjunto de caracteres `alnum` por padrão.
- `password` inclui símbolos e números por padrão, a menos que as opções os removam.
