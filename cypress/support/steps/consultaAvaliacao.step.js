import {
  Before,
  Given,
  Then,
  When,
} from "@badeball/cypress-cucumber-preprocessor";
import { AvaliacaoDeFilmePage } from "../pages/avaliacaoDeFilmePagina";
import { ConsultaAvaliacaoPage } from "../pages/consultaAvaliacaoPagina";
import { GerenciamentoDeContaPage } from "../pages/gerenciamentoDeContaPage";
import { LoginUsuarioPage } from "../pages/loginUsuarioPage";

const consultaAvaliacaoPage = new ConsultaAvaliacaoPage();
const paginaLogin = new LoginUsuarioPage();
const paginaGerenciamentoDeConta = new GerenciamentoDeContaPage();
const movieRatingPage = new AvaliacaoDeFilmePage();
let nomeFilmeAvaliado;

Before(() => {
  cy.viewport("macbook-16");
  cy.intercept("POST", "/api/auth/login").as("authUser");
  cy.intercept("GET", "/api/users/**").as("getUser");
  cy.intercept("PUT", "/api/users/**").as("updateUser");
});

Given("que estou cadastrado e logado no sistema", () => {
  cy.registrarUsuario().then(() => {
    const email = Cypress.env("USUARIO_ATUAL").email;
    const password = Cypress.env("USUARIO_ATUAL").password;

    paginaLogin.visitar();
    paginaLogin.fazerLogin(email, password);

    cy.wait("@authUser");
    cy.wait("@getUser");
  });
});

Given("acesso a página do meu perfil", () => {
  consultaAvaliacaoPage.visitarMeuPerfil();
});

Given("realizo avaliação de filme", () => {
  consultaAvaliacaoPage.visitarPaginaInicial();
  consultaAvaliacaoPage.visitarPaginaDeFilme();
  movieRatingPage.rate();
  movieRatingPage.review("Um excelente filme");
  movieRatingPage.submit();
});

Given("atualizo a página do filme", () => {
  cy.reload();
});

Given("o filme contém minha nova avaliação", () => {
  const nome = Cypress.env("USUARIO_ATUAL").name;
  const avaliacao = "Um excelente filme";

  consultaAvaliacaoPage.verificaMinhaAvaliacaoNoFilme(nome, avaliacao);

  const filmeTitulo = "h1.movie-details-title";

  cy.get(filmeTitulo)
    .invoke("text")
    .then((text) => {
      nomeFilmeAvaliado = text;
    });
});

When("visualizo as minhas informações", () => {
  const email = Cypress.env("USUARIO_ATUAL").email.toLowerCase();
  const nome = Cypress.env("USUARIO_ATUAL").name;

  consultaAvaliacaoPage.verificarMinhasInformacoes(nome, email);
});

Then("minhas avaliações devem estar vazias", () => {
  consultaAvaliacaoPage.verificarMinhasReviewsEstaoVazias();
});

Then("minhas avaliações devem conter os filmes avaliados", () => {
  consultaAvaliacaoPage.verificarMinhasReviewsEstaoPreenchidas(
    nomeFilmeAvaliado,
  );
});

Given("que realizo o logout", () => {
  paginaGerenciamentoDeConta.logout();
});

When("eu tento consultar minhas avaliações", () => {
  consultaAvaliacaoPage.visitarMeuPerfil();
});

Then("devo ser redirecionado para a página de login", () => {
  cy.url().should(
    "eq",
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login",
  );
});
