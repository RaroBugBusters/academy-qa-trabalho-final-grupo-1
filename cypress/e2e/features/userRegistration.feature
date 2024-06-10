#language: pt
Funcionalidade: Cadastro de usuário

Cenario: Cadastro de usuário

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar os dados de cadastro corretamente
    Então uma mensagem de sucesso deve ser exibida

Cenario: Cadastro de usuário com campo email invalido

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar o dado de <nome>, <email> invalido, <senha> e <confirmarSenha>
    Então uma mensagem de erro deve ser exibida
    Exemplos:
    | nome         | email              | senha    | confirmarSenha  |
    | "BugBusters" | "bugbusters@.com"  | "123456" | "123456"        |
    | "BugBusters" | "bugbusters.com"   | "123456" | "123456"        |
    | "BugBusters" | "bugbusters@qa"    | "123456" | "123456"        |
    | "BugBusters" | "@qa.com"          | "123456" | "123456"        |