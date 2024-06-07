*** Settings ***

Resource   ../../base.robot


*** Keywords ***

Aguarda o elemento e faz o clique
    [Arguments]    ${locatorIsVisible}   ${locatorToClick}
    Wait Until Element Is Visible        ${locatorIsVisible}
    Click Element                        ${locatorToClick}

Verifica se o elemento contém o texto
    [Arguments]    ${locator}    ${text}   
    ${desc}=    Get Element Attribute    ${locator}    content-desc
    Should Contain    ${desc}    ${text}

Clica no elemento e insere o texto
    [Arguments]      ${locator}    ${text}
    Click Element    ${locator}
    Input Text       ${locator}    ${text}
    Hide Keyboard