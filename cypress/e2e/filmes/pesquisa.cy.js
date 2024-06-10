describe("Pesquisa de filmes", () => {
  let filme;

  beforeEach(() => {
    cy.logaUsuarioAdmin().then(() => {
      cy.criaFilme().then((filmeCriado) => {
        filme = filmeCriado;
      });
    });
  });

  afterEach(() => {
    cy.deletaFilme().then(() => {
      cy.deletaUsuario();
    });
  });

  const verificaFilmeEncontrado = (responseFilmes) => {
    const { body, status } = responseFilmes;
    const responseFilme = body[0];

    expect(status).to.eq(200);
    expect(body).to.be.an("array");
    expect(body).to.have.length.above(0);
    expect(responseFilme.title).to.be.equal(filme.title);
  };

  const verificaFilmeEncontradoNaLista = (responseFilmes) => {
    const { body, status } = responseFilmes;

    expect(status).to.eq(200);
    expect(body).to.be.an("array");
    expect(body).to.have.length.above(0);
    expect(body.some((movie) => movie.title.includes(filme.title))).to.be.true;
  };

  it("Deve permitir que usuário não logado, realize uma pesquisa no catálogo de filmes", () => {
    cy.request("GET", `/movies/search?title=${filme.title}`).then(
      verificaFilmeEncontrado,
    );
  });

  it("Deve permitir que usuário logado, realize uma pesquisa no catálogo de filmes", () => {
    cy.request({
      method: "GET",
      url: `/movies/search?title=${filme.title}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then(verificaFilmeEncontrado);
  });

  it("Deve retornar filme que o título seja igual ao informado pelo usuário", () => {
    cy.request("GET", `/movies/search?title=${filme.title}`).then(
      verificaFilmeEncontrado,
    );
  });

  it("Deve retornar filme que o título seja parcialmente informado pelo usuário", () => {
    const filmeParcialExample1 = filme.title.slice(0, 5);
    cy.request("GET", `/movies/search?title=${filmeParcialExample1}`).then(
      verificaFilmeEncontradoNaLista,
    );

    const filmeParcialExample2 = filme.title.slice(5, 10);
    cy.request("GET", `/movies/search?title=${filmeParcialExample2}`).then(
      verificaFilmeEncontradoNaLista,
    );
  });

  it("Deve permitir que o usuário consulte mais detalhes de um filme ao interagir com um dos filmes exibidos na listagem", () => {
    cy.request("GET", `/movies/search?title=${filme.title}`).then(
      (response) => {
        const filmeEncontrado = response.body[0];
        verificaFilmeEncontrado(response);

        cy.request("GET", `/movies/${filmeEncontrado.id}`).then(
          (responseFilme) => {
            const { body, status } = responseFilme;

            expect(status).to.eq(200);
            expect(body).to.be.an("object");
            expect(body.title).to.be.equal(filme.title);
            expect(body.id).to.be.equal(filme.id);
            expect(body).to.have.property("criticScore");
            expect(body).to.have.property("audienceScore");
          },
        );
      },
    );
  });
});
