*** Settings ***

Resource   ../../base.robot


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

