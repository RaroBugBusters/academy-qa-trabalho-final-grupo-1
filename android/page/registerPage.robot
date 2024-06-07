*** Settings ***

Resource    ../../base.robot

*** Variables ***
${TEXTO_PAGINA_INICIAL}         xpath=//android.view.View[@content-desc="Home"]
${TEXTO_PAGINA_CADASTRO}        xpath=//android.view.View[@content-desc="Cadastro"]
${MENU_HAMBURGUER}     xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${BTN_MENU_REGISTRO}       xpath=//android.view.View[@content-desc="Registre-se"]
${INPUT_NOME}         xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_EMAIL}        xpath=//android.widget.ImageView/android.widget.EditText[2]
${INPUT_SENHA}        xpath=//android.widget.ImageView/android.widget.EditText[3]
${INPUT_CONF_SENHA}   xpath=//android.widget.ImageView/android.widget.EditText[4]
${BTN_REGISTRAR}      xpath=//android.widget.Button[@content-desc="Registrar"]
${MENSAGEM_CADASTRO}  xpath=//android.view.View[@content-desc="Cadastro realizado!"]

*** Keywords ***

Dado que acessei a página de cadastro
    Aguarda o elemento e faz o clique    ${TEXTO_PAGINA_INICIAL}    ${MENU_HAMBURGUER}  
    Aguarda o elemento e faz o clique    ${BTN_MENU_REGISTRO}       ${BTN_MENU_REGISTRO}
    Wait Until Element Is Visible        ${TEXTO_PAGINA_CADASTRO}

Quando o usuário preencher um nome válido
    ${FAKER_NOME}=    FakerLibrary.name
    Clica no elemento e insere o texto    ${INPUT_NOME}    ${FAKER_NOME}
E um email válido
    ${FAKER_EMAIL}=    FakerLibrary.Email
    Clica no elemento e insere o texto    ${INPUT_EMAIL}    ${FAKER_EMAIL}


E uma senha válida 
    ${SENHA}=    Set Variable    123456
    Clica no elemento e insere o texto    ${INPUT_SENHA}    ${SENHA}


E confirmar a senha corretamente
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}    123456


Então o cadastro deve ser realizado com sucesso e o usuário deve ver a mensagem de sucesso
    Click Element                    ${BTN_REGISTRAR}
    Wait Until Keyword Succeeds    5    0.3    Page Should Contain Text    Cadastro realizado!

# Quando o usuário preencher um nome válido

# E preencher um email inválido "<email>"


# E preencher uma senha válida e confirmar a senha corretamente


# E clicar no botão de Cadastrar


# Então o usuário deve ver a mensagem de erro "Não foi possível cadastrar o usuário."
  

# Quando o usuário preencher um email válido
    

# E preencher os campos de senha e confirmação de senha com uma senha inválida "<senha>"
  
# Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro "<mensagemDeErro>"
  
# E confirmar a senha incorretamente
  
# Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que as senhas devem ser iguais
    
# E preencher um email já cadastrado
  
# Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que o e-mail já está cadastrado
 
# [Teardown] Limpar Campos



