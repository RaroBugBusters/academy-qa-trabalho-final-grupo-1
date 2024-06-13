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

   