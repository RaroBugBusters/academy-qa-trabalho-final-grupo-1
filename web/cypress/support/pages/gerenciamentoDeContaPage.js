export class GerenciamentoDeContaPage {
  emailInput = "input[name='email']";
  nomeInput = 'input[name="name"]';
  tipoDeUsuario = 'select[name="type"] option:selected';
  senhaInput = 'input[name="password"]';
  confirmarSenhaInput = 'input[name="confirmPassword"]';
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
    return cy.get(this.nomeInput);
  }

  obterCampoEmail() {
    return cy.get(this.emailInput);
  }

  obterTipoUsuario() {
    return cy.get(this.tipoDeUsuario);
  }

  obterModal() {
    return cy.get(this.modal);
  }

  obterCampoSenha() {
    return cy.get(this.senhaInput);
  }

  obterCampoConfirmacaoSenha() {
    return cy.get(this.confirmarSenhaInput);
  }

  obterErroCampoSenha() {
    return cy.get(this.senhaInput).siblings(".input-error");
  }

  obterErroCampoConfirmacaoSenha() {
    return cy.get(this.confirmarSenhaInput).siblings(".input-error");
  }

  clicarBotaoSalvar() {
    cy.get(this.botaoSalvar).click();
  }

  clicarBotaoAlterarSenha() {
    cy.get(this.botaoAlterarSenha).click();
  }
}
