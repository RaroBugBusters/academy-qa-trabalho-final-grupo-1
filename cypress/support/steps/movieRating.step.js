import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MovieRating from "../pages/movieRating.page";

const movieRating = new MovieRating();

Before(() => {
    cy.viewport("macbook-16");
  });

Given("que eu acesso o site", () => {
  cy.visit("");
});

When ("estou logado", () => {

});

When("escolher o primeiro filme", () => {
  movieRating.movieCard();
});

When("selecionar o rating e escrever uma review", (stars) => {
  movieRating.rate(stars);
  movieRating.review("Um excelente filme");
  movieRating.submit();
});

Then("a avaliação deve ser registrada", () => {
  movieRating.reviewCard("Um excelente filme");
});