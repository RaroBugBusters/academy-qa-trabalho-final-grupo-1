import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import UserRegistrationPage from "../pages/registroDeUsuarioPage";

const userRegistrationPage = new UserRegistrationPage();
var mail = faker.internet.email();

Before(() => {
  cy.viewport("macbook-16");
});

Given("que eu acesso o site", () => {
  cy.visit("");
});

When("quero registrar um usuário", () => {
  userRegistrationPage.registerUser();
});

When("eu informar os dados de cadastro corretamente", () => {
  userRegistrationPage.typeName(faker.person.fullName());
  userRegistrationPage.typeEmail(mail);
  userRegistrationPage.typePassword("123456");
  userRegistrationPage.typeConfirmPassword("123456");
  userRegistrationPage.Submit();
});

When(
  "eu informar os dados de {string}, {string} inválido, {string} e {string}",
  (nome, email, senha, confirmarSenha) => {
    userRegistrationPage.typeName(nome);
    userRegistrationPage.typeEmail(email);
    userRegistrationPage.typePassword(senha);
    userRegistrationPage.typeConfirmPassword(confirmarSenha);
    userRegistrationPage.Submit();
  }
);

When("eu informar os dados com senha e confirmar senha diferentes", () => {
  userRegistrationPage.typeName(faker.person.fullName());
  userRegistrationPage.typeEmail(faker.internet.email());
  userRegistrationPage.typePassword("123456");
  userRegistrationPage.typeConfirmPassword("1234567");
  userRegistrationPage.Submit();
});

When("eu informar os dados de email ja existente", () => {
  userRegistrationPage.typeName(faker.person.fullName());
  userRegistrationPage.typeEmail(mail);
  userRegistrationPage.typePassword("123456");
  userRegistrationPage.typeConfirmPassword("123456");
  userRegistrationPage.Submit();
});

When(
  "eu informar os dados de {string}, {string}, {string} e {string} vazios",
  (Nome, Email, Senha, ConfirmarSenha) => {
    userRegistrationPage.typeName(Nome);
    userRegistrationPage.typeEmail(Email);
    userRegistrationPage.typePassword(Senha);
    userRegistrationPage.typeConfirmPassword(ConfirmarSenha);
    userRegistrationPage.Submit();
  }
);

When("eu informar um nome com caracteres especiais", () => {
  userRegistrationPage.typeName("!@#$$%^&*()");
  userRegistrationPage.typeEmail(faker.internet.email());
  userRegistrationPage.typePassword("123456");
  userRegistrationPage.typeConfirmPassword("123456");
  userRegistrationPage.Submit();
});

When("eu informar um email com caracteres especiais", () => {
  userRegistrationPage.typeName(faker.person.fullName());
  userRegistrationPage.typeEmail("!#$$%^&*@" + faker.lorem.word() + ".com");
  userRegistrationPage.typePassword("123456");
  userRegistrationPage.typeConfirmPassword("123456");
  userRegistrationPage.Submit();
});

When("eu informar uma senha com caracteres especiais", () => {
  userRegistrationPage.typeName(faker.person.fullName());
  userRegistrationPage.typeEmail(faker.internet.email());
  userRegistrationPage.typePassword("!#$$%^&*");
  userRegistrationPage.typeConfirmPassword("!#$$%^&*");
  userRegistrationPage.Submit();
});

When("eu informar um nome com mais de 100 caracteres", () => {
  userRegistrationPage.typeName(
    "pneumoultramicroscopicossilicovulcanoconiosesquelepticosilicovulcanoconiose alcoilbenzenossulfonático"
  );
  userRegistrationPage.typeEmail(faker.internet.email());
  userRegistrationPage.typePassword("123456");
  userRegistrationPage.typeConfirmPassword("123456");
  userRegistrationPage.Submit();
});

When("eu informar um nome com 99 caracteres", () => {
  userRegistrationPage.typeName(
    "pneumoultramicroscopicossilicovulcanoconiosesquelepticosilicovulcanoconiose amidoazobenzossulfônico"
  );
  userRegistrationPage.typeEmail(faker.internet.email());
  userRegistrationPage.typePassword("123456");
  userRegistrationPage.typeConfirmPassword("123456");
  userRegistrationPage.Submit();
});

When("eu informar um nome com 100 caracteres", () => {
  userRegistrationPage.typeName(
    "pneumoultramicroscopicossilicovulcanoconiosesquelepticosilicovulcanoconiose cineangiocoronariografia"
  );
  userRegistrationPage.typeEmail(faker.internet.email());
  userRegistrationPage.typePassword("123456");
  userRegistrationPage.typeConfirmPassword("123456");
  userRegistrationPage.Submit();
});

When("eu informar um email com 61 caracteres", () => {

  userRegistrationPage.typeName(faker.person.fullName())
  userRegistrationPage.typeEmail("")
  userRegistrationPage.typePassword("123456")
  userRegistrationPage.typeConfirmPassword("123456")
  userRegistrationPage.Submit();
});

Then("uma mensagem de sucesso deve ser exibida", () => {
  cy.get(".error-message").should("contain", "Cadastro realizado!");
  cy.get("div.modal-actions > button").click();
});

Then("uma mensagem de erro deve ser exibida", () => {
  cy.get(".input-error").should("contain", "Informe um e-mail válido.");
});

Then("uma mensagem de senhas diferentes deve ser exibida", () => {
  cy.get(".input-error").should("contain", "As senhas devem ser iguais.");
});

Then("uma mensagem de email já existente deve ser exibida", () => {
  cy.get(".error-message").should(
    "contain",
    "E-mail já cadastrado. Utilize outro e-mail"
  );
  cy.get("div.modal-actions > button").click();
});

Then("uma mensagem de preenchimento obrigatório deve ser exibida", () => {
  cy.get(".input-error").should("be.visible");
});

Then("uma mensagem de máximo de 100 deve ser exibida", () => {
  cy.get(".input-error").should("be.visible");
});
