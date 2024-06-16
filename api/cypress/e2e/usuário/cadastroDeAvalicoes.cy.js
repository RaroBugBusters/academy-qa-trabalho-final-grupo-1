import { errorsFixture } from "../../fixture/errorsFixture";
import { StatusCode } from "../../support/utils/StatusCode";

describe("Cadastro de Avaliação", () => {
  beforeEach(() => {
    cy.criaERecuperaFilme();
  });

  afterEach(() => {
    cy.logaUsuarioAdmin().then(() => {
      cy.deletaFilme().then(() => {
        cy.deletaUsuario();
      });
    });
  });

  describe("Quando o cadastro de avaliação por usuários autenticados em um filme válido é bem sucedido", () => {
    it("Deve criar uma nova avaliação de audiência", () => {
      const filme = Cypress.env("filmeAtual");
      cy.logaUsuario().then(() => {
        cy.criaMockReview(filme.id).then((reviewCriada) => {
          cy.request({
            method: "POST",
            url: "/users/review",
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
            body: reviewCriada,
          }).then((response) => {
            expect(response.status).to.be.eq(StatusCode.CREATED);

            cy.recuperaFilme(filme.id).then((filmeDepois) => {
              const user = Cypress.env("usuarioAtual");
              const usuarioTipoComum = 0;
              const reviewDoUsuario = filmeDepois.reviews.find(
                (review) => review.user.id === user.id
              );

              expect(reviewDoUsuario.score).to.be.eq(reviewCriada.score);
              expect(reviewDoUsuario.reviewText).to.be.eq(
                reviewCriada.reviewText
              );

              expect(filmeDepois.reviews.length).to.be.eq(1);
              expect(filmeDepois.reviews[0]).to.deep.include({
                ...reviewDoUsuario,
                user: {
                  id: user.id,
                  name: user.name,
                  type: usuarioTipoComum,
                },
              });
            });
          });
        });
      });
    });

    // BUG: O texto da avaliação não é obrigatório
    it("Deve criar uma nova avaliação com o texto de review vazio", () => {
      const filme = Cypress.env("filmeAtual");
      cy.logaUsuario().then(() => {
        cy.criaMockReview(filme.id).then((reviewCriada) => {
          reviewCriada.reviewText = "";

          cy.request({
            method: "POST",
            url: "/users/review",
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
            body: reviewCriada,
          }).then((response) => {
            expect(response.status).to.be.eq(201);

            cy.recuperaFilme(filme.id).then((filmeDepois) => {
              const user = Cypress.env("usuarioAtual");
              const usuarioTipoComum = 0;
              const reviewDoUsuario = filmeDepois.reviews.find(
                (review) => review.user.id === user.id
              );

              expect(reviewDoUsuario.score).to.be.eq(reviewCriada.score);
              expect(reviewDoUsuario.reviewText).to.be.eq(
                reviewCriada.reviewText
              );

              expect(filmeDepois.reviews.length).to.be.eq(1);
              expect(filmeDepois.reviews[0]).to.deep.include({
                ...reviewDoUsuario,
                user: {
                  id: user.id,
                  name: user.name,
                  type: usuarioTipoComum,
                },
              });
            });
          });
        });
      });
    });

    it("Deve criar uma nova avaliação de crítico", () => {
      const filme = Cypress.env("filmeAtual");

      cy.logaUsuarioAdmin().then(() => {
        cy.criaMockReview(filme.id).then((reviewCriada) => {
          cy.request({
            method: "POST",
            url: "/users/review",
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
            body: reviewCriada,
          }).then((response) => {
            expect(response.status).to.be.eq(StatusCode.CREATED);

            cy.recuperaFilme(filme.id).then((filmeDepois) => {
              const user = Cypress.env("usuarioAtual");
              const usuarioTipoCritico = 1;
              const reviewDoUsuario = filmeDepois.reviews.find(
                (review) => review.user.id === user.id
              );

              expect(reviewDoUsuario.score).to.be.eq(reviewCriada.score);
              expect(reviewDoUsuario.reviewText).to.be.eq(
                reviewCriada.reviewText
              );

              expect(filmeDepois.reviews.length).to.be.eq(1);
              expect(filmeDepois.reviews[0]).to.deep.include({
                ...reviewDoUsuario,
                user: {
                  id: user.id,
                  name: user.name,
                  type: usuarioTipoCritico,
                },
              });
            });
          });
        });
      });
    });
  });

  describe("Quando o cadastro de avaliação refletir nos dados do filme", () => {
    it("Deve atualizar a quantidade de avaliações de audiência do filme", () => {
      const filmeAntes = { ...Cypress.env("filmeAtual") };

      cy.criaMockReview(filmeAntes.id).then((reviewCriada) => {
        cy.request({
          method: "POST",
          url: "/users/review",
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          body: reviewCriada,
        }).then((response) => {
          expect(response.status).to.be.eq(StatusCode.CREATED);

          cy.recuperaFilme(filmeAntes.id).then((filmeDepois) => {
            expect(filmeDepois.reviews.length).to.be.eq(
              filmeAntes.reviews.length + 1
            );
          });
        });
      });
    });

    it("Deve atualizar a média das avaliações da audiência do filme", () => {
      const filmeAntes = { ...Cypress.env("filmeAtual") };

      cy.criaMockReview(filmeAntes.id).then((reviewCriada) => {
        cy.request({
          method: "POST",
          url: "/users/review",
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          body: reviewCriada,
        }).then((response) => {
          expect(response.status).to.be.eq(StatusCode.CREATED);

          cy.recuperaFilme(filmeAntes.id).then((filmeDepois) => {
            const media = filmeDepois.reviews.reduce(
              (acc, review) => acc + review.score,
              0
            );

            expect(filmeDepois.audienceScore).to.be.eq(
              media / filmeDepois.reviews.length
            );

            cy.logaUsuarioAdmin(() => {
              cy.criaReviewGenerica(filmeAntes.id);

              cy.recuperaFilme(filmeAntes.id).then((filmeDepois) => {
                const media = filmeDepois.reviews.reduce(
                  (acc, review) => acc + review.score,
                  0
                );
                expect(filmeDepois.audienceScore).to.be.eq(
                  media / filmeDepois.reviews.length
                );
              });
            });
          });
        });
      });
    });

    it("Deve atualizar a quantidade de avaliações de crítico do filme", () => {
      const filmeAntes = { ...Cypress.env("filmeAtual") };

      cy.logaUsuarioCritico().then(() => {
        cy.criaMockReview(filmeAntes.id).then((reviewCriada) => {
          cy.request({
            method: "POST",
            url: "/users/review",
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
            body: reviewCriada,
          }).then((response) => {
            expect(response.status).to.be.eq(StatusCode.CREATED);

            cy.recuperaFilme(filmeAntes.id).then((filmeDepois) => {
              expect(filmeDepois.reviews.length).to.be.eq(
                filmeAntes.reviews.length + 1
              );
            });
          });
        });
      });
    });

    it("Deve atualizar a média das avaliações de crítico do filme", () => {
      const filmeAntes = { ...Cypress.env("filmeAtual") };

      cy.logaUsuarioCritico().then(() => {
        cy.criaMockReview(filmeAntes.id).then((reviewCriada) => {
          cy.request({
            method: "POST",
            url: "/users/review",
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
            body: reviewCriada,
          }).then((response) => {
            expect(response.status).to.be.eq(StatusCode.CREATED);

            cy.recuperaFilme(filmeAntes.id).then((filmeDepois) => {
              const media = filmeDepois.reviews.reduce(
                (acc, review) => acc + review.score,
                0
              );

              expect(filmeDepois.criticScore).to.be.eq(
                media / filmeDepois.reviews.length
              );

              cy.logaUsuarioAdmin(() => {
                cy.criaReviewGenerica(filmeAntes.id);

                cy.recuperaFilme(filmeAntes.id).then((filmeDepois) => {
                  const media = filmeDepois.reviews.reduce(
                    (acc, review) => acc + review.score,
                    0
                  );
                  expect(filmeDepois.criticScore).to.be.eq(
                    media / filmeDepois.reviews.length
                  );
                });
              });
            });
          });
        });
      });
    });
  });

  describe("Quando o cadastro de avaliação NÃO é bem sucedido devido a erros de autorização", () => {
    it("Deve retornar status 401 Unauthorized", () => {
      const filme = Cypress.env("filmeAtual");

      cy.criaMockReview(filme.id).then((reviewCriada) => {
        cy.request({
          method: "POST",
          url: "/users/review",
          body: reviewCriada,
          failOnStatusCode: false,
        }).then(({ body, status }) => {
          expect(status).to.eq(StatusCode.UNAUTHORIZED);

          expect(body.error).to.eq(errorsFixture.type.unauthorized);
          expect(body.statusCode).to.eq(StatusCode.UNAUTHORIZED);
          expect(body.message).to.include(errorsFixture.messages.unauthorized);
        });
      });
    });
  });

  describe("Quando o cadastro de avaliação NÃO é bem sucedido devido a filme não encontrado", () => {
    it("Deve retornar status 404 Not found", () => {
      const filme = Cypress.env("filmeAtual");
      cy.deletaFilme().then(() => {
        cy.criaMockReview(filme.id).then((reviewCriada) => {
          cy.request({
            method: "POST",
            url: "/users/review",
            body: reviewCriada,
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
            failOnStatusCode: false,
          }).then(({ body, status }) => {
            expect(status).to.eq(StatusCode.NOT_FOUND);

            expect(body.error).to.eq(errorsFixture.type.notFound);
            expect(body.statusCode).to.eq(StatusCode.NOT_FOUND);
            expect(body.message).to.include(
              errorsFixture.messages.movieNotFound
            );
          });
        });
      });
    });
  });

  describe("Quando o cadastro de avaliação NÃO é bem sucedido devido a erros de validação/bad request", () => {
    it("Deve retornar status 400 Bad Request quando o texto da avaliação é maior que 500 caracteres", () => {
      const filme = Cypress.env("filmeAtual");

      cy.criaMockReview(filme.id).then((reviewCriada) => {
        reviewCriada.reviewText = "a".repeat(501);
        cy.request({
          method: "POST",
          url: "/users/review",
          body: reviewCriada,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          failOnStatusCode: false,
        }).then(({ body, status }) => {
          expect(status).to.eq(StatusCode.BAD_REQUEST);

          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(StatusCode.BAD_REQUEST);
          expect(body.message).to.include(
            errorsFixture.messages.reviewText.maxLength
          );
        });
      });
    });

    it("Deve retornar status 400 Bad Request quando a nota da avaliação estiver vazia", () => {
      const filme = Cypress.env("filmeAtual");

      cy.criaMockReview(filme.id).then((reviewCriada) => {
        reviewCriada.score = null;
        cy.request({
          method: "POST",
          url: "/users/review",
          body: reviewCriada,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          failOnStatusCode: false,
        }).then(({ body, status }) => {
          expect(status).to.eq(StatusCode.BAD_REQUEST);

          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(StatusCode.BAD_REQUEST);
          expect(body.message).to.include(
            errorsFixture.messages.score.empty,
            errorsFixture.messages.score.number
          );
        });
      });
    });

    it("Deve retornar status 400 Bad Request quando a nota da avaliação é menor do que intervalo permitido (1-5)", () => {
      const filme = Cypress.env("filmeAtual");

      cy.criaMockReview(filme.id).then((reviewCriada) => {
        reviewCriada.score = 0;
        cy.request({
          method: "POST",
          url: "/users/review",
          body: reviewCriada,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          failOnStatusCode: false,
        }).then(({ body, status }) => {
          expect(status).to.eq(StatusCode.BAD_REQUEST);

          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(StatusCode.BAD_REQUEST);
          expect(body.message).to.include(
            errorsFixture.messages.score.interval
          );
        });
      });
    });

    it("Deve retornar status 400 Bad Request quando a nota da avaliação é maior do que intervalo permitido (1-5)", () => {
      const filme = Cypress.env("filmeAtual");

      cy.criaMockReview(filme.id).then((reviewCriada) => {
        reviewCriada.score = 6;
        cy.request({
          method: "POST",
          url: "/users/review",
          body: reviewCriada,
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          failOnStatusCode: false,
        }).then(({ body, status }) => {
          expect(status).to.eq(StatusCode.BAD_REQUEST);

          expect(body.error).to.eq(errorsFixture.type.badRequest);
          expect(body.statusCode).to.eq(StatusCode.BAD_REQUEST);
          expect(body.message).to.include(
            errorsFixture.messages.score.interval
          );
        });
      });
    });
  });
});
