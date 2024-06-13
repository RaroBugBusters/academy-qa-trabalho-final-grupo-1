*** Settings ***

Resource    ../../base.robot

*** Variables ***
${HOST}         https://raromdb-3c39614e42d4.herokuapp.com/api
${USER_NOME}   
${USER_EMAIL}
${USER_SENHA}    123456

${MENU_LOGIN}    xpath=//android.view.View[@content-desc="Login"]
${BTN_LOGIN}      xpath=//android.widget.Button[@content-desc="Login"]
${MENU_LOGOUT}    xpath=//android.view.View[@content-desc="Sair"]
${INPUT_EMAIL_LOGIN}      xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_SENHA_LOGIN}      xpath=//android.widget.ImageView/android.widget.EditText[2]

${ERROR_EMAIL_INVALIDO}    xpath=//android.view.View[@content-desc="Informe um e-mail válido."]
${ERROR_SENHA_INVALIDA}    xpath=//android.view.View[@content-desc="Usuário ou senha inválidos."]
${ERROR_EMAIL_SEM_PREENCHIMENTO}    xpath=//android.view.View[@content-desc="Informe o e-mail."]
${ERROR_SENHA_SEM_PREENCHIMENTO}    xpath=//android.view.View[@content-desc="Informe uma senha."]

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

Dado que estou logado
  Dado que estou cadastrado
  Quando acesso a pagina de login
  E preencher o email com um e-mail válido
  E preencher a senha com uma senha válida
  Click Element    ${BTN_LOGIN}
  
Quando acesso a pagina de login
  Aguarda o elemento e faz o clique  ${MENU_HAMBURGUER}  ${MENU_HAMBURGUER}
  Aguarda o elemento e faz o clique  ${MENU_LOGIN}       ${MENU_LOGIN}

Quando clico no botão de logout
  Aguarda o elemento e faz o clique  ${MENU_HAMBURGUER}  ${MENU_HAMBURGUER}
  Aguarda o elemento e faz o clique  ${MENU_LOGOUT}      ${MENU_LOGOUT}

E preencher o email com um e-mail válido
  Clica no elemento e insere o texto  ${INPUT_EMAIL_LOGIN}  ${USER_EMAIL}

E preencher a senha com uma senha válida
  Clica no elemento e insere o texto  ${INPUT_SENHA_LOGIN}  ${USER_SENHA}

E preencher o email com um e-mail inválido
  Clica no elemento e insere o texto  ${INPUT_EMAIL_LOGIN}  j@gm342123

E preencher a senha com uma senha inválida
  Clica no elemento e insere o texto  ${INPUT_SENHA_LOGIN}  123

E não preencher o email com um e-mail
  Click Element    ${INPUT_EMAIL_LOGIN}
  Hide Keyboard

E não preencher a senha com uma senha
  Click Element    ${INPUT_SENHA_LOGIN}
  Hide Keyboard
  
Então devo ser autenticado e ser redirecionado para a página inicial
  Click Element    ${BTN_LOGIN}
  Aguarda o elemento estar visível e verifica o texto    ${TEXTO_LOGIN_SUCESSO}    Login realizado!
  Page Should Contain Element      ${TEXTO_LOGIN_SUCESSO} 
  Aguarda o elemento estar visível e verifica o texto    ${TEXTO_PAGINA_INICIAL}    Home

Então devo ver a mensagem de erro de e-mail inválido
  Click Element    ${BTN_LOGIN}
  Aguarda o elemento estar visível e verifica o texto    ${ERROR_EMAIL_INVALIDO}    Informe um e-mail válido.
  Page Should Contain Element      ${ERROR_EMAIL_INVALIDO}
  
Então devo ver a mensagem de erro falha ao autenticar
  Click Element    ${BTN_LOGIN}
  Aguarda o elemento estar visível e verifica o texto    ${ERROR_SENHA_INVALIDA}    Usuário ou senha inválidos.
  Page Should Contain Element      ${ERROR_SENHA_INVALIDA}

Então devo ver a mensagem de erro que deve ser preenchido o campo email e senha
  Click Element    ${BTN_LOGIN}
  Aguarda o elemento estar visível e verifica o texto    ${ERROR_EMAIL_SEM_PREENCHIMENTO}    Informe o e-mail.
  Page Should Contain Element      ${ERROR_EMAIL_SEM_PREENCHIMENTO}
  Aguarda o elemento estar visível e verifica o texto    ${ERROR_SENHA_SEM_PREENCHIMENTO}    Informe uma senha.
  Page Should Contain Element      ${ERROR_SENHA_SEM_PREENCHIMENTO}

Então não devo conseguir acessar a página de registro
  Aguarda o elemento e faz o clique  ${MENU_HAMBURGUER}  ${MENU_HAMBURGUER}
  Wait Until Page Does Not Contain Element    ${BTN_MENU_REGISTRO}
  Page Should Not Contain Element    ${BTN_MENU_REGISTRO}

Então devo visualizar as opções de login e registro
  Wait Until Element Is Visible    ${MENU_LOGIN}
  Page Should Contain Element    ${MENU_LOGIN}
  Page Should Contain Element    ${BTN_MENU_REGISTRO}



