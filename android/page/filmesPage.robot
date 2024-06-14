*** Settings ***

Resource    ../../base.robot

*** Variables ***
${FAKER_TITULO}
${FAKER_GENERO}
${FAKER_DESCRICAO}
${FAKER_DURACAO}
${FAKER_ANO}

${FILME_CADASTRADO}

*** Keywords ***

Dado que existe um filme cadastrado
    Verifica se existe filmes cadastrados

Quando selecionar um filme
   Aguarda o elemento e faz o clique    ${FILME_CADASTRADO.get('title')}    ${FILME_CADASTRADO.get('title')}

Então deve ser exibido o detalhe do filme
    Sleep    5
    # Elemento deve estar visível    ${TITULO_FILME}
    # Verifica se o elemento contém o texto    ${TITULO_FILME}    ${FAKER_TITULO}
    # Elemento deve estar visível    ${GENERO_FILME}
    # Verifica se o elemento contém o texto    ${GENERO_FILME}    ${FAKER_GENERO}

Então deve ser exibido o filme na lista de filmes
    Wait Until Page Contains    ${FILME_CADASTRADO.get('title')}
    Wait Until Page Contains    ${FILME_CADASTRADO.get('genre')}