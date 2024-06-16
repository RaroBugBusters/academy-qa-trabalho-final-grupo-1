export class ConsultaDeDetalhesDeFilmePage {
  labelTituloDeFilme = ".movie-details-title";
  labelDescricao = ".movie-detail-description";
  labelAnoDeLancamento = ":nth-child(4) > span";
  labelDuracaoEmMinutos = ":nth-child(5) > span";
  labelGenero = ":nth-child(6) > span";
  labelsNota = ".movie-score-info .star-container";
  userReview = ".star-container-reviewcard";
  userReviewInfo = ".user-reviecard-info h3";
  containerReviews = ".user-reviews-container";
  starPreenchuidaReview = ".star-container-reviewcard span.filled";
  formularioDeAvaliacao = "form";
  inputTextoAvaliacao = "form > textarea";

  visitarPaginaDeDetalhesDeFilme(filmeId) {
    cy.visit(`/movies/${filmeId}`);
  }

  verificarFormulario() {
    cy.get(this.formularioDeAvaliacao).should("be.visible");
  }

  verificarTodosDetalhesDeFilme(filme) {
    this.verificarDetalhesTituloDeFilme(filme.title);
    this.verificarDetalhesDescricaoDeFilme(filme.description);
    this.verificarDetalhesGeneroDeFilme(filme.genre);
    this.verificarDetalhesAnoDeLancamento(filme.releaseYear);
    this.verificarDetalhesDuracaoEmMinutos(filme.durationInMinutes);
    this.verificarDetalhesAudience(
      filme.audienceScore,
      contarReviews(filme.reviews, 0),
    );
    this.verificarDetalhesCritic(
      filme.criticScore,
      contarReviews(filme.reviews, 1),
    );
    this.verificarReviews(filme.reviews);
  }

  verificarDetalhesTituloDeFilme(titulo) {
    cy.get(this.labelTituloDeFilme).should("be.visible");
    cy.get(this.labelTituloDeFilme).should("contain", titulo);
  }

  verificarDetalhesTituloDeFilme(titulo) {
    cy.get(this.labelTituloDeFilme).should("be.visible");
    cy.get(this.labelTituloDeFilme).should("contain", titulo);
  }

  verificarDetalhesDescricaoDeFilme(descricao) {
    cy.get(this.labelDescricao).should("be.visible");
    cy.get(this.labelDescricao).should("contain", descricao);
  }

  verificarDetalhesGeneroDeFilme(genero) {
    cy.get(this.labelGenero).should("be.visible");
    cy.get(this.labelGenero).should("contain", genero);
  }

  verificarDetalhesAnoDeLancamento(anoDeLancamento) {
    cy.get(this.labelAnoDeLancamento).should("be.visible");
    cy.get(this.labelAnoDeLancamento).should("contain", anoDeLancamento);
  }

  verificarDetalhesDuracaoEmMinutos(duracaoEmMinutos) {
    cy.get(this.labelDuracaoEmMinutos).should("be.visible");
    cy.get(this.labelDuracaoEmMinutos).should(
      "contain",
      formatarDuracaoEmTexto(duracaoEmMinutos),
    );
  }

  verificarDetalhesAudience(notaDeAudiencia, quantidadeDeAvaliacoes) {
    cy.get(this.labelsNota)
      .contains("label", "Avaliação da audiência")
      .parent()
      .within(() => {
        if (!quantidadeDeAvaliacoes) {
          cy.get("label").contains("Nenhuma avaliação");
        } else {
          cy.get("label").contains(quantidadeDeAvaliacoes);
        }

        if (!notaDeAudiencia) {
          cy.get("div span.filled").should("have.length", 0);
        } else {
          cy.get("div span.filled").should(
            "have.length",
            Math.floor(notaDeAudiencia),
          );
        }
      });
  }

  verificarDetalhesCritic(notaDeCritico, quantidadeDeAvaliacoes) {
    cy.get(this.labelsNota)
      .contains("label", "Avaliação da crítica")
      .parent()
      .within(() => {
        if (!quantidadeDeAvaliacoes) {
          cy.get("label").contains("Nenhuma avaliação");
        } else {
          cy.get("label").contains(quantidadeDeAvaliacoes);
        }

        if (!notaDeCritico) {
          cy.get("div span.filled").should("have.length", 0);
        } else {
          cy.get("div span.filled").should(
            "have.length",
            Math.floor(notaDeCritico),
          );
        }
      });
  }

  verificarReviews(reviews) {
    if (reviews?.length === 0) {
      cy.get(this.containerReviews).should("not.have.descendants");
      return;
    }

    cy.get(this.containerReviews).should("be.visible");

    reviews.forEach((review, index) => {
      const formattedDate = formatDate(review.updatedAt);

      cy.get(".user-review-card")
        .eq(index)
        .find("label")
        .contains(formattedDate);

      cy.get(".user-review-card")
        .eq(index)
        .find(".user-reviecard-info h3")
        .contains(review.user.name);

      cy.get(".user-review-card")
        .eq(index)
        .find("p")
        .contains(review.reviewText);

      cy.get(".user-review-card")
        .eq(index)
        .find(".star-container-reviewcard span.filled")
        .should("have.length", Math.floor(review.score));
    });
  }
}

function formatarDuracaoEmTexto(duracaoEmMinutos) {
  const horas = Math.floor(duracaoEmMinutos / 60);
  const minutos = duracaoEmMinutos % 60;
  if (horas > 0) {
    return `${horas}h ${minutos}m`;
  } else {
    return `${minutos}m`;
  }
}

function contarReviews(reviews, reviewType) {
  return reviews?.filter((review) => review.reviewType === reviewType).length;
}

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString(); // Obtém o dia como string
  const month = (date.getMonth() + 1).toString(); // Obtém o mês como string
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0"); // Garante dois dígitos para horas
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Garante dois dígitos para minutos
  const seconds = date.getSeconds().toString().padStart(2, "0"); // Garante dois dígitos para segundos
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
