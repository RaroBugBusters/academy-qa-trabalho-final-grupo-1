*** Settings ***

Resource    ../../base.robot

*** Variables ***
${FAKER_TITULO}
${FAKER_GENERO}
${FAKER_DESCRICAO}
${FAKER_DURACAO}
${FAKER_ANO}

${TITULO_FILME}=
${DESCRICAO_FILME}= 

${FILME_UM}=    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[1]

*** Keywords ***

Dado que existe um filme cadastrado
    Verifica se existe filmes cadastrados

Quando selecionar um filme
   Aguarda o elemento e faz o clique    ${TITULO_FILME}    ${TITULO_FILME}

Então deve ser exibido o detalhe do filme
    Sleep    5
    # Elemento deve estar visível    ${TITULO_FILME}
    # Verifica se o elemento contém o texto    ${TITULO_FILME}    ${FAKER_TITULO}
    # Elemento deve estar visível    ${GENERO_FILME}
    # Verifica se o elemento contém o texto    ${GENERO_FILME}    ${FAKER_GENERO}

Então deve ser exibido o filme na lista de filmes
    Wait Until Page Contains    ${TITULO_FILME}
    Wait Until Page Contains    ${DESCRICAO_FILME}
    Page Should Contain Text    ${TITULO_FILME}
    Page Should Contain Text    ${DESCRICAO_FILME}