*** Settings ***

Resource    ../../base.robot

Test Setup    Abrir App
Test Teardown    Teardown

*** Test Cases ***

CT001 - Deve ser possivel realizar login com credenciais válidas
   Dado que estou cadastrado
   Quando acesso a pagina de login
   E preencher o email com um e-mail válido
   E preencher a senha com uma senha válida
   Então devo ser autenticado e ser redirecionado para a página inicial

CT002 - Deve ser exibida uma mensagem de erro ao tentar logar com email inválido
   Dado que estou cadastrado
   Quando acesso a pagina de login
   E preencher o email com um e-mail inválido
   E preencher a senha com uma senha válida
   Então devo ver a mensagem de erro de e-mail inválido

CT003 - Deve ser exibida uma mensagem de erro ao tentar logar com senha inválida
   Dado que estou cadastrado
   Quando acesso a pagina de login
   E preencher o email com um e-mail válido
   E preencher a senha com uma senha inválida
   Então devo ver a mensagem de erro falha ao autenticar 

CT004 - Deve ser exibida uma mensagem de erro ao tentar logar sem preencher o campo email e senha
   Dado que estou cadastrado
   Quando acesso a pagina de login
   E não preencher o email com um e-mail
   E não preencher a senha com uma senha
   Então devo ver a mensagem de erro que deve ser preenchido o campo email e senha

CT005 - Não deve ser possível acessar a página de registro quando estiver logado
   Dado que estou logado
   Então não devo conseguir acessar a página de registro

CT006 - Deve ser possível realizar o logout
   Dado que estou logado
   Quando clico no botão de logout
   Então devo visualizar as opções de login e registro
   