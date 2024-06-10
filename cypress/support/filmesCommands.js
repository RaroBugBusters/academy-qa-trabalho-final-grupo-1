import { faker } from "@faker-js/faker";

Cypress.Commands.add("criaMockFilme", () => ({
  title: faker.lorem.words(5),
  genre: faker.lorem.words(5),
  description: faker.lorem.sentence(),
  durationInMinutes: faker.number.int(140),
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

Cypress.Commands.add("deletaFilme", () => {
  const { id: filmeId } = Cypress.env("filmeAtual");

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
    cy.criaMockFilme().then((filme) => {
      cy.request({
        method: "POST",
        url: "/movies",
        body: filme,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then(() => {
        cy.request("GET", `/movies/search?title=${filme.title}`).then(
          ({ body }) => {
            const filmeCriado = body[0];
            Cypress.env("filmeAtual", filmeCriado);
            return filmeCriado;
          },
        );
      });
    });
  });
});
