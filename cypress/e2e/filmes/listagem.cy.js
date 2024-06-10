import { filmesFixture } from "../../fixture/filmesFixture";

const verificaListaDeFilmes = (responseFilmes) => {
  const { body, status } = responseFilmes;
  const filmes = body.slice(0, 10);
  const filmeType = Object.values(filmesFixture.filme).map(
    (value) => typeof value,
  );

  expect(status).to.eq(200);
  expect(body).to.be.an("array");

  filmes.forEach((filme) => {
    expect(filme).to.have.property("title");
    expect(filme).to.have.property("description");
    expect(filme).to.have.property("totalRating");
    expect(filme).to.have.property("id");
  });

  filmes.forEach((filme) => {
    Object.entries(filmesFixture.filme).forEach(([key], i) => {
      if (key === "totalRating") {
        expect(filme[key]).to.satisfy(
          (val) => val === null || typeof val === filmeType[i],
        );
      } else {
        expect(filme[key]).to.be.a(filmeType[i]);
      }
    });
  });
};

describe("Listagem de filmes", () => {
  describe("Usuário não logado", () => {
    it("Deve ser retornado a lista de filmes", () => {
      cy.request("GET", "/movies").then(verificaListaDeFilmes);
    });
  });

  describe("Usuário logado", () => {
    beforeEach(() => {
      cy.logaUsuario().then(() => {});
    });

    afterEach(() => {
      cy.deletaUsuario().then(() => {});
    });

    it("Deve ser retornado a lista de filmes", () => {
      cy.request({
        method: "GET",
        url: "/movies",
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then(verificaListaDeFilmes);
    });
  });
});
