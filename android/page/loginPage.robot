*** Settings ***

Resource    ../../base.robot

*** Variables ***
${HOST}         https://raromdb-3c39614e42d4.herokuapp.com
${POST_USER}    api/users
${USER_NOME}   
${USER_EMAIL}
${USER_SENHA}    123456

${MENU_LOGIN}    xpath=//android.view.View[@content-desc="Login"]
${BTN_LOGIN}      xpath=//android.widget.Button[@content-desc="Login"]
${INPUT_EMAIL}      xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_SENHA}      xpath=//android.widget.ImageView/android.widget.EditText[2]


*** Keywords ***

Dado que estou cadastrado
  ${FAKER_NOME}=     FakerLibrary.name
  ${FAKER_EMAIL}=    FakerLibrary.Email
  Set Global Variable    ${USER_NOME}     ${FAKER_NOME}
  Set Global Variable    ${USER_EMAIL}    ${FAKER_EMAIL}

  ${body}=   Create Dictionary    name=${FAKER_NOME}  email=${USER_EMAIL}  password=${USER_SENHA}

  ${response}=  POST On Session    alias=CreateUser    url=${HOST}/api/users  json=&{body}
  Log To Console    ${response}
  Should Be Equal As Numbers    ${response.status_code}    201

Quando acesso a pagina de login
  Aguarda o elemento e faz o clique  ${MENU_HAMBURGUER}  ${MENU_HAMBURGUER}
  Aguarda o elemento e faz o clique  ${MENU_LOGIN}       ${MENU_LOGIN}
  Wait Until Element Is Visible      ${BTN_LOGIN}    ${BTN_LOGIN}

E preencher o email com um e-mail válido
  Clica no elemento e insere o texto  ${INPUT_EMAIL}  ${USER_EMAIL}

E preencher a senha com uma senha válida
  Clica no elemento e insere o texto  ${INPUT_SENHA}  ${USER_SENHA}

Então devo ser autenticado e ser redirecionado para a página inicial
  Aguarda o elemento e faz o clique  ${BTN_LOGIN}  ${BTN_LOGIN}
  

  


