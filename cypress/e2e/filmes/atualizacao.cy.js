import { filmesErrorsFixture } from "../fixture/filmes/errorsFixture";

describe("Atualização de filmes", () => {
  let filme = Cypress.env("filmeAtual");
  let novoFilme = {
    ...filme,
    title: "Filme editado",
    genre: "Comédia",
    description: "Descrição editada",
    durationInMinutes: 120,
    releaseYear: 2020,
  };

  beforeEach(() => {
    cy.logaUsuarioAdmin().then(() => {
      cy.criaFilme().then(() => {
        filme = Cypress.env("filmeAtual");
      });
    });
  });

  afterEach(() => {
    cy.logaUsuarioAdmin().then(() => {
      cy.deletaFilme().then(() => {
        cy.deletaUsuario();
      });
    });
  });

  describe("Quando o cadastro de um filme válido for criado por um usuário administrador é bem sucedido", () => {
    it("Deve editar e atualizar um filme", () => {
      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { status } = response;

        expect(status).to.eq(204);
      });
    });
  });

  describe("Quando o cadastro NÃO é bem sucedido devido a erros 400 (Bad Request) ", () => {
    it("Deve retornar erro ao tentar atualizar um filme com informação de título vazia", () => {
      novoFilme.title = "";

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.title.minLength
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com informação de título maior que cem caracteres", () => {
      novoFilme.title = "f".repeat(101);

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.title.maxLength
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com informação de gênero vazia", () => {
      novoFilme.genre = "";

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.genre.minLength
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com informação de gênero maior que cem caracteres", () => {
      novoFilme.genre = "f".repeat(101);

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.genre.maxLength
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com informação de descrição vazia", () => {
      novoFilme.description = "";

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.description.minLength
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com informação de descrição maior que 500 caracteres", () => {
      novoFilme.description = "f".repeat(501);

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.description.maxLength
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com informação de duração menor que 1 minuto", () => {
      novoFilme.durationInMinutes = 0;

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.durationInMinutes.min
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com informação de duração maior que 720 horas ou 43200 minutos", () => {
      novoFilme.durationInMinutes = 720 * 60 + 1;

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.durationInMinutes.max
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com ano de lançamento anterior a 1895", () => {
      novoFilme.releaseYear = 1894;

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.releaseYear.min
        );
      });
    });

    it("Deve retornar erro ao tentar atualizar um filme com ano de lançamento posterior ao ano atual", () => {
      novoFilme.releaseYear = new Date().getFullYear() + 1;

      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
        body: novoFilme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.error).to.eq(filmesErrorsFixture.type.badRequest);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.badRequest);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.releaseYear.max
        );
      });
    });
  });

  describe("Quando a atualização NÃO é bem sucedido devido a erros de autorização", () => {
    it("Deve retornar erro sem estar autenticado", () => {
      cy.request({
        method: "PUT",
        url: `/movies/${filme.id}`,
        body: novoFilme,
        failOnStatusCode: false,
      }).then((response) => {
        const { body, status } = response;

        expect(status).to.eq(filmesErrorsFixture.code.unauthorized);
        expect(body.error).to.eq(filmesErrorsFixture.type.unauthorized);
        expect(body.statusCode).to.eq(filmesErrorsFixture.code.unauthorized);
        expect(body.message).to.include(
          filmesErrorsFixture.messages.unauthorized
        );
      });
    });
  });

  describe("Quando o cadastro NÃO é bem sucedido devido a erros de permissão", () => {
    it("Deve retornar erro se estiver autenticado como usuário comum", () => {
      cy.logaUsuario().then(() => {
        cy.request({
          method: "PUT",
          url: `/movies/${filme.id}`,
          body: novoFilme,
          failOnStatusCode: false,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(filmesErrorsFixture.code.forbidden);
          expect(body.statusCode).to.eq(filmesErrorsFixture.code.forbidden);
          expect(body.message).to.include(filmesErrorsFixture.type.forbidden);
        });
      });
    });

    it("Deve retornar erro se estiver autenticado como usuário crítico", () => {
      cy.logaUsuarioCritico().then(() => {
        cy.request({
          method: "PUT",
          url: `/movies/${filme.id}`,
          failOnStatusCode: false,
          body: novoFilme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(filmesErrorsFixture.code.forbidden);
          expect(body.statusCode).to.eq(filmesErrorsFixture.code.forbidden);
          expect(body.message).to.include(filmesErrorsFixture.type.forbidden);
        });
      });
    });
  });
});
