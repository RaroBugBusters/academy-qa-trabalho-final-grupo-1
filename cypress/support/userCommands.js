const apiUrl = Cypress.env("API_URL");

Cypress.Commands.add("criarUsuarioAleatorio", () => {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: "123456",
  };
});

Cypress.Commands.add("registrarUsuario", () => {
  cy.criarUsuarioAleatorio().then((usuarioAleatorio) => {
    cy.request("POST", `${apiUrl}/users`, usuarioAleatorio).then(() => {
      Cypress.env("USUARIO_ATUAL", usuarioAleatorio);
    });
  });
});
