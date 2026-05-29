# STR

## Visão geral

O módulo `str` fornece transformações locais de strings e utilitários de codificação para fluxos de trabalho cotidianos no terminal.

## Comandos da CLI

```bash
brutils str slug --text "Hello Cool World"
brutils str case --text "my cool variable" --to camel
brutils str trim --text "   hello world   "
brutils str truncate --text "hello world" --max 8 --suffix "..."
brutils str replace --text "hello 123" --from "\d+" --with "X" --regex
brutils str normalize --text "Café"
brutils str remove-accents --text "résumé"
brutils str pad --text "42" --length 5 --side left
brutils str extract "\[(.*?)\]" --text "[one] [two]" --regex
brutils str base64 --text "hello" --mode encode
brutils str urlencode --text "hello world" --mode encode
brutils str html --text "<strong>ok</strong>" --mode encode
brutils str leven "kitten" "sitting"
```

## Ações

| Ação             | Uso                                                                          | Descrição                                                |
| ---------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------- |
| `slug`           | `brutils str slug --text <value>`                                            | Converte texto em um slug adequado para URLs.            |
| `case`           | `brutils str case --text <value> --to <style>`                               | Converte texto entre estilos de capitalização.           |
| `trim`           | `brutils str trim --text <value>`                                            | Remove espaços e quebras de linha nas extremidades.      |
| `truncate`       | `brutils str truncate --text <value> --max <n> [--suffix <value>]`           | Limita o texto a um tamanho máximo.                      |
| `replace`        | `brutils str replace --text <value> --from <value> --with <value> [--regex]` | Substitui trechos de texto ou correspondências de regex. |
| `normalize`      | `brutils str normalize --text <value>`                                       | Normaliza o texto usando Unicode NFC.                    |
| `remove-accents` | `brutils str remove-accents --text <value>`                                  | Remove acentos e sinais diacríticos.                     |
| `pad`            | `brutils str pad --text <value> --length <n> [--side <side>]`                | Preenche uma string com espaços.                         |
| `extract`        | `brutils str extract <query> --text <value> [--regex]`                       | Extrai conteúdo usando regex ou pares de delimitadores.  |
| `base64`         | `brutils str base64 --text <value> [--mode <mode>]`                          | Codifica ou decodifica Base64.                           |
| `urlencode`      | `brutils str urlencode --text <value> [--mode <mode>]`                       | Codifica ou decodifica conteúdo de URL.                  |
| `html`           | `brutils str html --text <value> [--mode <mode>]`                            | Codifica ou decodifica entidades HTML.                   |
| `leven`          | `brutils str leven <value> <value>`                                          | Calcula a distância de Levenshtein entre duas strings.   |

## Opções

| Opção                        | Aplicável a                   | Tipo     | Descrição                                                                    |
| ---------------------------- | ----------------------------- | -------- | ---------------------------------------------------------------------------- |
| `--text <value>`             | maioria das ações             | string   | Texto de entrada informado diretamente.                                      |
| `--file <path>`              | maioria das ações             | string   | Lê o texto de entrada de um arquivo.                                         |
| `--to <style>`               | `case`                        | string   | Estilo de destino: `camel`, `snake`, `kebab`, `pascal`, `constant`, `title`. |
| `--max <n>`                  | `truncate`                    | inteiro  | Tamanho máximo.                                                              |
| `--suffix <value>`           | `truncate`                    | string   | Acrescenta um sufixo como `...` após o truncamento.                          |
| `--from <value>`             | `replace`                     | string   | Texto ou padrão a substituir.                                                |
| `--with <value>`             | `replace`                     | string   | Valor substituto.                                                            |
| `--regex`                    | `replace`, `extract`          | booleano | Interpreta a origem da substituição ou a consulta de extração como regex.    |
| `--mode <encode\|decode>`    | `base64`, `urlencode`, `html` | string   | Seleciona o modo de codificação ou decodificação.                            |
| `--side <left\|right\|both>` | `pad`                         | string   | Direção do preenchimento.                                                    |
| `--length <n>`               | `pad`                         | inteiro  | Tamanho de destino.                                                          |

## Observações

- `extract` usa o argumento posicional `<query>`. Com `--regex`, a consulta é um padrão de regex; caso contrário, deve ser um par de delimitadores no formato `start|end`.
- `brutils str --help` exibe exemplos e instruções de uso de todo o módulo.
