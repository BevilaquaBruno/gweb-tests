# 🧪 GWeb Tests

Repositório de automação de testes para o sistema **GWeb** da **Gdoor Zucchetti** utilizando [Playwright](https://playwright.dev/).

## 🔍 Visão Geral

Este projeto utiliza o Playwright para automatizar e validar funcionalidades do sistema GWeb, garantindo qualidade, prevenção de regressões e maior confiabilidade nas entregas.

## 📁 Estrutura do Projeto

```
/
├── tests/                # Casos de teste organizados por módulo
│   ├── assets/
│   │   ├── certificate/  # Pasta para adicionar o arquivo do certificado digital
│   │   │   ├── cert.pfx
│   │   │   └── .gitkeep  # Não envia o certificado digital para o repositório
│   │   ├── CNAE.json     # Arquivo contendo CNAES conforme tabela do IBGE
│   │   └── services.json # Arquivo contendo códigos de atividade
│   ├── base/             # Pasta contendo os testes de configurações
│   │   └── config.spec.ts
│   ├── helpers/          # Pasta contendo o arquivo de função de autenticação
│   │   └── fixtures.ts 
│   ├── invoices/         # Pasta contendo testes de movimentações
│   │   ├── nfe.spec.ts
│   │   ├── pdv.spec.ts
│   │   └── ...
│   ├── registers/        # Pasta contendo testes de cadastros
│   │   ├── operations.spec.ts
│   │   ├── person.spec.ts
│   │   ├── products.spec.ts
│   │   └── ...
│   └── ...
├── playwright.config.ts  # Configurações do Playwright
├── reports/              # Relatórios de execução
├── package.json          # Dependências e scripts
└── README.md             # Este arquivo
```

## 🛠️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Navegadores instalados pelo Playwright:
  ```bash
  npx playwright install
  ```
- Adicionar o arquivo do certificado digital na pasta `assets/certificate`
- Configurar .env
    ```env
    PLAYWRIGHT_GWEB_LOGIN="example@mail.com" //email utilizado para login
    PLAYWRIGHT_GWEB_PASSWORD="password" //senha utilizada para login
    PLAYWRIGHT_CERT_FILE="certificate.pfx" //nome do arquivo do certificado digital
    PLAYWRIGHT_CERT_PASSWORD="Zuc@1234" //senha do certificado digital
    PLAYWRIGHT_GWEB_ACCOUNT="Company to Select" //Nome da empresa a selecionar (conforme está no gweb)
    PLAYWRIGHT_GWEB_URL="https://app.gdoorweb.com.br" //link do sistema utilizado para os testes
    ```

## 🚀 Como rodar os testes

1. Clonar o repositório:
   ```bash
   git clone https://github.com/BevilaquaBruno/gweb-tests.git
   cd gweb-tests
   ```

2. Instalar dependências:
   ```bash
   npm install
   ```

3. Rodar todos os testes:
   - Em modo headless (CI):
     ```bash
     npx playwright test
     ```
   - Com interface interativa (modo visual):
     ```bash
     npx playwright test --ui
     ```

4. Gerar relatório:
   ```bash
   npx playwright show-report
   ```

## 🧩 Controle de cobertura de testes

Acompanhe o progresso dos testes pela planilha compartilhada:  
👉 [Planilha de controle de casos de teste](https://docs.google.com/spreadsheets/d/10HJTxnl301riTtdf22eA8VUVJHZv90ZIadSv-17pblM/edit?usp=sharing)


## 🏗️ Contribuições

1. Escolha um item da planilha marcado como **pendente**.
2. Crie uma branch:
   ```bash
   git checkout -b feature/test-nome-do-caso
   ```

3. Implemente o teste.
4. Atualize a planilha com as informações do caso.
5. Crie um Pull Request com:
   - Resumo do que foi testado
   - Cenários cobertos

### ✅ Sumário

Este repositório centraliza os testes automatizados do GWeb com Playwright e integra um fluxo organizado com apoio da planilha de controle. O objetivo é garantir testes confiáveis, bem documentados e de fácil manutenção.

