export default class PesquisaDeFilmePage {
  inputSearch = "input[name='search']";
  buttonSearch = "button[class='search-button']";
  movieCard = ".movie-card";
  noMovieFound = "main[class='main']";
  movieCardFull = ".search-movie-container";
  search(movie) {
    cy.get(this.inputSearch).click();
    if (movie !== "") cy.get(this.inputSearch).type(movie);
    cy.get(this.buttonSearch).click();
  }

  movie() {
    cy.get(this.movieCard).first().click();
  }
}
