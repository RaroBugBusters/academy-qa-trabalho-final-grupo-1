export class gerenciamentoDeContaPage {
  emailInput = "input[name='email']";
  nameInput = 'input[name="name"]';
  userType = 'select[name="type"] option:selected';
  passwordInput = 'input[name="password"]';
  confirmPasswordInput = 'input[name="confirmPassword"]';
  botaoSalvar = "button.account-save-button";
  botaoAlterarSenha = "button.account-password-button";
  modal = ".modal-body";
  urlGerenciamento =
    "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/account";
  urlLogout = "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/logout";

  visitar() {
    cy.visit(this.urlGerenciamento);
  }

  logout() {
    cy.visit(this.urlLogout);
  }

  obterCampoNome() {
    return cy.get(this.nameInput);
  }

  obterCampoEmail() {
    return cy.get(this.emailInput);
  }

  obterTipoUsuario() {
    return cy.get(this.userType);
  }

  obterModal() {
    return cy.get(this.modal);
  }
}
