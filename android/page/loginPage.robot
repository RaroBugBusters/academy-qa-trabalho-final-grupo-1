*** Settings ***

Resource    ../../base.robot

*** Variables ***
${HOST}         https://raromdb-3c39614e42d4.herokuapp.com/api
${USER_NOME}   
${USER_EMAIL}
${USER_SENHA}    123456

${MENU_LOGIN}    xpath=//android.view.View[@content-desc="Login"]
${BTN_LOGIN}      xpath=//android.widget.Button[@content-desc="Login"]
${INPUT_EMAIL_LOGIN}      xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_SENHA_LOGIN}      xpath=//android.widget.ImageView/android.widget.EditText[2]

${TEXTO_LOGIN_SUCESSO}    xpath=//android.view.View[@content-desc="Login realizado!"]

*** Keywords ***

Cria sessao na api
  ${HEADERS}=  Create Dictionary    accept=application/json    Content-Type=application/json
  Create Session    alias=CreateUser    url=${HOST}    headers=${HEADERS}

Dado que estou cadastrado
  Cria sessao na api
  ${FAKER_NOME}=     FakerLibrary.name
  ${FAKER_EMAIL}=    FakerLibrary.Email
  Set Global Variable    ${USER_NOME}     ${FAKER_NOME}
  Set Global Variable    ${USER_EMAIL}    ${FAKER_EMAIL}

  ${body}=   Create Dictionary    name=${FAKER_NOME}  email=${USER_EMAIL}  password=${USER_SENHA}

  ${resposta}=  POST On Session    alias=CreateUser    url=/users  json=&{body}
  Wait Until Keyword Succeeds    10    1    Should Be Equal As Numbers    ${resposta.status_code}    201
  
Quando acesso a pagina de login
  Aguarda o elemento e faz o clique  ${MENU_HAMBURGUER}  ${MENU_HAMBURGUER}
  Aguarda o elemento e faz o clique  ${MENU_LOGIN}       ${MENU_LOGIN}
  Aguarda o elemento e faz o clique  ${BTN_LOGIN}        ${BTN_LOGIN}

E preencher o email com um e-mail válido
  Clica no elemento e insere o texto  ${INPUT_EMAIL_LOGIN}  ${USER_EMAIL}

E preencher a senha com uma senha válida
  Clica no elemento e insere o texto  ${INPUT_SENHA_LOGIN}  ${USER_SENHA}

Então devo ser autenticado e ser redirecionado para a página inicial
  Click Element    ${BTN_LOGIN}
  Wait Until Element Is Visible    ${TEXTO_LOGIN_SUCESSO}
  Page Should Contain Element      ${TEXTO_LOGIN_SUCESSO} 
  Should Contain    ${TEXTO_LOGIN_SUCESSO}    Login realizado!
  Wait Until Element Is Visible    ${TEXTO_PAGINA_INICIAL}
  Page Should Contain Text         Home

  

  


