# language: pt

Funcionalidade: Login

  Contexto: Deve ter acesso a página de login
   Dado que acessei a página de login


  Cenário: Acessar a página de login
   Quando coloco meu email
   E coloco a minha senha
   E confirmo a operação


  Cenário: Não deve ser possível concluir a operação sem digitar o e-mail
   Dado que acessei a página de login
   Quando eu não digito o email
   E coloco a minha senha
   E confirmo a operação


  Cenário: Não deve ser possível concluir a operação sem digitar a senha
   Dado que acessei a página de login
   Quando coloco meu email
   E não coloco a minha senha
   E confirmo a operação

  Cenário: Não deve ser possível concluir a operação sem digitar a senha
   Dado que acessei a página de login
   Quando coloco meu email
   E digito a senha incorreta
   E confirmo a operação









