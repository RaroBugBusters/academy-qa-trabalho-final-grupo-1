# language: pt
Funcionalidade: Avaliação de filmes

Cenario: Avaliação de filmes

    Dado que eu acesso o site e estou logado
    Quando pesquisar pelo filme "Duna"
    E selecionar o rating 5 e escrever uma review
    Então a avaliação deve ser registrada

Cenario: Avaliação de filmes com rating 0

    Dado que eu acesso o site e crio um usuário
    Quando pesquisar pelo filme "Duna"
    E não selecionar o rating e escrever uma review
    Então a avaliação deve gerar uma mensagem de erro

Cenario: Avaliação de filmes sem review

    Dado que eu acesso o site e loguei
    Quando pesquisar pelo filme "Duna"
    E selecionar o rating 5 e não escrever uma review
    Então não deve ser possível gerar uma avaliação

Cenario: Avaliação de filmes com mesmo usuario

    Dado que eu acesso o site e loguei
    Quando pesquisar pelo filme "Duna"
    E selecionar o rating 3 e escrever uma nova review
    Então a avaliação e o rating devem ser atualizados