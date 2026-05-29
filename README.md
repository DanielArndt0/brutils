# Brutils

**Brutils** é uma ferramenta de linha de comando em **Node.js** e **TypeScript** para geração, validação, formatação e manipulação de dados úteis no desenvolvimento de aplicações.

O projeto reúne utilitários para documentos brasileiros como **CPF**, **CNPJ** e **CEP**, além de ferramentas para **cartões de crédito de teste**, **strings**, **JSON**, **hashes**, **UUIDs**, **tokens**, **senhas**, **datas**, **números aleatórios** e arquivos **ZIP**.

É uma CLI modular para desenvolvedores que precisam executar tarefas rápidas diretamente no terminal, sem depender de scripts manuais ou ferramentas separadas.

---

## Recursos

Com o Brutils, você pode:

- Gerar, validar, formatar, limpar e mascarar CPF, CNPJ e CEP
- Gerar cartões de crédito de teste, validar números e detectar bandeiras
- Transformar, extrair, codificar e manipular strings
- Formatar, editar, comparar e converter JSON/YAML localmente
- Gerar hashes, UUIDs, tokens e senhas
- Executar utilitários rápidos de datas
- Gerar números inteiros, decimais, sorteios, embaralhamentos, dados e cara ou coroa
- Sortear números com sementes determinísticas
- Criar arquivos ZIP, listar arquivos compactados, testar arquivos e extrair ZIPs

A partir da versão **1.0.0**, o Brutils possui uma única interface pública:

```bash
brutils --help
```

O uso oficial do projeto é feito pelo comando `brutils`.

---

## Instalação

### Instalação global via npm

Instale o pacote globalmente pelo npm:

```bash
npm install -g @danielarndt0/brutils-cli
```

Depois, execute:

```bash
brutils --help
```

---

### Instalação via GitHub Packages

Caso o pacote esteja publicado no GitHub Packages e seu registry esteja configurado, instale globalmente com:

```bash
npm install -g @danielarndt0/brutils-cli
```

Depois, use a CLI normalmente:

```bash
brutils --help
```

---

### Instalação para desenvolvimento local

Para clonar, compilar e testar o projeto localmente:

```bash
npm install
npm run build
npm link
```

Após o `npm link`, o comando `brutils` ficará disponível na sua máquina.

```bash
brutils --help
```

---

## Uso rápido

### CPF, CNPJ e CEP

```bash
brutils cpf generate --formatted
brutils cnpj validate 11.444.777/0001-61 --strict
brutils cep mask 86010190 --mask "###**-***"
```

### Cartão de crédito

```bash
brutils credit-card generate --brand visa --formatted
brutils credit-card detect 4111111111111111
```

### Strings, JSON, hash, ID e datas

```bash
brutils str slug --text "Hello Cool World"
brutils json format --value '{"name":"brutils","ok":true}' --sort-keys
brutils hash sha256 --text hello
brutils id token --length 24 --charset base64url
brutils date diff --from 2024-01-01T00:00:00Z --to 2024-01-03T00:00:00Z --unit days
```

### Números aleatórios e sorteios

```bash
brutils random-number int --min 1 --max 60 --count 6 --unique --sorted
brutils random-number pick --items "red,blue,green" --count 2
brutils number-picker run --min 1 --max 100 --seed 42
```

### ZIP e UNZIP

```bash
brutils zip create ./dist --out ./artifacts/dist.zip
brutils unzip extract ./artifacts/dist.zip --out ./restored
```

---

## Aliases disponíveis

Alguns comandos possuem aliases para facilitar o uso no terminal:

```bash
brutils card ...
```

Alias para:

```bash
brutils credit-card ...
```

```bash
brutils rand ...
```

Alias para:

```bash
brutils random-number ...
```

```bash
brutils zip run ...
```

Alias para:

```bash
brutils zip create ...
```

```bash
brutils unzip run ...
```

Alias para:

```bash
brutils unzip extract ...
```

---

## Ajuda integrada

A CLI possui ajuda integrada no comando principal, nos módulos e nas ações específicas.

```bash
brutils --help
brutils cpf --help
brutils cpf generate --help
brutils str --help
brutils json format --help
brutils hash --help
brutils date diff --help
brutils zip create --help
```

---

## Desenvolvimento

O Brutils expõe apenas o comando `brutils` para uso final.

Os scripts do `package.json` são voltados para desenvolvimento, testes e validação do projeto.

```bash
npm run build
npm run lint
npm run typecheck
npm run test:unit
npm run cli -- --help
```

Exemplos durante o desenvolvimento local:

```bash
npm run cli -- cpf generate --formatted
npm run cli -- json format --file ./package.json --sort-keys
npm run cli -- zip create ./dist --out ./artifacts/dist.zip
```

---

## Documentação

A documentação dos módulos está organizada por recurso:

- [CPF](docs/CPF.md)
- [CNPJ](docs/CNPJ.md)
- [CEP](docs/CEP.md)
- [Credit Card](docs/CREDIT_CARD.md)
- [STR](docs/STR.md)
- [JSON](docs/JSON.md)
- [Hash](docs/HASH.md)
- [ID](docs/ID.md)
- [Date](docs/DATE.md)
- [Random Number](docs/RANDOM_NUMBER.md)
- [Number Picker](docs/NUMBER_PICKER.md)
- [ZIP](docs/ZIP.md)
- [UNZIP](docs/UNZIP.md)

---

## Licença

MIT
