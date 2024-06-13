export default class MovieSearch {
    
    inputSearch = "input[name='search']";
    buttonSearch = "button[class='serch-button']";
    movieCard = ".movie-card";

    search(movie) {
        cy.get(this.inputSearch).click().type(movie);
        cy.get(this.buttonSearch).click();
        cy.get(this.movieCard).first().click();
}

}