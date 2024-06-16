const apiUrl = Cypress.env("API_URL");
import { faker } from "@faker-js/faker";

Cypress.Commands.add("criarUsuarioAleatorio", () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123456",
  };
});

Cypress.Commands.add("createReviewMock", (movieId) => {
  return {
    movieId,
    score: faker.number.float({ min: 0, max: 5, multipleOf: 0.01 }),
    reviewText: faker.lorem.sentence(),
  };
});

Cypress.Commands.add("createReview", () => {
  const actualMovie = Cypress.env("actualMovie");

  if (actualMovie) {
    cy.createReviewMock(actualMovie.id).then((review) => {
      cy.request({
        method: "POST",
        url: `${Cypress.env("API_URL")}/users/review`,
        body: review,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      });
    });
  }
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
    url: `${Cypress.env("API_URL")}/movies`,
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

Cypress.Commands.add("getMovie", (movieId) => {
  const id = movieId || Cypress.env("actualMovie")?.id;

  cy.request({
    method: "GET",
    url: `${Cypress.env("API_URL")}/movies/${id}`,
  }).then(({ body }) => {
    Cypress.env("actualDetailMovie", body);
  });
});

Cypress.Commands.add("movieDelete", () => {
  const movieId = Cypress.env("actualMovie")?.id;

  if (movieId) {
    cy.request({
      method: "DELETE",
      url: `${Cypress.env("API_URL")}/movies/${movieId}`,
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
    url: `${Cypress.env("API_URL")}/users`,
    body: fakeUserData,
  });
});

Cypress.Commands.add("userLogIn", () => {
  const actualUser = Cypress.env("actualUser");

  // if (actualUser) {
  //   cy.userDelete();
  // }

  cy.userMock().then((createdUser) => {
    cy.request("POST", `${Cypress.env("API_URL")}/users`, createdUser)
      .then(({ body }) => {
        Cypress.env("actualUser", body);

        return cy.request("POST", `${Cypress.env("API_URL")}/auth/login`, {
          email: createdUser.email,
          password: createdUser.password,
        });
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
      url: `${Cypress.env("API_URL")}/users/admin`,
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
      url: `${Cypress.env("API_URL")}/users/${actualUser.id}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(() => {
      Cypress.env("actualUser", null);
    });
  }
});
