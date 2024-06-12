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