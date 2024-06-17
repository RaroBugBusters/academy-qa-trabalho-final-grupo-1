import { errorsFixture } from "../../fixture/errorsFixture";
import { StatusCode } from "../../support/utils/StatusCode";

describe("Cadastro de filmes", () => {
  describe("Quando um usuário admin deletar um filme válido ", () => {
    let filme;

    beforeEach(() => {
      cy.logaUsuarioAdmin().then(() => {
        cy.criaFilme().then((filmeCriado) => {
          filme = filmeCriado;
        });
      });
    });

    afterEach(() => {
      cy.deletaFilme().then(() => {
        cy.deletaUsuario();
      });
    });

    it("então deve deletar o filme", () => {
      const userTypeAdmin = 1;

      cy.recuperaUsuario((user) => {
        expect(filme.id).to.exist;
        expect(user.type).to.be.equal(userTypeAdmin);

        cy.request({
          method: "DELETE",
          url: `/movies/${filme.id}`,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then(({ status }) => {
          expect(status).to.be.equal(204);
          Cypress.env("filmeAtual", null);

          // Verifica se o filme foi deletado
          cy.recuperaFilme(filme?.id).then((response) => {
            expect(response).to.not.have.property("id");
          });
        });
      });
    });
  });

  describe("Quando um usuário comum deletar um filme válido ", () => {
    let filme;

    beforeEach(() => {
      cy.logaUsuarioAdmin().then(() => {
        cy.criaFilme().then((filmeCriado) => {
          filme = filmeCriado;
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

    it("então deve ocorrer um erro 403", () => {
      cy.logaUsuario().then(() => {
        cy.recuperaUsuario().then((user) => {
          const userTypeRegular = 0;

          expect(user.type).to.be.equal(userTypeRegular);
          expect(filme.id).to.exist;

          cy.request({
            method: "DELETE",
            url: `/movies/${filme.id}`,
            failOnStatusCode: false,
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
          }).then(({ body, status }) => {
            expect(status).to.eq(StatusCode.FORBIDDEN);
            Cypress.env("filmeAtual", null);

            expect(body.statusCode).to.eq(StatusCode.FORBIDDEN);
            expect(body.message).to.include(errorsFixture.type.forbidden);
          });
        });
      });
    });
  });

  describe("Quando um usuário crítico deletar um filme válido ", () => {
    let filme;

    beforeEach(() => {
      cy.logaUsuarioAdmin().then(() => {
        cy.criaFilme().then((filmeCriado) => {
          filme = filmeCriado;
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

    it("então deve ocorrer um erro 403", () => {
      cy.logaUsuarioCritico().then(() => {
        cy.recuperaUsuario().then((user) => {
          const userTypeRegular = 2;

          expect(user.type).to.be.equal(userTypeRegular);
          expect(filme.id).to.exist;

          cy.request({
            method: "DELETE",
            url: `/movies/${filme.id}`,
            failOnStatusCode: false,
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
          }).then(({ body, status }) => {
            expect(status).to.eq(StatusCode.FORBIDDEN);
            Cypress.env("filmeAtual", null);

            expect(body.statusCode).to.eq(StatusCode.FORBIDDEN);
            expect(body.message).to.include(errorsFixture.type.forbidden);
          });
        });
      });
    });
  });

  describe("Quando um usuário não autenticado deletar um filme válido ", () => {
    let filme;

    beforeEach(() => {
      cy.logaUsuarioAdmin().then(() => {
        cy.criaFilme().then((filmeCriado) => {
          filme = filmeCriado;
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

    it("então deve ocorrer um erro 403", () => {
      expect(filme.id).to.exist;

      cy.request({
        method: "DELETE",
        url: `/movies/${filme.id}`,
        failOnStatusCode: false,
      }).then(({ body, status }) => {
        expect(status).to.eq(StatusCode.UNAUTHORIZED);
        Cypress.env("filmeAtual", null);

        expect(body.statusCode).to.eq(StatusCode.UNAUTHORIZED);
        expect(body.message).to.include(errorsFixture.messages.unauthorized);
      });
    });
  });
});
