describe("Consulta de detalhes de filmes", () => {
  let filme;
  let reviews = [];
  let criticsReviews = [];

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

  const verificaFilmeComDetalhes = (response) => {
    const { body: responseFilme, status } = response;

    expect(status).to.eq(200);
    expect(responseFilme).to.be.an("object");

    expect(responseFilme).to.have.property("id");
    expect(responseFilme.id).to.be.equal(filme.id);
    expect(responseFilme.id).to.be.a("number");

    expect(responseFilme).to.have.property("title");
    expect(responseFilme).to.have.property("description");
    expect(responseFilme).to.have.property("genre");
    expect(responseFilme).to.have.property("durationInMinutes");
    expect(responseFilme).to.have.property("releaseYear");
    expect(responseFilme).to.have.property("criticScore");
    expect(responseFilme).to.have.property("audienceScore");

    expect(responseFilme).to.have.property("reviews");
    expect(responseFilme.reviews).to.be.an("array");
    expect(responseFilme.reviews).to.have.length(reviews.length);

    responseFilme.reviews.forEach((review) => {
      verificaReview(review);
    });
  };

  const verificaReview = (review) => {
    const user = Cypress.env("usuarioAtual");

    expect(review).to.have.property("id");
    expect(review.id).to.be.a("number");

    expect(review).to.have.property("reviewText");
    expect(review.reviewText).to.be.a("string");

    expect(review).to.have.property("reviewType");
    expect(review.reviewType).to.be.a("number");

    expect(review).to.have.property("score");
    expect(review.score).to.be.a("number");

    expect(review).to.have.property("updatedAt");
    expect(new Date(review.updatedAt)).to.be.a("Date");

    expect(review).to.have.property("user");
    expect(review.user).to.be.an("object");
    expect(review.user).to.have.property("id");

    expect(review.user.id).to.be.equal(user.id);
    expect(review.user.id).to.be.a("number");

    expect(review.user).to.have.property("name");
    expect(review.user.name).to.be.a("string");

    expect(review.user).to.have.property("type");
    expect(review.user.type).to.be.a("number");
  };

  it("Usuário não logado deve acessar informações sobre filmes pelo ID", () => {
    cy.request("GET", `/movies/${filme.id}`).then(
      verificaFilmeComDetalhes,
      filme,
    );
  });

  it("Usuário logado deve acessar informações sobre filmes pelo ID", () => {
    cy.request({
      method: "GET",
      url: `/movies/${filme.id}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(verificaFilmeComDetalhes);
  });

  it("Deve listar todas as avaliações com data, nome do usuário, nota e texto da avaliação", () => {
    cy.criaReview(filme?.id)
      .then((reviewCriada) => {
        reviews.push(reviewCriada);
      })
      .then(() => {
        cy.request("GET", `/movies/${filme.id}`).then((response) => {
          verificaFilmeComDetalhes(response);
        });
      });
  });

  it("Deve calcular e exibir a média das avaliações dos usuários", () => {
    cy.criaReview(filme?.id).then((reviewCriada) => {
      reviews.push(reviewCriada);
      cy.criaReviewGenerica(filme?.id).then((reviewCriada) => {
        reviews.push(reviewCriada);
        cy.criaReviewGenerica(filme?.id).then((reviewCriada) => {
          reviews.push(reviewCriada);

          cy.request("GET", `/movies/${filme.id}`).then((response) => {
            const { body: responseFilme } = response;
            const { reviews: reviewsResponse } = responseFilme;

            const media = reviewsResponse.reduce(
              (acc, review) => acc + review.score,
              0,
            );

            expect(responseFilme).to.have.property("audienceScore");
            expect(responseFilme.audienceScore).to.be.equal(
              media / reviewsResponse.length,
            );
          });
        });
      });
    });
  });

  it("Deve calcular e exibir a média das avaliações dos críticos", () => {
    cy.criaReview(filme?.id).then((reviewCriada) => {
      reviews.push(reviewCriada);
      cy.criaReviewGenericaDeCritico(filme?.id).then((reviewCriada) => {
        criticsReviews.push(reviewCriada);
        cy.criaReviewGenericaDeCritico(filme?.id).then((reviewCriada) => {
          criticsReviews.push(reviewCriada);

          cy.request("GET", `/movies/${filme.id}`).then((response) => {
            const { body: responseFilme } = response;
            const { reviews: reviewsResponse } = responseFilme;

            const media = reviewsResponse.reduce((acc, review) => {
              if (review?.user?.type === 2) {
                return acc + review.score;
              }

              return acc;
            }, 0);

            const criticReviews = reviewsResponse.filter(
              (review) => review?.user?.type === 2,
            );

            expect(responseFilme).to.have.property("criticScore");
            expect(responseFilme.criticScore).to.be.equal(
              media / criticReviews.length,
            );
          });
        });
      });
    });
  });
});
