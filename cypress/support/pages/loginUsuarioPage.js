export class LoginUsuarioPage {
  campoEmail = "input[name='email']";
  campoSenha = 'input[name="password"]';
  botaoSubmit = "button.login-button";
  modal = ".modal-body";
  URL = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login";

  visitar() {
    cy.visit(this.URL);
  }

  digitarEmail(email) {
    cy.get(this.campoEmail).type(email);
  }

  digitarSenha(senha) {
    cy.get(this.campoSenha).type(senha);
  }

  clicarBotaoSubmit() {
    cy.get(this.botaoSubmit).click();
  }

  obterModal() {
    return cy.get(this.modal);
  }

  obterErroCampoSenha() {
    return cy.get(this.campoSenha).siblings(".input-error");
  }

  obterErroCampoEmail() {
    return cy.get(this.campoEmail).siblings(".input-error");
  }

  fazerLogin(email, senha) {
    this.digitarSenha(senha);
    this.digitarEmail(email);
    this.clicarBotaoSubmit();
  }
}
