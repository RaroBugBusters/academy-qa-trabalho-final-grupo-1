*** Settings ***

Resource    ../../base.robot

*** Variables ***
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

Dado que estou cadastrado
  Cadastrar usuário

Dado que estou logado
  Dado que estou cadastrado
  Quando acesso a página de login
  E preencho o campo de email com um email válido
  E preencho o campo de senha com uma senha válida
  Click Element    ${BTN_LOGIN}
  
Quando acesso a página de login
  Aguarda o elemento e faz o clique  ${MENU_HAMBURGUER}  ${MENU_HAMBURGUER}
  Aguarda o elemento e faz o clique  ${MENU_LOGIN}       ${MENU_LOGIN}

Quando clico no botão de logout
  Wait Until Element Is Visible      ${TEXTO_PAGINA_INICIAL}
  Aguarda o elemento e faz o clique  ${MENU_HAMBURGUER}  ${MENU_HAMBURGUER}
  Aguarda o elemento e faz o clique  ${MENU_LOGOUT}      ${MENU_LOGOUT}

Quando tento acessar a página de registro
  Aguarda o elemento e faz o clique  ${MENU_HAMBURGUER}  ${MENU_HAMBURGUER}

E preencho o campo de email com um email válido
  Clica no elemento e insere o texto  ${INPUT_EMAIL_LOGIN}  ${USER_EMAIL}

E preencho o campo de senha com uma senha válida
  Clica no elemento e insere o texto  ${INPUT_SENHA_LOGIN}  ${USER_SENHA}

E preencho o campo de email com um email inválido
  Clica no elemento e insere o texto  ${INPUT_EMAIL_LOGIN}  j@gm342123

E preencho o campo de senha com uma senha inválida
  Clica no elemento e insere o texto  ${INPUT_SENHA_LOGIN}  123

E deixo o campo de email vazio
  Click Element    ${INPUT_EMAIL_LOGIN}
  Hide Keyboard

E deixo o campo de senha vazio
  Click Element    ${INPUT_SENHA_LOGIN}
  Hide Keyboard
  
E devo ser redirecionado para a página inicial
  Page Should Contain Element      ${TEXTO_LOGIN_SUCESSO} 
  Aguarda o elemento estar visível e verifica o texto    ${TEXTO_PAGINA_INICIAL}    Home

Então devo ser autenticado com sucesso
  Click Element    ${BTN_LOGIN}
  Aguarda o elemento estar visível e verifica o texto    ${TEXTO_LOGIN_SUCESSO}    Login realizado!
  

Então devo ver a mensagem de erro que o email é inválido
  Click Element    ${BTN_LOGIN}
  Aguarda o elemento estar visível e verifica o texto    ${ERROR_EMAIL_INVALIDO}    Informe um e-mail válido.
  Page Should Contain Element      ${ERROR_EMAIL_INVALIDO}
  
Então devo ver a mensagem de erro falha ao autenticar
  Click Element    ${BTN_LOGIN}
  Aguarda o elemento estar visível e verifica o texto    ${ERROR_SENHA_INVALIDA}    Usuário ou senha inválidos.
  Page Should Contain Element      ${ERROR_SENHA_INVALIDA}

Então devo ver a mensagem de erro que os campos email e senha devem ser preenchidos
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