import { Before, Given, Then, When, } from "@badeball/cypress-cucumber-preprocessor";
import UserRegistrationPage from "../pages/UserRegistration.page";
import { faker } from "@faker-js/faker";

const userRegistrationPage = new UserRegistrationPage();

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

  userRegistrationPage.typeName(faker.person.fullName())
  userRegistrationPage.typeEmail(faker.internet.email())
  userRegistrationPage.typePassword("123456")
  userRegistrationPage.typeConfirmPassword("123456")
  userRegistrationPage.Submit();
});

When("eu informar o dado de {string}, {string} invalido, {string} e {string}", (nome, email, senha, confirmarSenha) => {

  userRegistrationPage.typeName(nome)
  userRegistrationPage.typeEmail(email)
  userRegistrationPage.typePassword(senha)
  userRegistrationPage.typeConfirmPassword(confirmarSenha)
  userRegistrationPage.Submit();
});

Then("uma mensagem de sucesso deve ser exibida", () => {

  cy.get(".error-message").should("contain", "Cadastro realizado!");
  cy.get("div.modal-actions > button").click();

});

Then("uma mensagem de erro deve ser exibida", () => {

  cy.get(".input-error").should("contain", "Informe um e-mail válido.");

});