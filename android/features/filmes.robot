*** Settings ***

Resource    ../../base.robot

Test Setup    Abrir App
Test Teardown    Teardown

*** Test Cases ***

CT001 - Visualizar filme na página inicial
    Dado que existe um filme cadastrado
    Então o filme deve ser exibido na lista de filmes na página inicial

CT002 - Consultar detalhes de um filme
    Dado que existe um filme cadastrado
    Quando seleciono um filme
    Então os detalhes do filme devem ser exibidos

CT003 - Avaliar um filme
    Dado que existe um filme cadastrado
    E estou logado
    Quando seleciono um filme
    E clico em avaliar
    E dou uma nota de 3 estrelas
    E preencho o campo de texto
    E clico em Salvar
    Então deve ser exibida a mensagem que a review foi adicionada com sucesso

CT004 - Visualizar avaliações de um filme
    Dado que existe um filme cadastrado
    E existem avaliações para o filme
    Quando seleciono um filme
    Então as avaliações do filme devem ser exibidas

CT005 - Atualizar a avaliação de um filme
    Dado que já realizei uma avaliação para um filme
    Quando retornar para tela de detalhes do filme
    E clico em avaliar
    E dou uma nota de 3 estrelas
    E preencho o campo de texto
    E clico em Salvar
    E retorno para a tela anterior
    Então as avaliações do filme devem ser exibidas

CT006 - Não avaliar um filme sem estar logado
    Dado que existe um filme cadastrado
    Quando seleciono um filme
    E clico em avaliar
    E dou uma nota de 3 estrelas
    E preencho o campo de texto
    E clico em Salvar
    Então devo ver a mensagem de erro que é necessário estar logado para avaliar um filme

CT007 - Não avaliar um filme sem preencher o campo de texto
    Dado que existe um filme cadastrado
    E estou logado
    Quando seleciono um filme
    E clico em avaliar
    E dou uma nota de 3 estrelas
    E clico em Salvar
    Então devo ver a mensagem de erro que não foi possível adicionar a review

CT008 - Não avaliar um filme com review maior que 500 caracteres
    Dado que existe um filme cadastrado
    E estou logado
    Quando seleciono um filme
    E clico em avaliar
    E dou uma nota de 3 estrelas
    E preencho o campo de texto com um texto maior que 500 caracteres
    E clico em Salvar
    Então devo ver a mensagem de erro que não foi possível adicionar a review