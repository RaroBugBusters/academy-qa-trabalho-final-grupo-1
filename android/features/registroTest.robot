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

CT002 - Deve exibir mensagem de erro ao tentar cadastrar um usuário com email com 4 caracteres
    Dado que acessei a página de cadastro
    Quando preencher um email inválido com 4 caracteres
    E preencher as demais informações corretamente
    Então o usuário deve ver a mensagem de erro que o email é inválido

CT010 - Não deve ser possível cadastrar um usuário sem email 
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E não preencher o campo de email
    E preencher uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que o email é obrigatório

CT11 - Não deve ser possivel cadastrar um usuário com email com mais de 60 caracteres
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email com 61 caracteres
    E preencher uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que o cadastro falhou

CT005 - Deve exibir mensagem de erro ao cadastrar um usuário com email já cadastrado
    Dado que existe um usuario cadastrado
    Quando o usuário preencher um nome válido
    E preencher um email já cadastrado
    E preencher uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que o e-mail já está cadastrado

CT003 - Deve exibir mensagem de erro ao tentar cadastrar um usuário com senha inválida menor que 6 dígitos
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email válido
    E preencher os campos de senha e confirmação de senha com uma senha menor que 6 dígitos
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que o cadastro falhou
 
CT004 - Deve exibir mensagem de erro ao tentar cadastrar um usuário com senha inválida maior que 12 dígitos
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email válido
    E preencher os campos de senha e confirmação de senha com uma senha maior que 12 dígitos
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que o cadastro falhou

CT004 - Deve exibir mensagem de erro ao confirmar a senha incorretamente
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email válido
    E preencher uma senha válida
    E confirmar a senha incorretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que as senhas devem ser iguais.


CT006 - Deve ser possível cadastrar um usuário com nome até 100 caracteres
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome com 100 caracteres
    E preencher um email válido
    E preencher uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro deve ser realizado com sucesso e o usuário deve ver a mensagem de sucesso

CT007 - Não deve ser possível cadastrar um usuário com nome maior que 100 caracteres
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome com 101 caracteres
    E preencher um email válido
    E preencher uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que o cadastro falhou

CT008 - Não deve ser possível cadastrar um usuário sem informar um nome
    Dado que acessei a página de cadastro
    Quando o usuário não preencher o campo de nome
    E preencher um email válido
    E preencher uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que o nome é obrigatório

CT009 - Não deve ser possível cadastrar usuário sem informar senha
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E preencher um email válido
    E não preencher o campo de senha
    E confirmar a senha corretamente
    Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que a senha é obrigatória



