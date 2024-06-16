# Desafio técnico Raro Academy

Esse projeto de automação de testes faz parte de um desafio técnico da Raro Academy, com o objetivo de avaliar os conhecimentos acumulados durante todo o curso.

## 🎯Testes automatizados de Frontend com Cypress

**Sobre:** Testes que validam as funcionalidades no sistema web do Raromdb.

**Acesso:** https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/

## 🎯Testes automatizados de API com Cypress

**Sobre:** Testes que validam os critérios de aceite implementados na API do Raromdb.

**Acesso:** https://raromdb-3c39614e42d4.herokuapp.com/swagger

## 🎯Testes automatizados de aplicações Mobile com Robot Framework

**Sobre:** Testes que validam as funcionalidades implementadas no app Raromdb.

## 🔍Abordagem de testes

O BDD, “Desenvolvimento Orientado a Comportamento” foi usado nesse projeto através da adoção de uma linguagem de fácil entendimento, no caso o Gherkin, dessa forma os cenários de testes foram todos escritos Gherkin para facilitar a compreensão dos testes.

## 🤖Estratégia da automação

A automação de testes foi desenvolvida conforme as boas práticas de clean code usando um alto nível de manutenibilidade, reuso e simplicidade de código. pensando nisso foi adotada 2 estratégias diferentes na automação de testes, sendo elas:

1.  **📌PageObjects ➞ Automação Front-End:** Foi empregado dessa forma para melhorar a abstração da interface do usuário, reusabilidade, manutenção simplificada e separação de responsabilidades.
2.  **📌Custom Commands ➞ Automação Back-End:** Foi empregado dessa forma para melhorar a abstração de ações repetitivas, facilidade de uso, padronização de funcionalidades, legibilidade e reutilização de lógica de teste.

## 📊Resumo dos testes

A automação de testes está dividida em casos de sucesso e casos de falhas, cada teste é independente e pode ser executado de maneira isolada ou em conjunto, os dados apresentados abaixo são referentes a execução em conjunto.

## ⚙️Tecnologias usadas

- **Node** - Ambiente de execução JavaScript

- **NPM** - Gerenciador de pacotes do Node

- **Cypress** - Framework de automação de testes

- **Gherkin** - Linguagem para descrição dos cenários

- **Faker.js** - Ferramenta de geração de dados falsos

- **Allure Report** - Ferramenta de relatórios e dashboard de testes

- **Java JDK 11** - Kit de Desenvolvimento Java 11

## 📋Pré-requisitos

- Node instalado na versão v20.12.0 ou superior
- NPM instalado na versão 10.5.0 ou superior
- Java JDK 11 (Apenas se quiser ter acesso aos dashboard de testes)

## 🚩Processos de instalação

Faça o clone do projeto em sua máquina ou caso prefira, baixe os arquivos do projeto em sua máquina e extraia eles e depois, com o terminal aberto nas pastas raiz dos projetos (api, web, mobile), execute os comandos abaixo:

`npm install`
`npm install --save-dev allure-commandline`

## 🚀Passos para executar

Se você quiser executar o projeto com o ambiente visual, execute o comando abaixo e depois escolha a opção E2E Testing, clique em Chrome e em seguida clique no arquivo do teste para executar os testes.

`npm test`

Se você deseja executar o projeto sem o ambiente visual, execute o seguinte comando:

`npm test:headless`

Agora, caso queira acessar relatórios completos com gráficos e mais detalhes, você pode fazer isso através do Allure Report, para isso é necessário ter o Java JDK 11 ou superior e as variáveis ​​de ambiente JAVA_HOME já configuradas.

Execute os comandos após rodar os testes:

`npx allure serve` ou `allure serve`

Seu navegador padrão irá abrir já com os resultados dos testes e caso queira limpar o histórico do teste anterior você deve executar o seguinte comando:

`npm run clear`

Exemplos dos relatórios de testes:

![image](https://ibb.co/61m0mC5)

![image](https://ibb.co/26Ssd66)
