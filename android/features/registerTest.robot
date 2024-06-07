*** Settings ***

Resource     ../utils/config.robot

Test Setup    Abrir App
Test Teardown    Teardown

*** Test Cases ***

CT001 - Deve ser possível cadastrar um usuário com sucesso
    Dado que acessei a página de cadastro
    Quando o usuário preencher um nome válido
    E um email válido
    E uma senha válida 
    E confirmar a senha corretamente
    Então o cadastro deve ser realizado com sucesso e o usuário deve ver a mensagem de sucesso

# CT002 - Deve exibir mensagem de erro ao tentar cadastrar um usuário com email inválido
#     Dado que acessei a página de cadastro
#     Quando o usuário preencher um nome válido
#     E preencher um email inválido "<email>"
#     E preencher uma senha válida e confirmar a senha corretamente
#     E clicar no botão de Cadastrar
#     Então o usuário deve ver a mensagem de erro "Não foi possível cadastrar o usuário."
#     [Teardown] Limpar Campos
#     [Arguments] ${email}
#     [Template]
#     | jey@          |
#     | jey@gmail     |
#     | @gmail.com    |
#     | jey@.com      |

# CT003 - Deve exibir mensagem de erro ao tentar cadastrar um usuário com senha inválida
#     Dado que acessei a página de cadastro
#     Quando o usuário preencher um nome válido
#     E preencher um email válido
#     E preencher os campos de senha e confirmação de senha com uma senha inválida "<senha>"
#     E clicar no botão de Cadastrar
#     Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro "<mensagemDeErro>"
#     [Teardown] Limpar Campos
#     [Arguments] ${senha} ${mensagemDeErro}
#     [Template]
#     | 12345             | A senha deve ter pelo menos 6 dígitos. |
#     | 1                 | A senha deve ter pelo menos 6 dígitos. |
#     | 1234567891023     | A senha deve ter no máximo 12 dígitos. |
#     | 12345678910123468 | A senha deve ter no máximo 12 dígitos. |

# CT004 - Deve exibir mensagem de erro ao confirmar a senha incorretamente
#     Dado que acessei a página de cadastro
#     Quando o usuário preencher um nome válido
#     E preencher um email válido
#     E preencher uma senha válida
#     E confirmar a senha incorretamente
#     E clicar no botão de Cadastrar
#     Então o cadastro não deve ser realizado e o usuário deve ver a mensagem que as senhas devem ser iguais.
#     [Teardown] Limpar Campos

# CT005 - Deve exibir mensagem de erro ao cadastrar um usuário com email já cadastrado
#     Dado que acessei a página de cadastro
#     Quando o usuário preencher um nome válido
#     E preencher um email já cadastrado
#     E preencher uma senha válida e confirmar a senha corretamente
#     E clicar no botão de Cadastrar
#     Então o cadastro não deve ser realizado e o usuário deve ver a mensagem de erro que o e-mail já está cadastrado
#     [Teardown] Limpar Campos
