#language: pt
Funcionalidade: Gerenciamento de conta
  Contexto: O usuário deve estar cadastrado no sistema para acessar a página de gerenciamento de conta
   Dado que estou cadastrado e logado no sistema

  Cenário: CT001 - Deve ser possivel visualizar as informações no gerenciamento de conta com o tipo de usuário Comum
   Quando o tipo de usuário for do tipo "0"
   E que acesso a pagina de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Comum"

  Cenário: CT002 - Deve ser possivel visualizar as informações no gerenciamento de conta com o tipo de usuário Administrador
   Quando o tipo de usuário for do tipo "1"
   E que acesso a pagina de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Administrador"
  
  Cenário: CT003 - Deve ser possivel visualizar as informações no gerenciamento de conta com o tipo de usuário Crítico(a)
   Quando o tipo de usuário for do tipo "2"
   E que acesso a pagina de gerenciamento de conta
   Então devo visualizar as minhas informações
   E o tipo de usuário deve ser "Crítico(a)"

  Cenário: CT004 - Deve redirecionar para a página de login ao acessar a página de gerenciamento de conta sem estar logado
   E que acesso a pagina de gerenciamento de conta
   Quando realizar o logout
   E acessar a página de gerenciamento de conta sem estar logado
   Então devo ser redirecionado para página de login
  
  Cenário: CT005 - Não deve ser possivel alterar o email no gerenciamento de conta
   E que acesso a pagina de gerenciamento de conta
   Então o campo de email deve estar desabilitado

  Cenário: CT006 - Deve ser possivel alterar o nome no gerenciamento de conta
   E que acesso a pagina de gerenciamento de conta
   Quando alterar o nome para um nome válido
   E clicar em Salvar
   Então devo visualizar a mensagem que a informação foi alterada com sucesso

  Cenário: CT007 - Deve ser possivel alterar a senha no gerenciamento de conta
   E que acesso a pagina de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   Quando clicar em Alterar senha
   E preencher os campos de senha e confirmação de senha corretamente
   E clicar em Salvar
   Então devo visualizar a mensagem que a informação foi alterada com sucesso
  
  Esquema do Cenário: CT008 - Deve exibir mensagem de erro ao tentar alterar a senha com menos de 6 dígitos
   E que acesso a pagina de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   Quando clicar em Alterar senha
   E preencher os campos de senha e confirmação de senha incorretamente "<senha>"
   E clicar em Salvar
   Então devo visualizar a mensagem de erro que a senha deve ter pelo menos 6 dígitos
   Exemplos:
    | senha |
    | 12345 |
    | 1     |

  Esquema do Cenário: CT009 - Deve exibir mensagem de erro ao tentar alterar a senha com senha maior que 12 dígitos
   E que acesso a pagina de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   Quando clicar em Alterar senha
   E preencher os campos de senha e confirmação de senha incorretamente "<senha>"
   E clicar em Salvar
   Então devo visualizar a mensagem de erro que a senha deve ter no máximo 12 dígitos
   Exemplos:
    | senha            |
    | 1234567890123    |
    | 1234567890123456 |

  Esquema do Cenário: CT010 - Deve exibir mensagem de erro ao tentar alterar a senha com senhas diferentes
   E que acesso a pagina de gerenciamento de conta
   E os campos de senha e confirmação de senha estão desabilitados
   Quando clicar em Alterar senha
   E preencher os campos de senha e confirmação de senha incorretamente "<senha>" e "<confirmacaoSenha>"
   E clicar em Salvar
   Então devo visualizar a mensagem de erro que as senhas não são iguais
   Exemplos:
    | senha     | confirmacaoSenha |
    | 123456    | 1234567          |
    | 123456789 | 12345678         |