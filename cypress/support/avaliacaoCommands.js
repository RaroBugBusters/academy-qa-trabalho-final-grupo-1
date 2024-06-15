import { faker } from "@faker-js/faker";

Cypress.Commands.add("criaMockReview", (movieId) => {
  return {
    movieId,
    score: faker.number.float({ min: 0, max: 5, multipleOf: 0.01 }),
    reviewText: faker.lorem.sentence(),
  };
});

Cypress.Commands.add("criaReview", (movieId) => {
  cy.criaMockReview(movieId).then((reviewCriada) => {
    cy.request({
      method: "POST",
      url: "/users/review",
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      body: reviewCriada,
    }).then(()=> {
      return reviewCriada;
    })
  });
});

Cypress.Commands.add("criaReviewGenerica", (movieId) => {
  cy.criaMockUsuario().then((usuarioCriado) => {
    cy.request("POST", "/users", usuarioCriado)
      .then(() => {
        cy.request("POST", `/auth/login`, {
          email: usuarioCriado.email,
          password: usuarioCriado.password,
        });
      })
      .then(({ body }) => {
        cy.criaMockReview(movieId).then((reviewCriada) => {
          cy.request({
            method: "POST",
            url: "/users/review",
            headers: {
              Authorization: `Bearer ${body.accessToken}`,
            },
            body: reviewCriada,
          });
        });
      });
  });
});

Cypress.Commands.add("criaReviewGenericaDeCritico", (movieId) => {
  cy.criaMockUsuario().then((usuarioCriado) => {
    cy.request("POST", "/users", usuarioCriado)
      .then(() => {
        cy.request("POST", `/auth/login`, {
          email: usuarioCriado.email,
          password: usuarioCriado.password,
        });
      })
      .then(({ body }) => {
        cy.request({
          method: "PATCH",
          url: "/users/apply",
          headers: {
            Authorization: `Bearer ${body.accessToken}`,
          },
        }).then(() => {
          cy.criaMockReview(movieId).then((reviewCriada) => {
            cy.request({
              method: "POST",
              url: "/users/review",
              headers: {
                Authorization: `Bearer ${body.accessToken}`,
              },
              body: reviewCriada,
            });
          });
        });
      });
  });
});

Cypress.Commands.add("listaReviews", () => {
  cy.logaUsuarioAdmin().then(() => {
    cy.request({
      method: 'GET',
      url: '/users/review/all',
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      }
    });
  });
});
