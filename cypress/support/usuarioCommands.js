import { faker } from "@faker-js/faker";

Cypress.Commands.add('criaUsuario', () => {
  const fakeUserData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 })
};
return cy.request({
    method: 'POST',
    url: '/users',
    body: fakeUserData
})
    .then((response) => {
        expect(response.status).to.equal(201);
        return fakeUserData;
  });
});

Cypress.Commands.add("logaUsuario", () => {
  cy.criaUsuario().then((usuarioCriado) => {
    cy.request("POST", "/users", usuarioCriado)
      .then(({ body }) => {
        Cypress.env("usuarioAtual", body);

        cy.request("POST", `/auth/login`, {
          email: usuarioCriado.email,
          password: usuarioCriado.password,
        });
      })
      .then(({ body }) => {
        Cypress.env("accessToken", body.accessToken);
      });
  });
});

Cypress.Commands.add("logaUsuarioAdmin", () => {
  cy.criaUsuario().then((usuarioCriado) => {
    cy.request("POST", "/users", usuarioCriado)
      .then(({ body }) => {
        body.type = 1;
        Cypress.env("usuarioAtual", body);

        cy.request("POST", `/auth/login`, {
          email: usuarioCriado.email,
          password: usuarioCriado.password,
        });
      })
      .then(({ body }) => {
        Cypress.env("accessToken", body.accessToken);
      })
      .then(() => {
        cy.request({
          method: "PATCH",
          url: "/users/admin",
          headers: {
            Authorization: `Bearer ${Cypress.env("accessToken")}`,
          },
        });
      });
  });
});

Cypress.Commands.add("deletaUsuario", () => {
  const id = Cypress.env("usuarioAtual").id;
  const type = Cypress.env("usuarioAtual").type;

  if (type === 0) {
    cy.request({
      method: "PATCH",
      url: "users/inactivate",
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    });
  }

  if (type === 1) {
    cy.request({
      method: "DELETE",
      url: `/users/${id}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    });
  }
});
