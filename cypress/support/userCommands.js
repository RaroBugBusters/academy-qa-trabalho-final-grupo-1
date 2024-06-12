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
