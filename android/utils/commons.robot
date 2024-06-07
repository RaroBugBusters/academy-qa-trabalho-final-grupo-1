*** Settings ***

Resource   ../../base.robot


*** Keywords ***

Aguarda o elemento e faz o clique
    [Arguments]    ${locatorIsVisible}   ${locatorToClick}
    Wait Until Element Is Visible        ${locatorIsVisible}
    Click Element                        ${locatorToClick}

Aguarda o elemento estar visível e verifica o texto
    [Arguments]    ${locator}    ${text}
    Wait Until Keyword Succeeds    5x    1s    Elemento deve estar visível    ${locator}
    ${desc}=    Get Element Attribute    ${locator}    content-desc
    Should Contain    ${desc}    ${text}

Elemento deve estar visível
    [Arguments]    ${locator}
    ${status}=    Run Keyword And Return Status    Element Should Be Visible    ${locator}
    Should Be True    ${status}

Verifica se o elemento contém o texto
    [Arguments]    ${locator}    ${text}   
    ${desc}=    Get Element Attribute    ${locator}    content-desc
    Should Contain    ${desc}    ${text}

Clica no elemento e insere o texto
    [Arguments]      ${locator}    ${text}
    Click Element    ${locator}
    Wait Until Keyword Succeeds    5    1    is_keyboard_shown 
    Input Text       ${locator}    ${text}
    Hide Keyboard
