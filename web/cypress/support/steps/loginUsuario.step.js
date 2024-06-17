import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { LoginUsuarioPage } from "../pages/loginUsuarioPage";

const paginaLoginUsuario = new LoginUsuarioPage();

Before(() => {
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();
  cy.viewport("macbook-16");
  cy.intercept("POST", "/api/auth/login").as("authUser");
  cy.intercept("GET", "/api/users/**").as("getUser");
});

Given("que acessei a página de login", () => {
  paginaLoginUsuario.visitar();
});

Given("que estou cadastrado", () => {
  cy.registrarUsuario();
});

When("preencher o email com um e-mail válido", () => {
  const email = Cypress.env("USUARIO_ATUAL").email;

  paginaLoginUsuario.digitarEmail(email);
});

When("preencher a senha com uma senha válida", () => {
  const password = Cypress.env("USUARIO_ATUAL").password;

  paginaLoginUsuario.digitarSenha(password);
});

When("preencher a senha com uma senha inválida", () => {
  paginaLoginUsuario.digitarSenha("senhainvalida");
});

When("clicar no botão Login", () => {
  paginaLoginUsuario.clicarBotaoSubmit();
});

When("preencher o email com um e-mail inválido", () => {
  paginaLoginUsuario.digitarEmail("emailinvalido");
});

Then("devo ser autenticado e ser redirecionado para a página inicial", () => {
  cy.wait("@authUser").then(() => {
    cy.wait(2000);
    cy.window().then((win) => {
      const sessionInfo = JSON.parse(
        win.sessionStorage.getItem("session-info")
      );
      expect(sessionInfo).to.be.an("object");
      expect(sessionInfo.state).to.have.property("accessToken");
      expect(sessionInfo.state.accessToken).to.be.a("string");
      expect(sessionInfo.state.accessToken).to.not.be.null;
      expect(sessionInfo.state.accessToken).to.not.be.empty;
    });
  });

  cy.url().should("eq", "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/");
});

Then("devo ver a mensagem de erro falha ao autenticar", () => {
  const errorMessage = "Usuário ou senha inválidos.";
  paginaLoginUsuario
    .obterModal()
    .should("be.visible")
    .and("contain.text", "Falha ao autenticar")
    .and("contain.text", errorMessage);
});

Then("devo ver a mensagem que o email é inválido", () => {
  const errorMessage = "Informe um e-mail válido.";
  paginaLoginUsuario
    .obterErroCampoEmail()
    .should("be.visible")
    .and("contain.text", errorMessage);
});
