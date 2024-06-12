# language: pt
Funcionalidade: Avaliação de Filmes

Cenario: Avaliação de Filmes

    Dado que eu acesso o site e estou logado
    Quando escolher o primeiro filme
    E selecionar o rating 5 e escrever uma review
    Então a avaliação deve ser registrada

Cenario: Avaliação de Filmes com rating 0

    Dado que eu acesso o site e estou logado
    Quando escolher o primeiro filme
    E não selecionar o rating e escrever uma review
    Então a avaliação deve gerar uma mensagem de erro