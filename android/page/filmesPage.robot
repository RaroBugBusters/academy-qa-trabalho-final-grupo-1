*** Settings ***

Resource    ../../base.robot

*** Variables ***
${FAKER_TITULO}
${FAKER_GENERO}
${FAKER_DESCRICAO}
${FAKER_DURACAO}
${FAKER_ANO}

${TITULO_FILME}=
${GENERO_FILME}= 

${FILME_UM}=    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[1]

*** Keywords ***

Dado que existe um filme cadastrado
    ${FAKER_TITULO}=    FakerLibrary.Job
    Set Global Variable    ${TITULO_FILME}   xpath=//android.widget.TextView[@content-desc=${FAKER_TITULO}]
    ${FAKER_GENERO}=    FakerLibrary.Prefix
    Set Global Variable    ${GENERO_FILME}   xpath=//android.widget.TextView[@content-desc=${FAKER_GENERO}]
    ${FAKER_DESCRICAO}=     FakerLibrary.Paragraph
    ${FAKER_DURACAO}=    FakerLibrary.RandomInt    60    180
    ${FAKER_ANO}=    FakerLibrary.RandomInt    1900    2024
    Cadastrar Filme   ${FAKER_TITULO}    ${FAKER_GENERO}    ${FAKER_DESCRICAO}    ${FAKER_DURACAO}    ${FAKER_ANO}

Quando selecionar um filme
    Wait Until Element Is Visible    ${TEXTO_PAGINA_INICIAL}
    Click Element    ${FILME_UM}

Então deve ser exibido o detalhe do filme
    Sleep    5
    # Elemento deve estar visível    ${TITULO_FILME}
    # Verifica se o elemento contém o texto    ${TITULO_FILME}    ${FAKER_TITULO}
    # Elemento deve estar visível    ${GENERO_FILME}
    # Verifica se o elemento contém o texto    ${GENERO_FILME}    ${FAKER_GENERO}

Então deve ser exibido o filme na lista de filmes
    Sleep    5
    # Scroll até o elemento ficar visivel  ${TITULO_FILME}
    # Aguarda o elemento estar visível e verifica o texto    ${TITULO_FILME}    ${FAKER_TITULO}
    # Aguarda o elemento estar visível e verifica o texto    ${GENERO_FILME}    ${FAKER_GENERO}