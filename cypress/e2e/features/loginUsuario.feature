# language: pt

Funcionalidade: Login

  Contexto: Deve ter acesso à página de login
   Dado que acessei a página de login
   E que estou cadastrado

  Cenário: CT001 - Acessar a página de login
   Quando coloco meu email
   E coloco a minha senha
   E confirmo a operação
   Então devo ser autenticado e ser redirecionado para a página inicial

  Cenário: CT002 - Não deve ser possível concluir a operação sem digitar o e-mail
   Quando eu não digito o email
   E coloco a minha senha
   E confirmo a operação
   Então devo ver a mensagem de erro falha ao autenticar

  Cenário: CT003 - Não deve ser possível concluir a operação sem digitar a senha
   Quando coloco meu email
   E não coloco a minha senha
   E confirmo a operação
   Então devo ver a mensagem de erro falha ao autenticar

  Cenário: CT004 - Não deve ser possível concluir a operação com senha incorreta
   Quando coloco meu email
   E digito a senha incorreta
   E confirmo a operação
   Então devo ver a mensagem de erro falha ao autenticar
