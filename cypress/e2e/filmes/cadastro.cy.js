import { errorsFixture } from "../../fixture/errorsFixture";

describe("Cadastro de filmes", () => {
  beforeEach(() => {
    cy.logaUsuarioAdmin();
  });

  afterEach(() => {
    cy.deletaFilme().then(() => {
      cy.deletaUsuario();
    });
  });

  describe("Quando o cadastro de um filme válido for criado por um usuário administrador é bem sucedido", () => {
    it("Deve criar um filme", () => {
      cy.criaMockFilme().then((filme) => {
        cy.request({
          method: "POST",
          url: "/movies",
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body: filmeCriado, status } = response;
          Cypress.env("filmeAtual", filmeCriado);

          expect(status).to.eq(201);
          expect(filmeCriado).not.to.be.undefined;
          expect(filmeCriado).to.have.property("id");

          expect(filmeCriado).to.have.property("title", filme.title);
          expect(filmeCriado.title).to.eq(filme.title);

          expect(filmeCriado).to.have.property("genre", filme.genre);
          expect(filmeCriado.genre).to.eq(filme.genre);

          expect(filmeCriado).to.have.property(
            "description",
            filme.description
          );
          expect(filmeCriado.description).to.eq(filme.description);

          expect(filmeCriado).to.have.property(
            "durationInMinutes",
            filme.durationInMinutes
          );
          expect(filmeCriado.durationInMinutes).to.eq(filme.durationInMinutes);

          expect(filmeCriado).to.have.property(
            "releaseYear",
            filme.releaseYear
          );
          expect(filmeCriado.releaseYear).to.eq(filme.releaseYear);
        });
      });
    });
  });

  describe("Quando o cadastro NÃO é bem sucedido devido a erros 400 (Bad Request) ", () => {
    it("Deve retornar erro ao tentar criar um filme com informação de título vazia", () => {
      cy.criaMockFilme().then((filme) => {
        filme.title = "";

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.title.empty,
            errorsFixture.messages.title.minLength
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com informação de título maior que cem caracteres", () => {
      cy.criaMockFilme().then((filme) => {
        filme.title = "f".repeat(101);

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.title.maxLength
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com informação de gênero vazia", () => {
      cy.criaMockFilme().then((filme) => {
        filme.genre = "";

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.genre.empty,
            errorsFixture.messages.genre.minLength
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com informação de gênero maior que cem caracteres", () => {
      cy.criaMockFilme().then((filme) => {
        filme.genre = "f".repeat(101);

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.genre.maxLength
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com informação de descrição vazia", () => {
      cy.criaMockFilme().then((filme) => {
        filme.description = "";

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.description.empty,
            errorsFixture.messages.description.minLength
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com informação de descrição maior que 500 caracteres", () => {
      cy.criaMockFilme().then((filme) => {
        filme.description = "f".repeat(501);

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.description.maxLength
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com informação de duração menor que 1 minuto", () => {
      cy.criaMockFilme().then((filme) => {
        filme.durationInMinutes = 0;

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.durationInMinutes.min
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com informação de duração maior que 720 horas ou 43200 minutos", () => {
      cy.criaMockFilme().then((filme) => {
        filme.durationInMinutes = 720 * 60 + 1;

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.durationInMinutes.max
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com ano de lançamento anterior a 1895", () => {
      cy.criaMockFilme().then((filme) => {
        filme.releaseYear = 1894;

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.releaseYear.min
          );
        });
      });
    });

    it("Deve retornar erro ao tentar criar um filme com ano de lançamento posterior ao ano atual", () => {
      cy.criaMockFilme().then((filme) => {
        filme.releaseYear = new Date().getFullYear() + 1;

        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then((response) => {
          const { body, status } = response;

          expect(status).to.eq(errorsFixture.code.badRequest);
          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(errorsFixture.code.badRequest);
          expect(body.message).to.include(
            errorsFixture.messages.releaseYear.max
          );
        });
      });
    });
  });

  describe("Quando o cadastro NÃO é bem sucedido devido a erros de autorização", () => {
    it("Deve retornar erro sem estar autenticado", () => {
      cy.criaMockFilme().then((filme) => {
        cy.request({
          method: "POST",
          url: "/movies",
          failOnStatusCode: false,
          body: filme,
        }).then((response) => {
          const { body, status } = response;
          expect(status).to.eq(errorsFixture.code.unauthorized);

          expect(body.error).to.eq(errorsFixture.type.unauthorized);
          expect(body.statusCode).to.eq(errorsFixture.code.unauthorized);
          expect(body.message).to.include(errorsFixture.messages.unauthorized);
        });
      });
    });
  });

  describe("Quando o cadastro NÃO é bem sucedido devido a erros de permissão", () => {
    it("Deve retornar erro se estiver autenticado como usuário comum", () => {
      cy.logaUsuario().then(() => {
        cy.criaMockFilme().then((filme) => {
          cy.request({
            method: "POST",
            url: "/movies",
            failOnStatusCode: false,
            body: filme,
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
          }).then((response) => {
            const { body, status } = response;

            expect(status).to.eq(errorsFixture.code.forbidden);
            expect(body.statusCode).to.eq(errorsFixture.code.forbidden);
            expect(body.message).to.include(errorsFixture.type.forbidden);
          });
        });
      });
    });

    it("Deve retornar erro se estiver autenticado como usuário crítico", () => {
      cy.logaUsuarioCritico().then(() => {
        cy.criaMockFilme().then((filme) => {
          cy.request({
            method: "POST",
            url: "/movies",
            failOnStatusCode: false,
            body: filme,
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
          }).then((response) => {
            const { body, status } = response;

            expect(status).to.eq(errorsFixture.code.forbidden);
            expect(body.statusCode).to.eq(errorsFixture.code.forbidden);
            expect(body.message).to.include(errorsFixture.type.forbidden);
          });
        });
      });
    });
  });
});
