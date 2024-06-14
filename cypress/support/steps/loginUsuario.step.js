import { Given, When } from "@badeball/cypress-cucumber-preprocessor";
import { LoginUsuario } from "../pages/loginUsuario";

const loginPage = new LoginUsuario();

Given("que acessei a página de login", function () {
  cy.visit("/login");
});

When("coloco a minha senha", function () {
  loginPage.digitarSenha("123456");
});

When("confirmo a operação", function () {
  loginPage.clicarlogin();
});

When("não coloco a minha senha", function () {});

When("digito a senha incorreta", function () {
  loginPage.digitarSenha("12355555");
});

When("coloco meu email", function () {
  loginPage.digitarEmail("carolteste@email.com");
});

When("eu não digito o email", function () {});

Then(
  "devo ser autenticado e ser redirecionado para a página inicial",
  function () {
    cy.wait(5000);
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
  }
);

Then("devo ver a mensagem de erro falha ao autenticar", function () {
  const MENSAGEM_DE_ERRO = "Usuário ou senha inválidos.";
  loginPage
    .obterModal()
    .should("be.visible")
    .and("contain.text", "Falha ao autenticar")
    .and("contain.text", MENSAGEM_DE_ERRO);
});

Then(
  "deve ser exibida uma mensagem de erro solicitando a senha",
  function () {}
);
