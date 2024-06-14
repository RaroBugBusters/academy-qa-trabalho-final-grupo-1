*** Settings ***

Resource    ../../base.robot

Test Setup    Abrir App
Test Teardown    Teardown

*** Test Cases ***

CT001 - Deve ser possível avaliar um filme
    Dado que estou logado
    # E selecionar um filme
    # Quando clicar no botão de avaliar
    # E preencher o campo de avaliação com uma nota válida
    # E preencher o campo de comentário com um comentário válido
    # E clicar no botão de Salvar
    # Então devo ver a mensagem de sucesso de avaliação