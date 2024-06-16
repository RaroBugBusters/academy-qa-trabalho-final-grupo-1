import {Before, Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import { listagemFilmesPage } from "../pages/listagemFilmesPage";
import { AvaliacaoDeFilmePage } from "../pages/avaliacaoDeFilmePagina";

const paginaListagem = new listagemFilmesPage();
const filmeCriado = new AvaliacaoDeFilmePage();

Before(() => {
    cy.viewport("macbook-16");
  });
  
Given("que eu acessei o site", () => {
    cy.visit("");
});

When("acesso a funcionalidade Filmes", () => {
    paginaListagem.clickListaFilmes();
});

Then("devo ter acesso à lista de Filmes em Destaque", () => {
    cy.contains('.featured-movies', 'Filmes em destaque');
});

Then("devo ter acesso à lista de Mais Bem Avaliados", function () {
    cy.contains('.top-rated-movies', 'Mais bem avaliados');
});