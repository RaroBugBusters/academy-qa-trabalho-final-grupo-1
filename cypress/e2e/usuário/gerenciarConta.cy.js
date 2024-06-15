import { faker } from "@faker-js/faker";
import { StatusCode } from "../../support/utils/StatusCode";

describe("Testes Login de Usuários", function () {
  it("Um usuário autenticado pode acessar a edição das próprias informações", function () {
    cy.atualizaUsuario().then((response) => {
      expect(response.status).to.equal(StatusCode.OK);
      expect(response.body).to.have.property("name", "Testando Teste");
    });
  });

  it("Deve ser possível atualizar o nome sem atualizar a senha", function () {
    cy.logaUsuarioAdmin().then(() => {
      cy.request({
        method: "PUT",
        url: `/users/${Cypress.env("id")}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: {
          name: "Testando Teste",
        },
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.OK);
      });
    });
  });

  it("Deve ser possível atualizar a senha sem atualizar o nome", function () {
    cy.logaUsuarioAdmin().then(() => {
      cy.request({
        method: "PUT",
        url: `/users/${Cypress.env("id")}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: {
          password: "123456789",
        },
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.OK);
      });
    });
  });

  it("Um usuário comum não pode alterar informações de outros usuários", function () {
    const fakeUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };
    cy.request({
      method: "POST",
      url: "/users",
      body: fakeUserData,
    }).then((response) => {
      const userId = response.body.id;

      cy.logaUsuario();
      cy.request({
        method: "PUT",
        url: `/users/${userId}`,
        body: {
          name: "Testando Teste",
          password: "123456",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.UNAUTHORIZED);
        expect(response.body.message).to.include("Access denied.");
      });
    });
  });

  it("Um usuário não autenticado não pode acessar a edição de informações", function () {
    const fakeUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };

    cy.request({
      method: "POST",
      url: "/users",
      body: fakeUserData,
    }).then((response) => {
      const userId = response.body.id;

      cy.request({
        method: "PUT",
        url: `/users/${userId}`,
        body: {
          name: "Testando Teste",
          password: "123456",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.UNAUTHORIZED);
        expect(response.body.message).to.include("Access denied.");
      });
    });
  });

  it("Não deve ser possível alterar para um nome em branco", function () {
    cy.logaUsuarioAdmin().then(() => {
      cy.request({
        method: "PUT",
        url: `/users/${Cypress.env("id")}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: {
          name: "",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.BAD_REQUEST);
        expect(response.body.message).to.include(
          "name must be longer than or equal to 1 characters"
        );
      });
    });
  });

  it("Não deve ser possível alterar para um nome com mais de 100 caracteres", function () {
    cy.logaUsuarioAdmin().then(() => {
      cy.request({
        method: "PUT",
        url: `/users/${Cypress.env("id")}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: {
          name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.BAD_REQUEST);
        expect(response.body.message).to.include(
          "name must be shorter than or equal to 100 characters"
        );
      });
    });
  });

  it("Não deve ser possível alterar para uma senha com menos de 6 caracteres", function () {
    cy.logaUsuarioAdmin().then(() => {
      cy.request({
        method: "PUT",
        url: `/users/${Cypress.env("id")}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: {
          password: "aaaaa",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.BAD_REQUEST);
        expect(response.body.message).to.include(
          "password must be longer than or equal to 6 characters"
        );
      });
    });
  });

  it("Não deve ser possível alterar para uma senha com mais de 12 caracteres", function () {
    cy.logaUsuarioAdmin().then(() => {
      cy.request({
        method: "PUT",
        url: `/users/${Cypress.env("id")}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
        body: {
          password: "1234567890123",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.BAD_REQUEST);
        expect(response.body.message).to.include(
          "password must be shorter than or equal to 12 characters"
        );
      });
    });
  });

  it("Qualquer usuário autenticado pode ser evoluído para crítico", function () {
    cy.logaUsuarioCritico().then((response) => {
      expect(response.status).to.equal(StatusCode.NO_CONTENT);
    });
  });

  it("Qualquer usuário autenticado pode ser evoluído para administrador", function () {
    cy.logaUsuarioAdmin().then((response) => {
      expect(response.status).to.equal(StatusCode.NO_CONTENT);
    });
  });

  it("Apenas usuários administradores podem realizar a consulta de todos os usuários cadastrados", function () {
    cy.logaUsuarioAdmin().then(() => {
      cy.request({
        method: "GET",
        url: "/users",
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.OK);
        expect(response.body).to.be.an("array");
        response.body.forEach((user) => {
          expect(user).to.have.property("id");
          expect(user).to.have.property("name");
          expect(user).to.have.property("email");
          expect(user).to.have.property("type");
          expect(user).to.have.property("active");
        });
      });
    });
    cy.logaUsuario().then(() => {
      cy.request({
        method: "GET",
        url: "/users",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.UNAUTHORIZED);
        expect(response.body.message).to.include("Access denied.");
      });
    });
  });

  it("Apenas usuários autenticados podem inativar a própria conta", function () {
    cy.logaUsuario().then(() => {
      cy.request({
        method: "GET",
        url: `/users/inactivate`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.UNAUTHORIZED);
        expect(response.body.message).to.include("Access denied.");
      });
    });
    cy.logaUsuario().then(() => {
      cy.request({
        method: "PATCH",
        url: `/users/inactivate`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.NO_CONTENT);
      });
    });
  });

  // it('As informações e avaliações de um usuário inativado permanecem registradas no sistema', function () {
  //     const fakeUserData = {
  //         name: faker.person.fullName(),
  //         email: faker.internet.email(),
  //         password: faker.internet.password({ length: 6 }),
  //     };

  //     cy.request({
  //         method: "POST",
  //         url: "/users",
  //         body: fakeUserData,
  //     })
  //         .then((response) => {
  //             const userId = response.body.id;

  //             cy.request({
  //                 method: "POST",
  //                 url: "/auth/login",
  //                 body: {
  //                     email: fakeUserData.email,
  //                     password: fakeUserData.password,
  //                 }
  //             })
  //                 .then((response) => {
  //                     const accessToken = response.body.accessToken;

  //                     cy.request({
  //                         method: 'PATCH',
  //                         url: `/users/inactivate`,
  //                         headers: {
  //                             Authorization: `Bearer ` + accessToken
  //                         }
  //                     });
  //                     cy.logaUsuarioAdmin().then(() => {
  //                         cy.request({
  //                             method: 'GET',
  //                             url: `/users/${userId}`,
  //                             headers: {
  //                                 Authorization: `Bearer ${Cypress.env("accessToken")}`,
  //                             }
  //                         })
  //                             .then((response) => {
  //                                 expect(response.status).to.equal(StatusCode.OK);
  //                                 expect(response.body).to.have.property('id', userId);
  //                                 expect(response.body).to.have.property('name', name);
  //                                 expect(response.body).to.have.property('email', email);
  //                                 expect(response.body).to.have.property('type');
  //                                 expect(response.body).to.have.property('active', false);
  //                             });
  //                     });
  //                 });
  //         });
  // });

  it("Quando um usuário é inativado, seu email fica disponível para um novo cadastro", function () {
    const fakeUserData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 6 }),
    };

    cy.request({
      method: "POST",
      url: "/users",
      body: fakeUserData,
    }).then(() => {
      cy.request({
        method: "POST",
        url: "/auth/login",
        body: {
          email: fakeUserData.email,
          password: fakeUserData.password,
        },
      }).then((response) => {
        const accessToken = response.body.accessToken;

        cy.request({
          method: "PATCH",
          url: `/users/inactivate`,
          headers: {
            Authorization: `Bearer ` + accessToken,
          },
        });

        cy.request({
          method: "POST",
          url: "/users",
          body: {
            name: faker.person.fullName(),
            email: fakeUserData.email,
            password: faker.internet.password({ length: 6 }),
          },
        }).then((response) => {
          expect(response.status).to.equal(StatusCode.CREATED);
          expect(response.body).to.have.property(
            "email",
            fakeUserData.email.toLowerCase()
          );
        });
      });
    });
  });

  it("Apenas usuários administradores podem excluir uma conta", function () {
    cy.logaUsuarioAdmin().then(() => {
      cy.request({
        method: "DELETE",
        url: `/users/${Cypress.env("id")}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("accessToken")}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.NO_CONTENT);
      });
    });

    cy.logaUsuario().then(() => {
      cy.request({
        method: "DELETE",
        url: `/users/${Cypress.env("id")}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(StatusCode.UNAUTHORIZED);
        expect(response.body.message).to.include("Access denied.");
      });
    });
  });
});
