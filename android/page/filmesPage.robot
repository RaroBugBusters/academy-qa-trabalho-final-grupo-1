*** Settings ***

Resource    ../../base.robot

*** Variables ***
${FAKER_TITULO}
${FAKER_GENERO}
${FAKER_DESCRICAO}
${FAKER_DURACAO}
${FAKER_ANO}

${TEXTO_PAGINA_DETALHES}    xpath=//android.view.View[@content-desc="Detalhes do filme"]
${BOTAO_AVALIAR}            xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${CAMPO_AVALIACAO}          xpath=//android.widget.EditText
${TRES_ESTRELAS}            xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[3]
${CINCO_ESTRELAS}           xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[5]

${BOTAO_SALVAR}             xpath=//android.widget.Button[@content-desc="Salvar"]

${TEXTO_REVIEW_SUCESSO}          xpath=//android.view.View[@content-desc="Sua review foi adicionada!"]
${TEXTO_ERRO_AVALIACAO_LOGIN}     xpath=//android.view.View[@content-desc="Faça login e tente novamente."]
${TEXTO_ERRO_AVALIACAO_CAMPO}    xpath=//android.view.View[@content-desc="Não foi possível adicionar sua review."]

${FILME_CADASTRADO}

*** Keywords ***

Dado que existe um filme cadastrado
    Verifica se existe filmes cadastrados

Dado que já realizei uma avaliação para um filme
    Dado que existe um filme cadastrado
    E estou logado
    Quando seleciono um filme
    E clico em avaliar
    E dou uma nota de 3 estrelas
    E preencho o campo de texto
    E clico em Salvar

Quando seleciono um filme
   Aguarda o texto e faz o clique    ${FILME_CADASTRADO.get('title')}

Quando retornar para tela de detalhes do filme
    Go Back
    Wait Until Page Contains    ${FILME_CADASTRADO.get('title')}

E retorno para a tela anterior
    Go Back
    
E existem avaliações para o filme
    Adiciona avaliações ao filme com texto e score    ${FILME_CADASTRADO.get('id')}

E clico em avaliar
    Wait Until Element Is Visible    ${BOTAO_AVALIAR}
    Click Element    ${BOTAO_AVALIAR}
    Wait Until Page Contains    Review

E preencho o campo de texto com um texto maior que 500 caracteres
    ${REVIEW_TEXT}=    Random Letters    501
    Clica no elemento e insere o texto    ${CAMPO_AVALIACAO}    ${REVIEW_TEXT}

E preencho o campo de texto
    ${FAKER_TEXT}=    FakerLibrary.Paragraph
    Clica no elemento e insere o texto    ${CAMPO_AVALIACAO}    ${FAKER_TEXT}

E dou uma nota de 3 estrelas
    Click Element    ${TRES_ESTRELAS}

E clico em Salvar
    Click Element    ${BOTAO_SALVAR}

E estou logado
    Dado que estou cadastrado
    Quando acesso a página de login
    E preencho o campo de email com um email válido
    E preencho o campo de senha com uma senha válida
    Click Element    ${BTN_LOGIN}

Então os detalhes do filme devem ser exibidos
    ${duracao_formatada}  Converter Duracao Para Horas E Minutos  ${FILME_CADASTRADO.get('durationInMinutes')}

    Wait Until Page Contains Element         ${TEXTO_PAGINA_DETALHES}
    Wait Until Page Contains          ${FILME_CADASTRADO.get('title')}
    Page Should Contain Text          ${FILME_CADASTRADO.get('title')}
    Page Should Contain Text          Ano de Lançamento: ${FILME_CADASTRADO.get('releaseYear')}
    Page Should Contain Text          Duração: ${duracao_formatada}
    Page Should Contain Text          Gênero: ${FILME_CADASTRADO.get('genre')}
    Swipe By Percent    50    70    50    30
    Wait Until Page Contains    Avaliação da audiência
    Page Should Contain Text    Avaliação da audiência
    Page Should Contain Text    Avaliação da crítica
    

Então o filme deve ser exibido na lista de filmes na página inicial
    Wait Until Page Contains         ${FILME_CADASTRADO.get('title')}
    Page Should Contain Text         ${FILME_CADASTRADO.get('title')}
    Page Should Contain Text         ${FILME_CADASTRADO.get('description')}

Então as avaliações do filme devem ser exibidas
    ${data_atual}=   Get Current Date    result_format=%d/%m/%Y
    Wait Until Keyword Succeeds   30    1    Deslizar Até Texto Visível  Por "${USER_NOME}" em ${data_atual}
    Page Should Contain Text    Por "${USER_NOME}" em ${data_atual}
    Page Should Contain Text    ${REVIEW_TEXT}

Então devo ver a mensagem de erro que é necessário estar logado para avaliar um filme
    Wait Until Page Contains Element    ${TEXTO_ERRO_AVALIACAO_LOGIN}
    Page Should Contain Element         ${TEXTO_ERRO_AVALIACAO_LOGIN}  
    Verifica se o elemento contém o texto    ${TEXTO_ERRO_AVALIACAO_LOGIN}    Faça login e tente novamente.

Então deve ser exibida a mensagem que a review foi adicionada com sucesso
    Wait Until Page Contains Element        ${TEXTO_REVIEW_SUCESSO} 
    Page Should Contain Element             ${TEXTO_REVIEW_SUCESSO} 
    Verifica se o elemento contém o texto   ${TEXTO_REVIEW_SUCESSO}   Sua review foi adicionada!

Então devo ver a mensagem de erro que não foi possível adicionar a review
    Wait Until Page Contains Element    ${TEXTO_ERRO_AVALIACAO_CAMPO}
    Page Should Contain Element         ${TEXTO_ERRO_AVALIACAO_CAMPO}  
    Verifica se o elemento contém o texto    ${TEXTO_ERRO_AVALIACAO_CAMPO}    Não foi possível adicionar sua review.