*** Settings ***

Resource    ../../base.robot

*** Variables ***

#texto
${TEXTO_PAGINA_INICIAL}         xpath=//android.view.View[@content-desc="Home"]
${TEXTO_PAGINA_CADASTRO}        xpath=//android.view.View[@content-desc="Cadastro"]
${TEXTO_CADASTRO_SUCESSO}       Cadastro realizado!
${TEXTO_EMAIL_INVALIDO}         Informe um e-mail válido.
${TEXTO_CADASTRO_FALHOU}        Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.
${TEXTO_SENHAS_DIFERENTES}      As senhas não coincidem.
${TEXTO_EMAIL_CADASTRADO}       E-mail já cadastrado. Utilize outro e-mail.
${TEXTO_NOME_OBRIGATORIO}       Informe o nome.
${TEXTO_SENHA_OBRIGATORIA}      Informe uma senha.
${TEXTO_EMAIL_OBRIGATORIO}      Informe o e-mail.


#input
${INPUT_NOME}                 xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUT_EMAIL_REGISTRO}       xpath=//android.widget.ImageView/android.widget.EditText[2]
${INPUT_SENHA_REGISTRO}       xpath=//android.widget.ImageView/android.widget.EditText[3]
${INPUT_CONF_SENHA}           xpath=//android.widget.ImageView/android.widget.EditText[4]

#botão
${BTN_REGISTRAR}              xpath=//android.widget.Button[@content-desc="Registrar"]
${BTN_MENU_REGISTRO}          xpath=//android.view.View[@content-desc="Registre-se"]

#modal
${MODAL_CADASTRO}             xpath=//android.view.View[@content-desc="Cadastro realizado!"]
${MODAL_CADASTRO_FALHOU}      xpath=//android.view.View[@content-desc="Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."]
${MODAL_EMAIL_CADASTRADO}     xpath=//android.view.View[@content-desc="E-mail já cadastrado. Utilize outro e-mail."]
${MODAL_NOME_OBRIGATORIO}     xpath=//android.view.View[@content-desc="Informe o nome."]
${MODAL_SENHA_OBRIGATORIA}    xpath=//android.view.View[@content-desc="Informe uma senha."]
${MODAL_EMAIL_OBRIGATORIO}    xpath=//android.view.View[@content-desc="Informe o e-mail."]

${EMAIL_CADASTRADO}
${MENU_HAMBURGUER}            xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${ELEMENTO_SENHA_DIFERENTE}   xpath=//android.view.View[@content-desc="As senhas não coincidem."]

*** Keywords ***

Dado que acessei a página de cadastro
    Aguarda o elemento e faz o clique     ${TEXTO_PAGINA_INICIAL}    ${MENU_HAMBURGUER}  
    Aguarda o elemento e faz o clique     ${BTN_MENU_REGISTRO}       ${BTN_MENU_REGISTRO}
    Wait Until Element Is Visible         ${TEXTO_PAGINA_CADASTRO}

Dado que existe um usuário cadastrado
    Aguarda o elemento e faz o clique     ${TEXTO_PAGINA_INICIAL}    ${MENU_HAMBURGUER}  
    Aguarda o elemento e faz o clique     ${BTN_MENU_REGISTRO}       ${BTN_MENU_REGISTRO}
    Wait Until Element Is Visible         ${TEXTO_PAGINA_CADASTRO}
    ${FAKER_NOME}=    FakerLibrary.name
    Clica no elemento e insere o texto    ${INPUT_NOME}              ${FAKER_NOME}
    ${FAKER_EMAIL}=    FakerLibrary.Email
    Set Global Variable                   ${EMAIL_CADASTRADO}        ${FAKER_EMAIL}
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    ${FAKER_EMAIL}
    ${SENHA}=    Set Variable    123456
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}    ${SENHA}
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}        ${SENHA}
    Click Element                         ${BTN_REGISTRAR}
    Aguarda o elemento e faz o clique     ${TEXTO_PAGINA_INICIAL}    ${MENU_HAMBURGUER}  
    Aguarda o elemento e faz o clique     ${BTN_MENU_REGISTRO}       ${BTN_MENU_REGISTRO}


Quando preencher um nome válido
    ${FAKER_NOME}=    FakerLibrary.name
    Clica no elemento e insere o texto    ${INPUT_NOME}              ${FAKER_NOME}

Quando preencher um email inválido
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    emailinvalido

Quando preencher um nome com 100 caracteres
    ${FAKER_NOME}=    Random Letters    100
    Clica no elemento e insere o texto    ${INPUT_NOME}              ${FAKER_NOME}
    
Quando preencher um nome com 101 caracteres
    ${FAKER_NOME}=    Random Letters    101
    Clica no elemento e insere o texto    ${INPUT_NOME}              ${FAKER_NOME}

Quando deixar o campo de nome vazio
    Click Element    ${INPUT_NOME}
    Hide Keyboard
    
Quando preencher um email inválido com 4 caracteres
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    a@g.c

    
E preencher um email válido
    ${FAKER_EMAIL}=    FakerLibrary.Email
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    ${FAKER_EMAIL}


E preencher uma senha válida
    Set Global Variable    ${SENHA}    123456
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}    ${SENHA}

E preencher as demais informações corretamente
    ${FAKER_NOME}=    FakerLibrary.name
    Clica no elemento e insere o texto    ${INPUT_NOME}              ${FAKER_NOME}
    ${SENHA}=    Set Variable    123456
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}    ${SENHA}
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}        ${SENHA}

E confirmar a senha corretamente
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}        123456

E preencher um email já cadastrado
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    ${EMAIL_CADASTRADO}

E preencher uma senha menor que 6 dígitos
    Set Global Variable                   ${SENHA}                   12345
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}    ${SENHA}

E confirmar a senha com o mesmo valor
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}        ${SENHA}


E preencher uma senha maior que 12 dígitos
    Set Global Variable                   ${SENHA}                   12345678910123456
    Clica no elemento e insere o texto    ${INPUT_SENHA_REGISTRO}    ${SENHA}

E deixar o campo de senha vazio
    Click Element    ${INPUT_SENHA_REGISTRO}
    Hide Keyboard

E deixar o campo de email vazio
    Click Element    ${INPUT_EMAIL_REGISTRO}
    Hide Keyboard

E confirmar a senha incorretamente
    Clica no elemento e insere o texto    ${INPUT_CONF_SENHA}        1234567

E preencher um email com 61 caracteres
    ${FAKER_EMAIL}=    Set Variable     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@g.com
    Clica no elemento e insere o texto    ${INPUT_EMAIL_REGISTRO}    ${FAKER_EMAIL}

Então deve exibir a mensagem de sucesso
    Click Element                    ${BTN_REGISTRAR}
    Wait Until Keyword Succeeds    5    0.3    Page Should Contain Text    ${TEXTO_CADASTRO_SUCESSO}     

Então deve exibir a mensagem de erro que o email é inválido
    Click Element                    ${BTN_REGISTRAR}
    Wait Until Page Contains         ${TEXTO_EMAIL_INVALIDO}    
    Page Should Contain Text         ${TEXTO_EMAIL_INVALIDO}

Então deve exibir a mensagem de erro que o cadastro falhou
    Click Element                                          ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${MODAL_CADASTRO_FALHOU}       ${TEXTO_CADASTRO_FALHOU}

Então deve exibir a mensagem de erro que as senhas devem ser iguais
    Click Element                                          ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${ELEMENTO_SENHA_DIFERENTE}    ${TEXTO_SENHAS_DIFERENTES}
    
Então deve exibir a mensagem de erro que o email já está cadastrado
    Click Element                    ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${MODAL_EMAIL_CADASTRADO}      ${TEXTO_EMAIL_CADASTRADO}

Então deve exibir a mensagem de erro que o nome é obrigatório
    Click Element                    ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${MODAL_NOME_OBRIGATORIO}      ${TEXTO_NOME_OBRIGATORIO}

Então deve exibir a mensagem de erro que a senha é obrigatória
    Click Element                    ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${MODAL_SENHA_OBRIGATORIA}     ${TEXTO_SENHA_OBRIGATORIA}

Então deve exibir a mensagem de erro que o email é obrigatório
    Click Element                    ${BTN_REGISTRAR}
    Aguarda o elemento estar visível e verifica o texto    ${MODAL_EMAIL_OBRIGATORIO}     ${TEXTO_EMAIL_OBRIGATORIO}
 



