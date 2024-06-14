export class LoginUsuario {
  inputEmail = '[name="email"]';
  inputSenha = '[name="password"]';
  buttonLogin = ".login-button";
  modal = ".modal-body";

  clicarLogin() {
    cy.get(this.buttonLogin).click();
  }

  digitarEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  digitarSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }

  obterModal() {
    return cy.get(this.modal);
  }
}
