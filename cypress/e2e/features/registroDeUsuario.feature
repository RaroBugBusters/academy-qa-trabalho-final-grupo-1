#language: pt
Funcionalidade: Cadastro de usuário

  Cenário: CT001 - Cadastro de usuário com sucesso

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar os dados de cadastro corretamente
   Então uma mensagem de sucesso deve ser exibida

  Cenário: CT002 - Cadastro de usuário com email já existente

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar os dados de email já existente
   Então uma mensagem de email já existente deve ser exibida

  Cenário: CT003 - Cadastro de usuário com campo email inválido

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar os dados de <nome>, <email> inválido, <senha> e <confirmarSenha>
   Então uma mensagem de erro deve ser exibida
   Exemplos:
    | nome         | email             | senha    | confirmarSenha |
    | "BugBusters" | "bugbusters@.com" | "123456" | "123456"       |
    | "BugBusters" | "bugbusters.com"  | "123456" | "123456"       |
    | "BugBusters" | "bugbusters@qa"   | "123456" | "123456"       |
    | "BugBusters" | "@qa.com"         | "123456" | "123456"       |

  Cenário: CT004 - Cadastro de usuário com senhas diferentes

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar os dados com senha e confirmar senha diferentes
   Então uma mensagem de senhas diferentes deve ser exibida

  Cenário: CT005 - Cadastro de usuário com campos obrigatórios vazios

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar os dados de <Nome>, <Email>, <Senha> e <ConfirmarSenha> vazios
   Então uma mensagem de preenchimento obrigatório deve ser exibida
   Exemplos:
    | Nome         | Email               | Senha    | ConfirmarSenha |
    | ""           | "bugbusters@qa.com" | "123456" | "123456"       |
    | "BugBusters" | ""                  | "123456" | "123456"       |
    | "BugBusters" | "bugbusters@qa.com" | ""       | "123456"       |
    | "BugBusters" | "bugbusters@qa.com" | "123456" | ""             |

  Cenário: CT006 - Cadastro de nome de usuário com caracteres especiais

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar um nome com caracteres especiais
   Então uma mensagem de sucesso deve ser exibida

  Cenário: CT007 - Cadastro de email de usuário com caracteres especiais

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar um email com caracteres especiais
   Então uma mensagem de sucesso deve ser exibida

  Cenário: CT008 - Cadastro de senha de usuário com caracteres especiais

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar uma senha com caracteres especiais
   Então uma mensagem de sucesso deve ser exibida

  Cenário: CT009 - Cadastro de nome com mais de 100 caracteres

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar um nome com mais de 100 caracteres
   Então uma mensagem de máximo de 100 caracteres deve ser exibida

  Cenário: CT010 - Cadastro de nome com 99 caracteres

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar um nome com 99 caracteres
   Então uma mensagem de sucesso deve ser exibida

  Cenário: CT011 - Cadastro de nome com 100 caracteres

   Dado que eu acesso o site
   E quero registrar um usuário
   Quando eu informar um nome com 100 caracteres
   Então uma mensagem de sucesso deve ser exibida
