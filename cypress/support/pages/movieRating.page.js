export default class MovieRating {

    movieCard = ".movie-card";

    movieStars = ".movie-stars";
    inputReview = "textarea[name='reviewText']";
    buttonSubmit = "button[type='submit']";
    reviewCard = ".user-review-card";

    movie() {
        cy.get(this.movieCard).first().click();
    };

    rate(stars) {
        cy.get(this.movieStars).eq(stars - 4).click();
    };

    review(review) {
        cy.get(this.inputReview).type(review);
    };

    submit() {
        cy.get(this.buttonSubmit).click();
    };

    reviewCard(review) {
        cy.get(this.reviewCard).contains(review);
    };

};