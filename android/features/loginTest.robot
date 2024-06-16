*** Settings ***

Resource    ../../base.robot

Test Setup    Abrir App
Test Teardown    Teardown

*** Test Cases ***

CT001 - Login com credenciais válidas
   Dado que estou cadastrado
   Quando acesso a página de login
   E preencho o campo de email com um email válido
   E preencho o campo de senha com uma senha válida
   Então devo ser autenticado com sucesso
   E devo ser redirecionado para a página inicial

CT002 - Mensagem de erro ao logar com email inválido
   Dado que estou cadastrado
   Quando acesso a página de login
   E preencho o campo de email com um email inválido
   E preencho o campo de senha com uma senha válida
   Então devo ver a mensagem de erro que o email é inválido

CT003 - Mensagem de erro ao logar com senha inválida
   Dado que estou cadastrado
   Quando acesso a página de login
   E preencho o campo de email com um email válido
   E preencho o campo de senha com uma senha inválida
   Então devo ver a mensagem de erro falha ao autenticar

CT004 - Mensagem de erro ao logar sem preencher email e senha
   Dado que estou cadastrado
   Quando acesso a página de login
   E deixo o campo de email vazio
   E deixo o campo de senha vazio
   Então devo ver a mensagem de erro que os campos email e senha devem ser preenchidos

CT005 - Bloqueio de acesso à página de registro quando logado
   Dado que estou logado
   Quando tento acessar a página de registro
   Então não devo conseguir acessar a página de registro

CT006 - Realizar logout com sucesso
   Dado que estou logado
   Quando clico no botão de logout
   Então devo visualizar as opções de login e registro
