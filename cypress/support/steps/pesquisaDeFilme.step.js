import {
  AfterAll,
  Before,
  BeforeAll,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { PesquisaDeFilmePage } from "../pages/pesquisaDeFilmePage";

const pesquisaDeFilmePage = new PesquisaDeFilmePage();

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
  pesquisaDeFilmePage.search(movie);
  pesquisaDeFilmePage.movie();
});

When("pesquiso pelo filme {string}", (movie) => {
  pesquisaDeFilmePage.search(movie);
});

Then("deve ser exibido o resultado da busca", () => {
  cy.get(pesquisaDeFilmePage.movieCard).should("be.visible");
});

Then("deve ser exibido que nenhum filme foi encontrado", () => {
  cy.get(pesquisaDeFilmePage.noMovieFound).should(
    "contain",
    "Nenhum filme encontrado"
  );
});

Then("deve ser exibido a lista com todos os filmes", () => {
  cy.get(pesquisaDeFilmePage.movieCardFull).should("be.visible");
});
