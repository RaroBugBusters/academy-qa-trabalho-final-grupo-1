export class listagemFilmesPage {
    listaFilmes = ".movies-page-link";
    cardFilme = ".movie-card";

    clickListaFilmes() {
        cy.get(this.listaFilmes).first().click();
    }
}