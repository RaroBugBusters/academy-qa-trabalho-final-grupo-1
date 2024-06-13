export default class AvaliacaoDeFilmePage {
  movieCard = ".movie-card";

  movieSearch = "input[name='search']";
  buttonSearch = "button[class='search-button']";
  inputReview = "textarea[name='reviewText']";
  buttonSubmit = "button[type='submit']";
  userReviewCard = ".user-review-card";
  errorMessage1 = ".modal-content";

  movie() {
    cy.get(this.movieCard).first().click();
  }

  rate(stars) {
    cy.get(
      `#root > div > main > div > form > div.stars > span:nth-child(${stars})`
    ).click();
  }

  review(review) {
    cy.get(this.inputReview).click().type(review);
  }

  submit() {
    cy.contains(this.buttonSubmit, "Enviar").click();
  }

  reviewCard(review) {
    cy.get(this.userReviewCard).contains(review);
  }

  errorMessage() {
    cy.get(this.errorMessage1).should(
      "contain",
      "Selecione uma estrela para avaliar o filme"
    );
  }

  search(movie) {
    cy.get(this.movieSearch).click().type(movie);
    cy.get(this.buttonSearch).click();
    cy.get(this.movieCard).first().click();
  }
}
