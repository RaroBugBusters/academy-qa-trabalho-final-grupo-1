export class ConsultaAvaliacaoPage {
  userReview = ".star-container-reviewcard";
  userReviewInfo = ".user-reviecard-info h3";
  containerReviews = ".user-reviews-container";
  starPreenchuidaReview = ".star-container-reviewcard span.filled";
  formularioDeAvaliacao = "form";
  inputTextoAvaliacao = "form > textarea";

  containerMinhasReviews = ".ratings-container";
  infoUsuario = ".user-info > span";
  filmeCard = ".movie-card";
  estrela = ".review-form-star";
  avaliacaoCampo = "form > textarea";
  botaoEnviar = "button[type='submit']";
  userReviewCards = ".user-review-card";
  userReviewCard = ".review-card-header";
  filmeTitulo = "h1.movie-details-title";

  visitarMeuPerfil() {
    cy.visit("/profile");
  }

  visitarPaginaInicial() {
    cy.visit("/");
  }

  visitarPaginaDeFilme() {
    cy.get(this.filmeCard).first().click();
  }

  pegarNomeDoFilme() {
    cy.get(this.filmeTitulo).should("be.visible");
  filmeTitulo = "h1.movie-details-title";

    cy
      .get(this.filmeTitulo)
      .invoke("text")
      .then((text) => {
        return text;
      });
  }

  clicarEmAvaliarEstrelas() {
    cy.get(this.estrela).first().click();
  }

  digitarAvaliacao(texto) {
    cy.get(this.avaliacaoCampo).clear().type(texto);
  }

  clicarEmAvaliar() {
    cy.contains(this.botaoEnviar, "Enviar").click();
  }

  verificaMinhaAvaliacaoNoFilme(nome, avaliacao) {
    cy.get(this.userReviewCards)
      .last()
      .find(this.userReviewInfo)
      .should("contain", nome);
    cy.get(this.userReviewCards).last().find("p").should("contain", avaliacao);
  }

  verificarMinhasInformacoes(nome, email) {
    cy.get(this.infoUsuario).should("be.visible").and("contain", nome);
    cy.get(this.infoUsuario).should("be.visible").and("contain", email);
  }

  verificarMinhasReviewsEstaoVazias() {
    cy.get(this.containerMinhasReviews).should("not.have.descendants");
  }

  verificarMinhasReviewsEstaoPreenchidas(nomeDoFilme) {
    cy.get(this.userReviewCard).first().find("p").should("be.visible");
    cy.get(this.userReviewCard)
      .first()
      .find("p")
      .should("contain", nomeDoFilme);
  }
}
