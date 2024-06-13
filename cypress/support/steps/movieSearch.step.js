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

When("eu pesquisar pelo filme {string}", (movie) => {
    movieSearch.search(movie);
});

Then("deve ser exibido o resultado da busca", () => {
    cy.get(movieSearch.movieCard).should("be.visible");
})