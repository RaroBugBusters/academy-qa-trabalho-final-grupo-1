#language: pt
Funcionalidade: Cadastro de usuário

Cenario: Cadastro de usuário

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar os dados de cadastro corretamente
    Então uma mensagem de sucesso deve ser exibida

Cenario: Cadastro de usuário com email ja existente

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar os dados de email ja existente
    Então uma mensagem de email ja existente deve ser exibida

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

Cenario: Cadastro de nome de usuário com caracteres especiais

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar um nome com caracteres especiais
    Então uma mensagem de sucesso deve ser exibida

Cenario: Cadastro de email de usuário com caracteres especiais

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar um email com caracteres especiais
    Então uma mensagem de sucesso deve ser exibida

Cenario: Cadastro de senha de usuário com caracteres especiais

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar uma senha com caracteres especiais
    Então uma mensagem de sucesso deve ser exibida

Cenario: Cadastro de nome com mais de 100 caracteres

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar um nome com mais de 100 caracteres
    Então uma mensagem de máximo de 100 deve ser exibida

Cenario: Cadastro de nome com de 99 caracteres

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar um nome com 99 caracteres
    Então uma mensagem de sucesso deve ser exibida

Cenario: Cadastro de nome com 100 caracteres

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar um nome com 100 caracteres
    Então uma mensagem de sucesso deve ser exibida

Cenario: Cadastro de email com 61 caracteres

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar um email com 61 caracteres
    Então uma mensagem de máximo de 60 deve ser exibida

Cenario: Cadastro de email com 60 caracteres

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar um email com 60 caracteres
    Então uma mensagem de sucesso deve ser exibida

Cenario: Cadastro de email com 59 caracteres

    Dado que eu acesso o site
    E quero registrar um usuário
    Quando eu informar um email com 59 caracteres
    Então uma mensagem de sucesso deve ser exibida