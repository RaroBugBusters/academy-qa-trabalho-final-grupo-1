import {
  AfterAll,
  Before,
  BeforeAll,
  Given,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { ConsultaDeDetalhesDeFilmePage } from "../pages/consultaDeDetalhesDeFilmePage";

const consultaDeDetalhesDeFilmePage = new ConsultaDeDetalhesDeFilmePage();
let filme;

Before(() => {
  cy.viewport("macbook-16");
});

BeforeAll(() => {
  cy.userCreate();
  cy.userLogIn();
  cy.userMakeAdmin();
  cy.movieCreate().then(() => {
    cy.createReview().then(() => {
      cy.getMovie().then(() => {
        filme = Cypress.env("actualDetailMovie");
      });
    });
  });
});

AfterAll(() => {
  cy.userCreate();
  cy.userLogIn();
  cy.userMakeAdmin();
  cy.movieDelete();
  cy.userDelete();
});

Given("que eu acesso a página de detalhes de um filme", () => {
  consultaDeDetalhesDeFilmePage.visitarPaginaDeDetalhesDeFilme(filme.id);
});

Given("estou logado no sistema", () => {
  cy.userCreate();
  cy.userLogIn();
});

Given("consigo visualizar formulário de adição de avaliação", () => {
  consultaDeDetalhesDeFilmePage.verificarFormulario();
});

When("tenho acesso a todas as informações desse filme", () => {
  consultaDeDetalhesDeFilmePage.verificarTodosDetalhesDeFilme(filme);
});
