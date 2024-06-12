import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MovieRating from "../pages/movieRating.page";
import { faker } from "@faker-js/faker";

const movieRating = new MovieRating();


Before(() => {
  cy.viewport("macbook-16");
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = "123456";
  const confirmPassword = "123456";
  cy.newUser(name, email, password, confirmPassword);
});

Given("que eu acesso o site e estou logado", () => {
  cy.visit("");
});

When("escolher o primeiro filme", () => {
  movieRating.movie();
});

When("selecionar o rating {int} e escrever uma review", (stars) => {
  movieRating.rate(stars);
  movieRating.review("Um excelente filme");
  movieRating.submit();
});

When("não selecionar o rating e escrever uma review", () => {
  movieRating.review("Um bom filme");
  movieRating.submit();
});

Then("a avaliação deve ser registrada", () => {
  movieRating.reviewCard("Um excelente filme");
});

Then("a avaliação deve gerar uma mensagem de erro", () => {
  movieRating.errorMessage();
});