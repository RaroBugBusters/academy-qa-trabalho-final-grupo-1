*** Settings ***

Resource    ../../base.robot

Test Setup    Abrir App
Test Teardown    Teardown

*** Test Cases ***

CT001 - Deve ser possível cadastrar um usuário com sucesso
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email válido
    E preencher uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro deve ser realizado com sucesso e o usuário deve ver a mensagem de sucesso

CT002 - Deve exibir mensagem de erro ao tentar cadastrar um usuário com email inválido
    Dado que acessei a página de cadastro
    Quando preencher um email inválido
    E preencher as demais informações corretamente
    Então o usuário deve ver a mensagem de erro que o email é inválido

CT003 - Deve exibir mensagem de erro ao tentar cadastrar um usuário com senha inválida menor que 6 dígitos
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email válido
    E preencher os campos de senha e confirmação de senha com uma senha menor que 6 dígitos
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que a senha deve ter pelo menos 6 dígitos
 
CT004 - Deve exibir mensagem de erro ao tentar cadastrar um usuário com senha inválida maior que 12 dígitos
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email válido
    E preencher os campos de senha e confirmação de senha com uma senha maior que 12 dígitos
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que a senha deve ter no máximo 12 dígitos

CT004 - Deve exibir mensagem de erro ao confirmar a senha incorretamente
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email válido
    E preencher uma senha válida
    E confirmar a senha incorretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que as senhas devem ser iguais.

CT005 - Deve exibir mensagem de erro ao cadastrar um usuário com email já cadastrado
    Dado que existe um usuario cadastrado
    Quando o usuário preencher um nome válido
    E preencher um email já cadastrado
    E preencher uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que o e-mail já está cadastrado

