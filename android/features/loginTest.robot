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
   E preencher o email com um e-mail válido
   E preencher a senha com uma senha válida
   # Então devo ver a mensagem de erro falha ao autenticar

CT003 - Deve ser exibida uma mensagem de erro ao tentar logar com senha inválida
   Dado que estou cadastrado
   Quando acesso a pagina de login
   E preencher o email com um e-mail válido
   E preencher a senha com uma senha inválida
   Então devo ver a mensagem de erro falha ao autenticar