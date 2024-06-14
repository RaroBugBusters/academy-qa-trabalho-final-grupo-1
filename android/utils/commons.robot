*** Settings ***

Resource   ../../base.robot

*** Variables ***
${HOST}         https://raromdb-3c39614e42d4.herokuapp.com/api
${TOKEN_USUARIO}
${LISTA_DE_FILMES}

*** Keywords ***

Aguarda o elemento e faz o clique
    [Arguments]    ${localizadorVisivel}   ${localizadorParaClicar}
    Wait Until Element Is Visible        ${localizadorVisivel}
    Click Element                        ${localizadorParaClicar}


Aguarda o elemento estar visível e verifica o texto
    [Arguments]    ${localizador}    ${texto}
    Wait Until Keyword Succeeds    5x    1s    Elemento deve estar visível    ${localizador}
    ${descricao}=    Get Element Attribute    ${localizador}    content-desc
    Should Contain    ${descricao}    ${texto}

Elemento deve estar visível
    [Arguments]    ${localizador}
    ${status}=    Run Keyword And Return Status    Element Should Be Visible    ${localizador}
    Should Be True    ${status}

Verifica se o elemento contém o texto
    [Arguments]    ${localizador}    ${texto}   
    ${descricao}=    Get Element Attribute    ${localizador}    content-desc
    Should Contain    ${descricao}    ${texto}


Clica no elemento e insere o texto
    [Arguments]      ${localizador}    ${texto}
    Click Element    ${localizador}
    Wait Until Keyword Succeeds    5    1    is_keyboard_shown 
    Input Text       ${localizador}    ${texto}
    Hide Keyboard



#API

Cria sessao na api
  ${HEADERS}=  Create Dictionary    accept=application/json    Content-Type=application/json
  Create Session    alias=apiRaro    url=${HOST}    headers=${HEADERS}

Cadastrar usuário
    [Arguments]
    Cria sessao na api
      ${FAKER_NOME}=     FakerLibrary.name
      ${FAKER_EMAIL}=    FakerLibrary.Email
      Set Global Variable    ${USER_NOME}     ${FAKER_NOME}
      Set Global Variable    ${USER_EMAIL}    ${FAKER_EMAIL}

      ${body}=   Create Dictionary    name=${FAKER_NOME}  email=${USER_EMAIL}  password=${USER_SENHA}

      ${resposta}=  POST On Session    alias=apiRaro    url=/users  json=&{body}
      Wait Until Keyword Succeeds    10    1    Should Be Equal As Numbers    ${resposta.status_code}    201
      Log To Console    Usuário cadastrado com sucesso

Loga o usuário
    [Arguments]
    Cria sessao na api
    ${body}=   Create Dictionary    email=${USER_EMAIL}  password=${USER_SENHA}
    ${resposta}=  POST On Session    alias=apiRaro    url=/auth/login  json=${body}
    Wait Until Keyword Succeeds    10    1    Should Be Equal As Numbers    ${resposta.status_code}    200
    Set Global Variable    ${TOKEN_USUARIO}    ${resposta.json()['accessToken']}
    Log To Console    Usuário logado com sucesso

Tornar usuário administrador
    [Arguments]   ${TOKEN}
    ${HEADERS}=  Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${TOKEN}
    ${resposta}=  PATCH On Session    alias=apiRaro    url=/users/admin   headers=${HEADERS}
    Wait Until Keyword Succeeds    10    1    Should Be Equal As Numbers    ${resposta.status_code}    204
    Log To Console    Usuário promovido a administrador com sucesso

Cadastrar Filme
    Cadastrar usuário
    Loga o usuário
    Tornar usuário administrador    ${TOKEN_USUARIO}
    ${FAKER_TITULO}=     FakerLibrary.Job
    ${FAKER_GENERO}=     FakerLibrary.Prefix
    ${FAKER_DESCRICAO}=  FakerLibrary.Paragraph
    ${FAKER_DURACAO}=    FakerLibrary.RandomInt    60    180
    ${FAKER_ANO}=        FakerLibrary.RandomInt    1900    2024
    ${HEADERS}=  Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${TOKEN_USUARIO}
    ${body}=   Create Dictionary    title=${FAKER_TITULO}  genre=${FAKER_GENERO}  description=${FAKER_DESCRICAO}  durationInMinutes=${FAKER_DURACAO}  releaseYear=${FAKER_ANO}
    ${resposta}=  POST On Session    alias=apiRaro    url=/movies  headers=${HEADERS}    json=${body}    
    Wait Until Keyword Succeeds    10    1    Should Be Equal As Strings    ${resposta.status_code}    201
    Log To Console    Filme cadastrado com sucesso

Verifica se existe filmes cadastrados
    Cria sessao na api
    ${resposta}=  GET On Session    alias=apiRaro    url=/movies
    Wait Until Keyword Succeeds    10    1    Should Be Equal As Numbers    ${resposta.status_code}    200
    IF   ${resposta.json()} == []
        Log To Console    Não existem filmes cadastrados, Cadastrando...
        Cadastrar Filme
    ELSE
        Set Global Variable    ${TITULO_FILME}    ${resposta.json()[0]['title']}
        Set Global Variable    ${GENERO_FILME}    ${resposta.json()[0]['description']}
        Log To Console    ${resposta.json()[0]['title']}
        Log To Console    ${resposta.json()[0]['genre']}
        Log To Console    Filmes cadastrados encontrados
    END