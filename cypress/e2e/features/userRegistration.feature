#language: pt
Funcionalidade: Cadastro de usuário

Cenario: Cadastro de usuário

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar os dados de cadastro
    Então uma mensagem de sucesso deve ser exibida
@ignore
Cenario: Cadastro de usuário com campos em branco

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar os dados de cadastro em branco
    Então uma mensagem de erro deve ser exibida
    Exemplos:
    | nome | email | senha | confirmar senha |
    