import { faker } from "@faker-js/faker";

Cypress.Commands.add("criaMockUsuario", () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "senha123",
  };
});

Cypress.Commands.add("criaUsuario", () => {
  const fakeUserData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 })
  };
  Cypress.env('fakeUserData', fakeUserData);
  cy.request({
    method: 'POST',
    url: '/users',
    body: fakeUserData,
  })
});

Cypress.Commands.add("logaUsuario", () => {
  cy.criaMockUsuario().then((usuarioCriado) => {
    cy.request("POST", "/users", usuarioCriado)
      .then(({ body }) => {
        Cypress.env("usuarioAtual", body);
        Cypress.env("id", body.id);

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
  cy.logaUsuario().then(() => {
    cy.request({
      method: "PATCH",
      url: "/users/admin",
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    });
  });
});

Cypress.Commands.add("logaUsuarioCritico", () => {
  cy.logaUsuario().then(() => {
    cy.request({
      method: "PATCH",
      url: "/users/apply",
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    });
  });
});

Cypress.Commands.add("deletaUsuario", () => {
  const { type, id } = Cypress.env("usuarioAtual");

  if (type === 0) {
    cy.request({
      method: "PATCH",
      url: "users/inactivate",
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(() => {
      Cypress.env("usuarioAtual", null);
      Cypress.env("accessToken", null);
    });
  }

  if (type === 1 && id) {
    cy.request({
      method: "DELETE",
      url: `/users/${id}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(() => {
      Cypress.env("usuarioAtual", null);
      Cypress.env("accessToken", null);
    });
  }
});

Cypress.Commands.add("atualizaUsuario", () => {
  cy.logaUsuarioAdmin().then(() => {
    cy.request({
      method: 'PUT',
      url: `/users/${Cypress.env("id")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      body: {
        name: 'Testando Teste',
        password: '123456'
      }
    });
  });
});