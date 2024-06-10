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
    Quando eu informar os dados de <nome>, <email> invalido, <senha> e <confirmarSenha>
    Então uma mensagem de erro deve ser exibida
    Exemplos:
    | nome         | email              | senha    | confirmarSenha  |
    | "BugBusters" | "bugbusters@.com"  | "123456" | "123456"        |
    | "BugBusters" | "bugbusters.com"   | "123456" | "123456"        |
    | "BugBusters" | "bugbusters@qa"    | "123456" | "123456"        |
    | "BugBusters" | "@qa.com"          | "123456" | "123456"        |

Cenario: Cadastro de usuário com campo senha e confirmar senha diferentes

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar os dados com senha e confirmar senha diferentes
    Então uma mensagem de senhas diferentes deve ser exibida

Cenario: Cadastro de usuário com email ja existente

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar os dados de email ja existente
    Então uma mensagem de email ja existente deve ser exibida

Cenario: Cadastro de usuário com campos obrigatórios vazios

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar os dados de <Nome>, <Email>, <Senha> e <ConfirmarSenha> vazios
    Então uma mensagem de preenchimento obrigatório deve ser exibida
    Exemplos:
    | Nome         | Email                | Senha       | ConfirmarSenha   |
    | ""           | "bugbusters@qa.com"  | "123456"    | "123456"         |
    | "BugBusters" | ""                   | "123456"    | "123456"         |
    | "BugBusters" | "bugbusters@qa.com"  | ""          | "123456"         |
    | "BugBusters" | "bugbusters@qa.com"  | "123456"    | ""               |