import { faker } from "@faker-js/faker";
import { StatusCode } from "../../support/utils/StatusCode";

describe("Testes Login de Usuários", function () {
  var randomPassword;

  it("Deve ser possível realizar o login com o email e senha", function () {
    cy.logaUsuario().then((response) => {
      expect(response.status).to.equal(StatusCode.OK);
    });
  });

  it("Não deve ser possível realizar o login sem preencher o email", function () {
    randomPassword = faker.internet.password({ length: 6 });

    const fakeUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: randomPassword,
    };

    cy.request({
      method: "POST",
      url: "/users",
      body: fakeUserData,
    });

    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        password: fakeUserData.password,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(StatusCode.BAD_REQUEST);
      expect(response.body.message).to.include("email should not be empty");
      expect(response.body.message).to.include("email must be an email");
    });
  });

  it("Não deve ser possível realizar o login sem preencher a senha", function () {
    randomPassword = faker.internet.password({ length: 6 });

    const fakeUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: randomPassword,
    };

    cy.request({
      method: "POST",
      url: "/users",
      body: fakeUserData,
    });

    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email: fakeUserData.email,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(StatusCode.BAD_REQUEST);
      expect(response.body.message).to.include("password must be a string");
      expect(response.body.message).to.include("password should not be empty");
    });
  });

  it("Não deve ser possível realizar o login com um email incorreto", function () {
    randomPassword = faker.internet.password({ length: 6 });

    const fakeUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: randomPassword,
    };

    cy.request({
      method: "POST",
      url: "/users",
      body: fakeUserData,
    });

    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email: faker.internet.email(),
        password: fakeUserData.password,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(StatusCode.UNAUTHORIZED);
      expect(response.body.message).to.include("Invalid username or password.");
    });
  });

  it("Não deve ser possível realizar o login com uma senha incorreta", function () {
    randomPassword = faker.internet.password({ length: 6 });

    const fakeUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: randomPassword,
    };

    cy.request({
      method: "POST",
      url: "/users",
      body: fakeUserData,
    });

    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email: fakeUserData.email,
        password: faker.internet.password(),
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(StatusCode.UNAUTHORIZED);
      expect(response.body.message).to.include("Invalid username or password.");
    });
  });

  it("O usuário deve permanecer logado por no máximo 60 minutos", function () {
    cy.clock();
    cy.logaUsuarioAdmin().then((response) => {
      expect(response.status).to.equal(204);
    });
    cy.listaReviews().then((response) => {
      expect(response.status).to.equal(200);
    });
    cy.tick(60 * 60 * 1000);
    cy.request({
      method: "GET",
      url: "/users/review/all",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(StatusCode.UNAUTHORIZED);
    });
  });
});
