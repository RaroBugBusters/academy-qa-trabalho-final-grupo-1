import {
  AfterAll,
  Before,
  BeforeAll,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
import { AvaliacaoDeFilmePage } from "../pages/avaliacaoDeFilmePagina";

const movieRating = new AvaliacaoDeFilmePage();

const name = faker.person.fullName();
const email = faker.internet.email();
const password = "123456";
const confirmPassword = "123456";

Before(() => {
  cy.viewport("macbook-16");
});

BeforeAll(() => {
  cy.userCreate();
  cy.userLogIn();
  cy.userMakeAdmin();
  cy.movieCreate();
  cy.newUser(name, email, password, confirmPassword);
});

AfterAll(() => {
  cy.movieDelete();
});

Given("que eu acesso o site e estou logado", () => {
  cy.visit("");
});

Given("que eu acesso o site e loguei", () => {
  cy.visit("/login");
  cy.get("input[name='email']").type(email);
  cy.get("input[name='password']").type(password);
  cy.get("button[class='login-button']").click();
  cy.wait(1000);
});

Given("que eu acesso o site e crio um usuário", () => {
  cy.newUser(name, faker.internet.email(), password, confirmPassword);
});

When("pesquisar pelo filme {string}", (movie) => {
  movieRating.search(movie);
  cy.wait(1000);
  movieRating.clickOnMovie();
});

When("selecionar o rating 3 e escrever uma review", () => {
  movieRating.rate();
  movieRating.review("Um excelente filme");
  movieRating.submit();
});

When("não selecionar o rating e escrever uma review", () => {
  movieRating.review("Um bom filme");
  movieRating.submit();
});

When("selecionar o rating 3 e não escrever uma review", () => {
  movieRating.rate();
  movieRating.submit();
});

When("selecionar o rating 3 e escrever uma nova review", (star) => {
  movieRating.rate(star);
  movieRating.review("Um bom filme");
  movieRating.submit();
});

Then("a avaliação deve ser registrada", () => {
  movieRating.reviewCard("Um excelente filme");
});

Then("a avaliação deve gerar uma mensagem de erro", () => {
  movieRating.errorMessage();
});

Then("não deve ser possível gerar uma avaliação", () => {});

Then("a avaliação e o rating devem ser atualizados", () => {
  movieRating.reviewCard("Um bom filme");
});
