*** Settings ***

Resource    ../../base.robot

*** Variables ***
${FAKER_TITULO}
${FAKER_GENERO}
${FAKER_DESCRICAO}
${FAKER_DURACAO}
${FAKER_ANO}

${TEXTO_PAGINA_DETALHES}    xpath=//android.view.View[@content-desc="Detalhes do filme"]

${FILME_CADASTRADO}

*** Keywords ***

Dado que existe um filme cadastrado
    Verifica se existe filmes cadastrados

Converter Duracao Para Horas E Minutos
    [Arguments]    ${duracao_em_minutos}
    ${horas}    Evaluate    ${duracao_em_minutos} // 60
    ${minutos}  Evaluate    ${duracao_em_minutos} % 60
    ${duracao_formatada}  Set Variable    ${horas}h ${minutos}m
    RETURN    ${duracao_formatada}

E existe avaliações para o filme
    Adiciona avaliações ao filme com texto e score    ${FILME_CADASTRADO.get('id')}

# E clicar em avaliar

Quando selecionar um filme
   Aguarda o texto e faz o clique    ${FILME_CADASTRADO.get('title')}

Então deve ser exibido o detalhe do filme
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
    

Então deve ser exibido o filme na lista de filmes
    Wait Until Page Contains         ${FILME_CADASTRADO.get('title')}
    Page Should Contain Text         ${FILME_CADASTRADO.get('title')}
    Page Should Contain Text         ${FILME_CADASTRADO.get('description')}

Então deve ser exibido as avaliações do filme
    ${data_atual}=   Get Current Date    result_format=%d/%m/%Y
    Wait Until Keyword Succeeds   30    1    Deslizar Até Texto Visível  Por "${USER_NOME}" em ${data_atual}
    Page Should Contain Text    Por "${USER_NOME}" em ${data_atual}
    Page Should Contain Text    ${REVIEW_TEXT}