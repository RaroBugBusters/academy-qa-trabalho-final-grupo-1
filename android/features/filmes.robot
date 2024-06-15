*** Settings ***

Resource    ../../base.robot

Test Setup    Abrir App
Test Teardown    Teardown

*** Test Cases ***

CT001 - Deve ser possível visualizar um filme na pagina inicial
    Dado que existe um filme cadastrado
    Então deve ser exibido o filme na lista de filmes

CT002 - Deve ser possível consultar os detalhes de um filme
    Dado que existe um filme cadastrado
    Quando selecionar um filme
    Então deve ser exibido o detalhe do filme

CT003 - Deve ser possivel avaliar um filme
    Dado que existe um filme cadastrado
    E estou logado
    Quando selecionar um filme
    E clicar em avaliar
    E dar uma nota de 3 estrelas
    E preencher o campo de texto
    E clicar em Salvar
    Então deve exibir a mensagem que a review foi adicionada com sucesso

CT004 - Deve ser possivel visualizar as avaliações de um filme
    Dado que existe um filme cadastrado
    E existe avaliações para o filme
    Quando selecionar um filme
    Então deve ser exibido as avaliações do filme

CT005 - Não deve ser possivel avaliar um filme sem estar logado
    Dado que existe um filme cadastrado
    Quando selecionar um filme
    E clicar em avaliar
    E dar uma nota de 3 estrelas
    E preencher o campo de texto
    E clicar em Salvar
    Então devo ver a mensagem de erro que deve estar logado para avaliar um filme