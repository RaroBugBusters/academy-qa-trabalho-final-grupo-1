import { faker } from "@faker-js/faker";

Cypress.Commands.add("criaMockFilme", () => ({
  title: faker.lorem.words(5),
  genre: faker.lorem.words(5),
  description: faker.lorem.sentence(),
  durationInMinutes: faker.number.int({
    max: 43200,
    min: 1,
  }),
  releaseYear: faker.date.past().getFullYear(),
}));

Cypress.Commands.add("criaFilme", () => {
  cy.criaMockFilme().then((filme) => {
    cy.request({
      method: "POST",
      url: "/movies",
      body: filme,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(({ body: filmeCriado }) => {
      Cypress.env("filmeAtual", filmeCriado);
      return filmeCriado;
    });
  });
});

Cypress.Commands.add("deletaFilme", (id) => {
  const filmeId = id ?? Cypress.env("filmeAtual")?.id;

  if (filmeId) {
    cy.request({
      method: "DELETE",
      url: `/movies/${filmeId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(() => {
      Cypress.env("filmeAtual", null);
    });
  }
});

Cypress.Commands.add("criaERecuperaFilme", () => {
  cy.logaUsuarioAdmin().then(() => {
    cy.criaFilme().then((filme) => {
      cy.request({
        method: "GET",
        url: `/movies/${filme.id}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        const filme = response.body;
        Cypress.env("filmeAtual", filme);
        return filme;
      });
    });
  });
});

Cypress.Commands.add("recuperaFilme", (filmeId) => {
  cy.request({
    method: "GET",
    url: `/movies/${filmeId}`,
    headers: {
      Authorization: `Bearer ${Cypress.env("accessToken")}`,
    },
  }).then((response) => {
    return response.body;
  });
});

Cypress.Commands.add("criaFilmesGenericos", (quantidade) => {
  const filmes = [];

  cy.logaUsuarioAdmin()
    .then(() => {
      for (let i = 0; i < quantidade; i++) {
        cy.criaFilme().then((filme) => {
          cy.request({
            method: "GET",
            url: `/movies/${filme.id}`,
            headers: {
              Authorization: `Bearer ${Cypress.env("accessToken")}`,
            },
          }).then((response) => {
            const filme = response.body;
            filmes.push(filme);
            return filme;
          });
        });
      }
    })
    .then(() => {
      return filmes;
    });
});
