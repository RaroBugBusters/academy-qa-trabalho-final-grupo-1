import { BeforeAll, Before, AfterAll, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import MovieSearch from "../pages/movieSearch.page";

const movieSearch = new MovieSearch();

Before(() => {
    cy.viewport("macbook-16");
});

BeforeAll(() => {
    cy.userCreate();
    cy.userLogIn();
    cy.userMakeAdmin();
    cy.movieCreate();
});

AfterAll(() => {
    cy.movieDelete();
});

Given("que eu acesso o site", () => {
    cy.visit("");
});

When("pesquiso pelo filme existente {string}", (movie) => {
    movieSearch.search(movie);
    movieSearch.movie();
});

When("pesquiso pelo filme {string}", (movie) => {
    movieSearch.search(movie);
});

Then("deve ser exibido o resultado da busca", () => {
    cy.get(movieSearch.movieCard).should("be.visible");
});

Then("deve ser exibido que nenhum filme foi encontrado", () => {
    cy.get(movieSearch.noMovieFound).should("contain", "Nenhum filme encontrado");
});

Then("deve ser exibido a lista com todos os filmes", () => {
    cy.get(movieSearch.movieCardFull).should("be.visible");
})