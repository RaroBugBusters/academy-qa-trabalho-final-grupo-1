import { faker } from "@faker-js/faker";

const email = faker.internet.email();

Cypress.Commands.add("newUser", () => {
    const fakeUserData = {
        name: faker.person.fullName(),
        email: email,
        password: "123456",
        confirmPassword: "123456",
    };
    cy.request("POST", "register", fakeUserData);
});

Cypress.Commands.add("login", () => {
    const fakeUserData = {
        email: email,
        password: "123456",
    };
    cy.request("POST", "login", fakeUserData);
});
