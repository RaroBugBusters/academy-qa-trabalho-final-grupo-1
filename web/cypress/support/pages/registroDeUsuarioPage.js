export class RegistroDeUsuarioPage {
  registryButton = "[href='/register']";
  inputName = "input[name='name']";
  inputEmail = "input[name='email']";
  inputPassword = "input[name='password']";
  inputConfirmPassword = "input[name='confirmPassword']";
  buttonSubmit = "button[class='account-save-button']";

  registerUser() {
    cy.get(this.registryButton).click();
  }

  typeName(name) {
    cy.get(this.inputName).clear();
    if (name !== "") {
      cy.get(this.inputName).type(name);
    }
  }

  typeEmail(email) {
    cy.get(this.inputEmail).clear();
    if (email !== "") {
      cy.get(this.inputEmail).type(email);
    }
  }

  typePassword(password) {
    cy.get(this.inputPassword).clear();
    if (password !== "") {
      cy.get(this.inputPassword).type(password);
    }
  }

  typeConfirmPassword(confirmPassword) {
    cy.get(this.inputConfirmPassword).clear();
    if (confirmPassword !== "") {
      cy.get(this.inputConfirmPassword).type(confirmPassword);
    }
  }

  Submit() {
    cy.get(this.buttonSubmit).click();
  }
}
