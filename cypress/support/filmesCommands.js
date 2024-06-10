import { faker } from "@faker-js/faker";

Cypress.Commands.add("criaFilme", () => {
  return {
    title: faker.lorem.words(5),
    genre: faker.lorem.words(5),
    description: faker.lorem.sentence(),
    durationInMinutes: faker.number.int(140),
    releaseYear: faker.date.past().getFullYear(),
  };
});

Cypress.Commands.add("criaERecuperaFilme", () => {
  cy.logaUsuarioAdmin().then(() => {
    cy.criaFilme().then((filme) => {
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
            Cypress.env("filmeAtual", body[0]);
            return body[0];
          }
        );
      });
    });
  });
});
