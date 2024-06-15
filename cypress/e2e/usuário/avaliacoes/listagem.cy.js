import { errorsFixture } from "../../../fixture/errorsFixture";

describe("Listagem de Avaliações do usuário", () => {
  let filmes = [];
  let reviewsCriadas = [];
  let usuarioAtual;

  beforeEach(() => {
    cy.criaFilmesGenericos(3).then((filmesCriados) => {
      filmes = filmesCriados;
      cy.logaUsuario().then(() => {
        usuarioAtual = Cypress.env("usuarioAtual");

        filmes.forEach((filme) => {
          cy.criaReview(filme.id).then((review) => {
            reviewsCriadas.push(review);
          });
        });
      });
    });
  });

  afterEach(() => {
    cy.deletaUsuario().then(() => {
      cy.logaUsuarioAdmin()
        .then(() => {
          filmes.forEach((filme) => {
            cy.deletaFilme(filme.id);
          });
        })
        .then(() => {
          cy.deletaUsuario();
          filmes = [];
        });
    });
  });

  describe("Quando o usuário consultar suas avaliações", () => {
    it("Então deve ver toda sua lista de avaliações", () => {
      cy.request({
        method: "GET",
        url: "/users/review/all",
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then(({ body: reviews }) => {
        expect(reviews).to.have.length(filmes.length);
        filmes.forEach((filme, index) => {
          expect(reviews[index].movieId).to.eq(filme.id);

          filme.reviews.forEach((review) => {
            expect(review).to.have.property("movieId");
            expect(review.movieId).to.eq(filme.id);
            expect(review).to.have.property("score");
            expect(review).to.have.property("reviewText");
            expect(review).to.have.property("reviewText");
            expect(review).to.have.property("textType");
          });
        });
      });
    });

    it("Então deve ver apenas suas avaliações", () => {
      const filme = filmes[0];

      cy.criaReviewGenerica(filme.id).then(() => {
        cy.request({
          method: "GET",
          url: "/users/review/all",
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then(({ body: reviews }) => {
          cy.recuperaFilme(filme.id).then((filmeRecuperado) => {
            filmeRecuperado.reviews.find((review) => {
              const reviewEncontrada = reviews.find(
                (review) => review.movieId === filme.id
              );

              expect(reviewEncontrada).to.exist;

              if (reviewEncontrada) {
                expect(reviewEncontrada.movieId).to.eq(filme.id);
              }
            });
          });
        });
      });
    });

    it("Então deve poder ser possível acessar os detalhes do filme que foi avaliado", () => {
      cy.request({
        method: "GET",
        url: "/users/review/all",
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then(({ body: reviews }) => {
        expect(reviews).to.have.length(filmes.length);

        reviews.forEach((review) => {
          cy.recuperaFilme(review.movieId).then((filme) => {
            expect(filme).to.exist;
          });
        });
      });
    });
  });

  describe("Quando o usuário faz uma avaliação em um filme que já avaliou anteriormente", () => {
    it("Então deve atualizar a avaliação", () => {
      const filme = filmes[0];
      const novaReview = {
        movieId: filme.id,
        score: 5,
        reviewText: "Nova avaliação",
      };

      cy.request({
        method: "POST",
        url: "/users/review",
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: novaReview,
      }).then(() => {
        cy.request({
          method: "GET",
          url: "/users/review/all",
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then(({ body: reviews }) => {
          const reviewAtualizada = reviews.find(
            (review) => review.movieId === filme.id
          );

          expect(reviewAtualizada).to.exist;
          expect(reviewAtualizada.score).to.eq(novaReview.score);
          expect(reviewAtualizada.reviewText).to.eq(novaReview.reviewText);
        });
      });
    });

    it("Então deve conter a nova avaliação no filme", () => {
      const filme = filmes[0];
      const novaReview = {
        movieId: filme.id,
        score: 5,
        reviewText: "Nova avaliação",
      };

      cy.request({
        method: "POST",
        url: "/users/review",
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: novaReview,
      }).then(() => {
        cy.recuperaFilme(filme.id).then((filmeRecuperado) => {
          cy.request({
            method: "GET",
            url: "/users/review/all",
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
          }).then(({ body: reviews }) => {
            const reviewDoFilme = reviews.find(
              (review) => review.movieId === filme.id
            );

            const reviewAtualizada = filmeRecuperado.reviews.find(
              (review) => reviewDoFilme.movieId === filme.id
            );

            expect(reviewAtualizada).to.exist;
            expect(reviewAtualizada.score).to.eq(novaReview.score);
            expect(reviewAtualizada.reviewText).to.eq(novaReview.reviewText);
          });
        });
      });
    });

    it("Então usuário deve manter a quantidade de avaliações", () => {
      const filme = filmes[0];
      const novaReview = {
        movieId: filme.id,
        score: 5,
        reviewText: "Nova avaliação",
      };

      cy.request({
        method: "POST",
        url: "/users/review",
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: novaReview,
      }).then(() => {
        cy.request({
          method: "GET",
          url: "/users/review/all",
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        }).then(({ body: reviews }) => {
          expect(reviews).to.have.length(filmes.length);
        });
      });
    });

    it("Então filme deve manter a quantidade de avaliações", () => {
      const filme = filmes[0];
      const novaReview = {
        movieId: filme.id,
        score: 5,
        reviewText: "Nova avaliação",
      };
      cy.recuperaFilme(filme.id).then((filmeAntesDaAvaliacao) => {
        cy.request({
          method: "POST",
          url: "/users/review",
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
          body: novaReview,
        }).then(() => {
          cy.recuperaFilme(filme.id).then((filmeDepoisDaAvaliacao) => {
            expect(filmeDepoisDaAvaliacao.reviews).to.have.length(
              filmeAntesDaAvaliacao.reviews.length
            );
          });
        });
      });
    });
  });

  describe("Quando o usuário não está autenticado e consultar suas avaliações", () => {
    it("Então deve ocorrer um erro 401", () => {
      cy.request({
        method: "GET",
        url: "/users/review/all",
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
