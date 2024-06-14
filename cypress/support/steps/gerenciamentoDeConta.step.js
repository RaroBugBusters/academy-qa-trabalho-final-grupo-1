import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { GerenciamentoDeContaPage } from "../pages/GerenciamentoDeContaPage";
import { LoginUsuarioPage } from "../pages/LoginUsuarioPage";

const paginaGerenciamentoDeConta = new GerenciamentoDeContaPage();
const paginaLogin = new LoginUsuarioPage();

Before(() => {
  cy.viewport("macbook-16");
  cy.intercept("POST", "/api/auth/login").as("authUser");
  cy.intercept("GET", "/api/users/**").as("getUser");
  cy.intercept("PUT", "/api/users/**").as("updateUser");
});

Given("que estou cadastrado e logado no sistema", () => {
  cy.registrarUsuario().then(() => {
    const email = Cypress.env("USUARIO_ATUAL").email;
    const password = Cypress.env("USUARIO_ATUAL").password;

    paginaLogin.visitar();
    paginaLogin.fazerLogin(email, password);

    cy.wait("@authUser");
    cy.wait("@getUser");
  });
});

When("acesso a página de gerenciamento de conta", () => {
  paginaGerenciamentoDeConta.visitar();
});

When("o tipo de usuário for {string}", (tipo) => {
  cy.window().then((win) => {
    let infoSessao = JSON.parse(
      win.sessionStorage.getItem("user-session-info")
    );
    infoSessao.state.user.type = parseInt(tipo, 10);
    win.sessionStorage.setItem("user-session-info", JSON.stringify(infoSessao));

    cy.reload();
  });
});

Then("devo visualizar as minhas informações", () => {
  const email = Cypress.env("USUARIO_ATUAL").email.toLowerCase();
  const nome = Cypress.env("USUARIO_ATUAL").name;

  paginaGerenciamentoDeConta
    .obterCampoNome()
    .should("be.visible")
    .and("have.value", nome);

  paginaGerenciamentoDeConta
    .obterCampoEmail()
    .should("be.disabled")
    .and("have.value", email);
});

Then("o tipo de usuário deve ser {string}", (tipo) => {
  paginaGerenciamentoDeConta.obterTipoUsuario().should("have.text", tipo);
});

When("realizo o logout", () => {
  paginaGerenciamentoDeConta.logout();
});

Then("devo ser redirecionado para a página de login", () => {
  cy.url().should(
    "eq",
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login"
  );
});

Then("o campo de email deve estar desabilitado", () => {
  paginaGerenciamentoDeConta.obterCampoEmail().should("be.disabled");
});

When("altero o nome para um nome válido", () => {
  const nome = faker.person.fullName();
  paginaGerenciamentoDeConta.obterCampoNome().clear().type(nome);
});

When("clico em Salvar", () => {
  paginaGerenciamentoDeConta.clicarBotaoSalvar();
});

Then(
  "devo visualizar a mensagem de que a informação foi alterada com sucesso",
  () => {
    const mensagemSucesso = "Informações atualizadas!";
    paginaGerenciamentoDeConta
      .obterModal()
      .should("be.visible")
      .and("contain.text", "Sucesso")
      .and("contain.text", mensagemSucesso);
  }
);

When("os campos de senha e confirmação de senha estão desabilitados", () => {
  paginaGerenciamentoDeConta
    .obterCampoSenha()
    .should("be.disabled")
    .and("have.value", "");

  paginaGerenciamentoDeConta
    .obterCampoConfirmacaoSenha()
    .should("be.disabled")
    .and("have.value", "");
});

When("clico em Alterar senha", () => {
  paginaGerenciamentoDeConta.clicarBotaoAlterarSenha();
});

When("preencho os campos de senha e confirmação de senha corretamente", () => {
  const senha = "12345678";
  paginaGerenciamentoDeConta.obterCampoSenha().type(senha);
  paginaGerenciamentoDeConta.obterCampoConfirmacaoSenha().clear().type(senha);
});

When(
  "preencho os campos de senha e confirmação de senha com {string}",
  (senha) => {
    paginaGerenciamentoDeConta.obterCampoSenha().type(senha);
    paginaGerenciamentoDeConta.obterCampoConfirmacaoSenha().clear().type(senha);
  }
);

Then(
  "devo visualizar a mensagem de erro de que a senha deve ter pelo menos 6 dígitos",
  () => {
    const mensagemErro = "A senha deve ter pelo menos 6 dígitos";

    paginaGerenciamentoDeConta
      .obterErroCampoSenha()
      .should("be.visible")
      .and("contain.text", mensagemErro);

    paginaGerenciamentoDeConta
      .obterErroCampoConfirmacaoSenha()
      .should("be.visible")
      .and("contain.text", mensagemErro);
  }
);

Then(
  "devo visualizar a mensagem de erro de que não foi possível atualizar os dados.",
  () => {
    const mensagemErro = "Não foi possível atualizar os dados.";

    paginaGerenciamentoDeConta
      .obterModal()
      .should("be.visible")
      .and("contain.text", mensagemErro);
  }
);

When(
  "preencho os campos de senha com {string} e confirmação de senha com {string}",
  (senha, confirmacaoSenha) => {
    paginaGerenciamentoDeConta.obterCampoSenha().type(senha);
    paginaGerenciamentoDeConta
      .obterCampoConfirmacaoSenha()
      .type(confirmacaoSenha);
  }
);

Then(
  "devo visualizar a mensagem de erro de que as senhas não são iguais",
  () => {
    const mensagemErro = "As senhas devem ser iguais.";

    paginaGerenciamentoDeConta
      .obterErroCampoConfirmacaoSenha()
      .should("be.visible")
      .and("contain.text", mensagemErro);
  }
);
