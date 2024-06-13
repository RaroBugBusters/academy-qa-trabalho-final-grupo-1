import { Before, BeforeAll, AfterAll, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MovieRating from "../pages/movieRating.page";
import { faker } from "@faker-js/faker";

const movieRating = new MovieRating();

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
});

Given("que eu acesso o site e crio um usuário", () => {
  cy.newUser(name, faker.internet.email(), password, confirmPassword);
});

When("pesquisar pelo filme {string}", (movie) => {
  movieRating.search(movie);
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

When("selecionar o rating {int} e não escrever uma review", (stars) => {
  movieRating.rate(stars);
  movieRating.submit();
});

When("selecionar o rating {int} e escrever uma nova review", (star) => {
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

Then("não deve ser possível gerar uma avaliação", () => {
  
});

Then("a avaliação e o rating devem ser atualizados", () => {
  movieRating.reviewCard("Um bom filme")
});