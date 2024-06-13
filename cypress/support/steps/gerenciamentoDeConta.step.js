import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { UserLoginPage } from "../pages/UserLoginPage";
import { UserManagementPage } from "../pages/UserManagementPage";

const userManagementPage = new UserManagementPage();
const userLoginPage = new UserLoginPage();

Before(() => {
  cy.viewport("macbook-16");
  cy.intercept("POST", "/api/auth/login").as("authUser");
  cy.intercept("GET", "/api/users/**").as("getUser");
  cy.intercept("PUT", "/api/users/**").as("updateUser");
});

Given("que estou cadastrado e logado no sistema", () => {
  cy.registerUser().then(() => {
    const email = Cypress.env("CURRENT_USER").email;
    const password = Cypress.env("CURRENT_USER").password;

    userLoginPage.visit();
    userLoginPage.login(email, password);

    cy.wait("@authUser");
    cy.wait("@getUser");
  });
});

Given("que acesso a página de gerenciamento de conta", () => {
  userManagementPage.visit();
});

When("alterar o nome para um nome válido", () => {
  const name = faker.person.fullName();
  userManagementPage.getNameInput().clear().type(name);
});

When("clicar em Salvar", () => {
  userManagementPage.clickSaveButton();
});

When("os campos de senha e confirmação de senha estão desabilitados", () => {
  userManagementPage
    .getPasswordInput()
    .should("be.disabled")
    .and("have.value", "");

  userManagementPage
    .getConfirmPasswordInput()
    .should("be.disabled")
    .and("have.value", "");
});

When("clicar em Alterar senha", () => {
  userManagementPage.clickChangePasswordButton();
});

When("o tipo de usuário for do tipo {string}", (type) => {
  cy.window().then((win) => {
    let sessionInfo = JSON.parse(
      win.sessionStorage.getItem("user-session-info")
    );
    sessionInfo.state.user.type = parseInt(type, 10);
    win.sessionStorage.setItem(
      "user-session-info",
      JSON.stringify(sessionInfo)
    );

    cy.reload();
  });
});

When("preencher os campos de senha e confirmação de senha corretamente", () => {
  const password = "12345678";
  userManagementPage.getPasswordInput().type(password);
  userManagementPage.getConfirmPasswordInput().clear().type(password);
});

When(
  "preencher os campos de senha e confirmação de senha incorretamente {string}",
  (password) => {
    userManagementPage.getPasswordInput().type(password);
    userManagementPage.getConfirmPasswordInput().clear().type(password);
  }
);

When("realizar o logout", () => {
  userManagementPage.logout();
});

When("acessar a página de gerenciamento de conta sem estar logado", () => {
  userManagementPage.visit();
});

When(
  "preencher os campos de senha e confirmação de senha incorretamente {string} e {string}",
  (password, confirmPassword) => {
    userManagementPage.getPasswordInput().type(password);
    userManagementPage.getConfirmPasswordInput().type(confirmPassword);
  }
);

Then(
  "devo visualizar a mensagem de erro que a senha deve ter pelo menos 6 dígitos",
  () => {
    const errorMessage = "A senha deve ter pelo menos 6 dígitos";

    userManagementPage
      .getErrorPasswordInput()
      .should("be.visible")
      .and("contain.text", errorMessage);

    userManagementPage
      .getErrorConfirmPasswordInput()
      .should("be.visible")
      .and("contain.text", errorMessage);
  }
);

Then("devo visualizar a mensagem de erro que as senhas não são iguais", () => {
  const errorMessage = "As senhas devem ser iguais.";

  userManagementPage
    .getErrorConfirmPasswordInput()
    .should("be.visible")
    .and("contain.text", errorMessage);
});

Then("devo visualizar as minhas informações", () => {
  const email = Cypress.env("CURRENT_USER").email;
  const name = Cypress.env("CURRENT_USER").name;

  userManagementPage
    .getNameInput()
    .should("be.visible")
    .and("have.value", name);

  userManagementPage
    .getEmailInput()
    .should("be.disabled")
    .and("have.value", email);
});

Then("devo ser redirecionado para a página de login", () => {
  cy.url().should(
    "eq",
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login"
  );
});

Then("o campo de email deve estar desabilitado", () => {
  userManagementPage.getEmailInput().should("be.disabled");
});

Then("o tipo de usuário deve ser {string}", (type) => {
  userManagementPage.getTypeUser().should("have.text", type);
});

Then(
  "devo visualizar a mensagem que a informação foi alterada com sucesso",
  () => {
    const successMessage = "Informações atualizadas!";
    userManagementPage
      .getModal()
      .should("be.visible")
      .and("contain.text", "Sucesso")
      .and("contain.text", successMessage);
  }
);

Then(
  "devo visualizar a mensagem de erro que a senha deve ter no máximo 12 dígitos",
  () => {
    const errorMessage = "A senha deve ter no máximo 12 dígitos";

    userManagementPage
      .getErrorPasswordInput()
      .should("be.visible")
      .and("contain.text", errorMessage);

    userManagementPage
      .getErrorConfirmPasswordInput()
      .should("be.visible")
      .and("contain.text", errorMessage);
  }
);

Then(
  "devo visualizar a mensagem de erro que não foi possível atualizar a informação",
  () => {
    const errorMessage = "Não foi possível atualizar os dados.";
    userManagementPage
      .getModal()
      .should("be.visible")
      .and("contain.text", "Erro")
      .and("contain.text", errorMessage);
  }
);
