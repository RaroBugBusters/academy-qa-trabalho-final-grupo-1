import { Before, Given, Then, When, } from "@badeball/cypress-cucumber-preprocessor";
import { UserRegistrationPage } from "../pages/userRegistration.page.js";
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

When("eu informar os dados de cadastro em branco", () => {

  userRegistrationPage
    .typeName(faker.internet.fullName())
    .typeEmail(faker.internet.email())
    .typePassword("123456")
    .typeConfirmPassword("123456")
    .clickSubmit();
});

Then("uma mensagem de sucesso deve ser exibida");
  cy.get(".error-message").shouldContain("Cadastro realizado!");
  cy.get("div.modal-actions > button").click();