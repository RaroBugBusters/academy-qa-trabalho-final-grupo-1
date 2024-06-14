const apiUrl = Cypress.env("API_URL");
import { faker } from "@faker-js/faker";

Cypress.Commands.add("criarUsuarioAleatorio", () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123456",
  };
});

Cypress.Commands.add("registrarUsuario", () => {
  cy.criarUsuarioAleatorio().then((usuarioAleatorio) => {
    cy.request("POST", `${apiUrl}/users`, usuarioAleatorio).then(() => {
      Cypress.env("USUARIO_ATUAL", usuarioAleatorio);
    });
  });
});

Cypress.Commands.add("newUser", (name, email, password, confirmPassword) => {
  cy.visit("https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/register");

  cy.get("input[name='name']").type(name);
  cy.get("input[name='email']").type(email);
  cy.get("input[name='password']").type(password);
  cy.get("input[name='confirmPassword']").type(confirmPassword);
  cy.get("button[class='account-save-button']").click();
  cy.get("div.modal-actions > button").click();
});

Cypress.Commands.add("userLogin", () => {
  cy.visit("https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login");
  cy.get("input[name='email']").type(email);
  cy.get("input[name='password']").type(password);
  cy.get("button[class='account-save-button']").click();
});

Cypress.Commands.add("movieCreate", () => {
  cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
    body: {
      title: "Duna (1984)",
      genre: "ficção científica",
      description:
        " é um filme estadunidense de 1984, do gênero ficção científica, dirigido por David Lynch, com roteiro baseado no romance homônimo de Frank Herbert.",
      durationInMinutes: 137,
      releaseYear: 1984,
    },
    headers: {
      Authorization: `Bearer ${Cypress.env("accessToken")}`,
    },
  }).then(({ body: createdMovie }) => {
    Cypress.env("actualMovie", createdMovie);
    return createdMovie;
  });
});

Cypress.Commands.add("movieDelete", () => {
  const movieId = Cypress.env("actualMovie")?.id;

  if (movieId) {
    cy.request({
      method: "DELETE",
      url: `https://raromdb-3c39614e42d4.herokuapp.com/api/movies/${movieId}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(() => {
      Cypress.env("actualMovie", null);
    });
  }
});

Cypress.Commands.add("userMock", () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "senha123",
  };
});

Cypress.Commands.add("userCreate", () => {
  const fakeUserData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 6 }),
  };
  cy.request({
    method: "POST",
    url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
    body: fakeUserData,
  });
});

Cypress.Commands.add("userLogIn", () => {
  const actualUser = Cypress.env("actualUser");

  // if (actualUser) {
  //     cy.userDelete();
  // };

  cy.userMock().then((createdUser) => {
    cy.request(
      "POST",
      "https://raromdb-3c39614e42d4.herokuapp.com/api/users",
      createdUser
    )
      .then(({ body }) => {
        Cypress.env("actualUser", body);

        return cy.request(
          "POST",
          "https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login",
          {
            email: createdUser.email,
            password: createdUser.password,
          }
        );
      })
      .then(({ body }) => {
        Cypress.env("accessToken", body.accessToken);
      });
  });
});

Cypress.Commands.add("userMakeAdmin", () => {
  cy.userLogIn().then(() => {
    cy.request({
      method: "PATCH",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/users/admin",
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    });
  });
});

Cypress.Commands.add("userDelete", () => {
  const actualUser = Cypress.env("actualUser");

  if (actualUser) {
    cy.request({
      method: "DELETE",
      url: `https://raromdb-3c39614e42d4.herokuapp.com/api/users/${actualUser.id}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(() => {
      Cypress.env("actualUser", null);
    });
  }
});
