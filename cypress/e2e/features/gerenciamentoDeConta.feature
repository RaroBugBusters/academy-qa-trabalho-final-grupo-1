#language: pt
Funcionalidade: Gerenciamento de conta
  Contexto: O usuário deve estar cadastrado no sistema para acessar a página de gerenciamento de conta
   Dado que estou cadastrado e logado no sistema

  Cenário: CT001 - Visualizar informações de usuário Comum no gerenciamento de conta
   Quando o tipo de usuário for "0"
   E acesso a página de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Comum"

  Cenário: CT002 - Visualizar informações de usuário Administrador no gerenciamento de conta
   Quando o tipo de usuário for "1"
   E acesso a página de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Administrador"

  Cenário: CT003 - Visualizar informações de usuário Crítico(a) no gerenciamento de conta
   Quando o tipo de usuário for "2"
   E acesso a página de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Crítico(a)"

  Cenário: CT004 - Redirecionar para a página de login ao acessar a página de gerenciamento de conta sem estar logado
   Quando realizo o logout
   E acesso a página de gerenciamento de conta
   Então devo ser redirecionado para a página de login

  Cenário: CT005 - Campo de email desabilitado no gerenciamento de conta
   Quando acesso a página de gerenciamento de conta
   Então o campo de email deve estar desabilitado

  Cenário: CT006 - Alterar o nome no gerenciamento de conta
   Quando acesso a página de gerenciamento de conta
   E altero o nome para um nome válido
   E clico em Salvar
   Então devo visualizar a mensagem de que a informação foi alterada com sucesso

  Cenário: CT007 - Alterar a senha no gerenciamento de conta
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clico em Alterar senha
   E preencho os campos de senha e confirmação de senha corretamente
   E clico em Salvar
   Então devo visualizar a mensagem de que a informação foi alterada com sucesso

  Esquema do Cenário: CT008 - Exibir mensagem de erro ao tentar alterar a senha com menos de 6 dígitos
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clico em Alterar senha
   E preencho os campos de senha e confirmação de senha com "<senha>"
   E clico em Salvar
   Então devo visualizar a mensagem de erro de que a senha deve ter pelo menos 6 dígitos
   Exemplos:
    | senha |
    | 12345 |
    | 1     |

  Esquema do Cenário: CT009 - Exibir mensagem de erro ao tentar alterar a senha com mais de 12 dígitos
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clico em Alterar senha
   E preencho os campos de senha e confirmação de senha com "<senha>"
   E clico em Salvar
   Então devo visualizar a mensagem de erro de que a senha deve ter no máximo 12 dígitos
   Exemplos:
    | senha          |
    | 1234567890123  |
    | 12345678901234 |

  Esquema do Cenário: CT010 - Exibir mensagem de erro ao tentar alterar a senha com senhas diferentes
   Quando acesso a página de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   E clico em Alterar senha
   E preencho os campos de senha com "<senha>" e confirmação de senha com "<confirmacaoSenha>"
   E clico em Salvar
   Então devo visualizar a mensagem de erro de que as senhas não são iguais
   Exemplos:
    | senha     | confirmacaoSenha |
    | 123456    | 1234567          |
    | 123456789 | 12345678         |
