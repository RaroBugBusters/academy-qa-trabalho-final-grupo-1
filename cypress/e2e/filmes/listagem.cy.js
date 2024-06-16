import { filmeFixture } from "../../fixture/filmeFixture";

const verificaListaDeFilmes = (responseFilmes) => {
  const { body, status } = responseFilmes;
  const filmes = body.slice(0, 10);
  const filmeType = Object.values(filmeFixture.filme).map(
    (value) => typeof value,
  );

  expect(status).to.eq(200);
  expect(body).to.be.an("array");

  filmes.forEach((filme) => {
    expect(filme).to.have.property("title");
    expect(filme).to.have.property("description");
    expect(filme).to.have.property("totalRating");
    expect(filme).to.have.property("releaseYear");
    expect(filme).to.have.property("durationInMinutes");
    expect(filme).to.have.property("id");
  });

  filmes.forEach((filme) => {
    Object.entries(filmeFixture.filme).forEach(([key], i) => {
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

  describe("Usuário COMUM logado", () => {
    beforeEach(() => {
      cy.logaUsuario().then(() => {});
    });

    afterEach(() => {
      cy.deletaUsuario().then(() => {});
    });

    it("Deve ser retornado a lista de filmes", () => {
      const userTypeRegular = 0;
      const user = Cypress.env("usuarioAtual");

      expect(user.type).to.be.equal(userTypeRegular);

      cy.request({
        method: "GET",
        url: "/movies",
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then(verificaListaDeFilmes);
    });
  });

  describe("Usuário ADMIN logado", () => {
    beforeEach(() => {
      cy.logaUsuarioAdmin();
    });

    afterEach(() => {
      cy.deletaUsuario();
    });

    it("Deve ser retornado a lista de filmes", () => {
      const userTypeAdmin = 1;

      cy.recuperaUsuario((user) => {
        expect(user.type).to.be.equal(userTypeAdmin);

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

  describe("Usuário CRÍTICO logado", () => {
    beforeEach(() => {
      cy.logaUsuarioCritico();
    });

    afterEach(() => {
      cy.deletaUsuario();
    });

    it("Deve ser retornado a lista de filmes", () => {
      const userTypeCritic = 2;

      cy.recuperaUsuario((user) => {
        expect(user.type).to.be.equal(userTypeCritic);

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
});
