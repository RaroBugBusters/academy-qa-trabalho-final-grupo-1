*** Settings ***

Resource    ../../base.robot

*** Variables ***
${EMAIL_CADASTRADO}
#texto
${TEXTO_PAGINA_INICIAL}         xpath=//android.view.View[@content-desc="Home"]
${TEXTO_PAGINA_CADASTRO}        xpath=//android.view.View[@content-desc="Cadastro"]
${TEXTO_CADASTRO_SUCESSO}       Cadastro realizado!
${TEXTO_EMAIL_INVALIDO}         Informe um e-mail válido.
${TEXTO_CADASTRO_FALHOU}        Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.
${TEXTO_SENHAS_DIFERENTES}      As senhas não coincidem.
${TEXTO_EMAIL_CADASTRADO}       E-mail já cadastrado. Utilize outro e-mail.


#input
${INPUT_NOME}         xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_EMAIL_REGISTRO}        xpath=//android.widget.ImageView/android.widget.EditText[2]
${INPUT_SENHA_REGISTRO}        xpath=//android.widget.ImageView/android.widget.EditText[3]
${INPUT_CONF_SENHA}   xpath=//android.widget.ImageView/android.widget.EditText[4]

#botão
${BTN_REGISTRAR}           xpath=//android.widget.Button[@content-desc="Registrar"]
${BTN_MENU_REGISTRO}       xpath=//android.view.View[@content-desc="Registre-se"]

#modal
${MODAL_CADASTRO}           xpath=//android.view.View[@content-desc="Cadastro realizado!"]
${MODAL_CADASTRO_FALHOU}    xpath=//android.view.View[@content-desc="Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."]
${MODAL_EMAIL_CADASTRADO}   xpath=//android.view.View[@content-desc="E-mail já cadastrado. Utilize outro e-mail."]


${MENU_HAMBURGUER}            xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${ELEMENTO_SENHA_DIFERENTE}   xpath=//android.view.View[@content-desc="As senhas não coincidem."]

*** Keywords ***

Dado que acessei a página de cadastro
    Aguarda o elemento e faz o clique    ${TEXTO_PAGINA_INICIAL}    ${MENU_HAMBURGUER}  
    Aguarda o elemento e faz o clique    ${BTN_MENU_REGISTRO}       ${BTN_MENU_REGISTRO}
    Wait Until Element Is Visible        ${TEXTO_PAGINA_CADASTRO}

Dado que existe um usuario cadastrado
    Aguarda o elemento e faz o clique    ${TEXTO_PAGINA_INICIAL}    ${MENU_HAMBURGUER}  
    Aguarda o elemento e faz o clique    ${BTN_MENU_REGISTRO}       ${BTN_MENU_REGISTRO}
    Wait Until Element Is Visible        ${TEXTO_PAGINA_CADASTRO}
    ${FAKER_NOME}=    FakerLibrary.name
    Clica no elemento e insere o texto    ${INPUT_NOME}    ${FAKER_NOME}
    ${FAKER_EMAIL}=    FakerLibrary.Email
    Set Global Variable    ${EMAIL_CADASTRADO}    ${FAKER_EMAIL}
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    ${FAKER_EMAIL}
    ${SENHA}=    Set Variable    123456
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}         ${SENHA}
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}    ${SENHA}
    Click Element                    ${BTN_REGISTRAR}
    Aguarda o elemento e faz o clique    ${TEXTO_PAGINA_INICIAL}    ${MENU_HAMBURGUER}  
    Aguarda o elemento e faz o clique    ${BTN_MENU_REGISTRO}       ${BTN_MENU_REGISTRO}


Quando o usuário preencher um nome válido
    ${FAKER_NOME}=    FakerLibrary.name
    Clica no elemento e insere o texto    ${INPUT_NOME}    ${FAKER_NOME}

Quando preencher um email inválido
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    emailinvalido

E preencher um email válido
    ${FAKER_EMAIL}=    FakerLibrary.Email
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    ${FAKER_EMAIL}


E preencher uma senha válida
    ${SENHA}=    Set Variable    123456
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}    ${SENHA}

E preencher as demais informações corretamente
    ${FAKER_NOME}=    FakerLibrary.name
    Clica no elemento e insere o texto    ${INPUT_NOME}    ${FAKER_NOME}
    ${SENHA}=    Set Variable    123456
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}    ${SENHA}
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}    ${SENHA}

E confirmar a senha corretamente
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}    123456

E preencher um email já cadastrado
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    ${EMAIL_CADASTRADO}

E preencher os campos de senha e confirmação de senha com uma senha menor que 6 dígitos
    ${SENHA}=    Set Variable    12345
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}         ${SENHA}
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}    ${SENHA}

E preencher os campos de senha e confirmação de senha com uma senha maior que 12 dígitos
    ${SENHA}=    Set Variable    12345678910123456
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}         ${SENHA}
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}    ${SENHA}

Então o cadastro deve ser realizado com sucesso e o usuário deve ver a mensagem de sucesso
    Click Element                    ${BTN_REGISTRAR}
    Wait Until Keyword Succeeds    5    0.3    Page Should Contain Text    ${TEXTO_CADASTRO_SUCESSO}     

Então o usuário deve ver a mensagem de erro que o email é inválido
    Click Element                    ${BTN_REGISTRAR}
    Page Should Contain Text         ${TEXTO_EMAIL_INVALIDO}

  
Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que a senha deve ter pelo menos 6 dígitos
    Click Element                                          ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${MODAL_CADASTRO_FALHOU}    ${TEXTO_CADASTRO_FALHOU}
  
Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que a senha deve ter no máximo 12 dígitos
    Click Element                                          ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${MODAL_CADASTRO_FALHOU}    ${TEXTO_CADASTRO_FALHOU}

E confirmar a senha incorretamente
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}    1234567

Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que as senhas devem ser iguais.
    Click Element                                          ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${ELEMENTO_SENHA_DIFERENTE}    ${TEXTO_SENHAS_DIFERENTES}
    
Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que o e-mail já está cadastrado
    Click Element                    ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${MODAL_EMAIL_CADASTRADO}    ${TEXTO_EMAIL_CADASTRADO}
 



