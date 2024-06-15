*** Settings ***

Resource    ../../base.robot

Test Setup    Abrir App
Test Teardown    Teardown

*** Test Cases ***

CT001 - Cadastro de usuário com sucesso
    Dado que acessei a página de cadastro
    Quando preencher um nome válido
    E preencher um email válido
    E preencher uma senha válida
    E confirmar a senha corretamente
    Então deve exibir a mensagem de sucesso

CT002 - Cadastro com email inválido (menos de 5 caracteres)
    Dado que acessei a página de cadastro
    Quando preencher um email inválido com 4 caracteres
    E preencher as demais informações corretamente
    Então deve exibir a mensagem de erro que o email é inválido

CT003 - Cadastro sem email
    Dado que acessei a página de cadastro
    Quando preencher um nome válido
    E deixar o campo de email vazio
    E preencher uma senha válida
    E confirmar a senha corretamente
    Então deve exibir a mensagem de erro que o email é obrigatório

CT004 - Cadastro com email maior que 60 caracteres
    Dado que acessei a página de cadastro
    Quando preencher um nome válido
    E preencher um email com 61 caracteres
    E preencher uma senha válida
    E confirmar a senha corretamente
    Então deve exibir a mensagem de erro que o email é inválido

CT005 - Cadastro com email já cadastrado
    Dado que existe um usuário cadastrado
    Quando preencher um nome válido
    E preencher um email já cadastrado
    E preencher uma senha válida
    E confirmar a senha corretamente
    Então deve exibir a mensagem de erro que o email já está cadastrado

CT006 - Cadastro com senha inválida (menor que 6 dígitos)
    Dado que acessei a página de cadastro
    Quando preencher um nome válido
    E preencher um email válido
    E preencher uma senha menor que 6 dígitos
    E confirmar a senha com o mesmo valor   
    Então deve exibir a mensagem de erro que o cadastro falhou

CT007 - Cadastro com senha inválida (maior que 12 dígitos)
    Dado que acessei a página de cadastro
    Quando preencher um nome válido
    E preencher um email válido
    E preencher uma senha maior que 12 dígitos
    E confirmar a senha com o mesmo valor
    Então deve exibir a mensagem de erro que o cadastro falhou

CT008 - Cadastro com confirmação de senha incorreta
    Dado que acessei a página de cadastro
    Quando preencher um nome válido
    E preencher um email válido
    E preencher uma senha válida
    E confirmar a senha incorretamente
    Então deve exibir a mensagem de erro que as senhas devem ser iguais

CT009 - Cadastro com nome de até 100 caracteres
    Dado que acessei a página de cadastro
    Quando preencher um nome com 100 caracteres
    E preencher um email válido
    E preencher uma senha válida
    E confirmar a senha corretamente
    Então deve exibir a mensagem de sucesso

CT010 - Cadastro com nome maior que 100 caracteres
    Dado que acessei a página de cadastro
    Quando preencher um nome com 101 caracteres
    E preencher um email válido
    E preencher uma senha válida
    E confirmar a senha corretamente
    Então deve exibir a mensagem de erro que o cadastro falhou

CT011 - Cadastro sem nome
    Dado que acessei a página de cadastro
    Quando deixar o campo de nome vazio
    E preencher um email válido
    E preencher uma senha válida
    E confirmar a senha corretamente
    Então deve exibir a mensagem de erro que o nome é obrigatório

CT012 - Cadastro sem senha
    Dado que acessei a página de cadastro
    Quando preencher um nome válido
    E preencher um email válido
    E deixar o campo de senha vazio
    E confirmar a senha corretamente
    Então deve exibir a mensagem de erro que a senha é obrigatória
