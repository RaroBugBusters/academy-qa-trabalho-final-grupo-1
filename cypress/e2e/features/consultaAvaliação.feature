# language: pt

Funcionalidade: Consulta de avaliações do usuário

Contexto: Acessar a página de avaliação de filmes 

Dado que sou usuário autenticado no sistema 
Quando eu consulto minhas avaliações no sistema 
Então deve me retornar uma lista com todos os filmes que eu avaliei 

Cenário: Usuário autenticado sem avaliações
Dado que eu sou um usuário autenticado
E eu não fiz nenhuma avaliação
Quando eu consulto minhas avaliações
Então eu devo ver uma mensagem indicando que não há avaliações disponíveis

Cenário: Usuário tenta consultar avaliações sem estar autenticado
Dado que eu não estou autenticado
Quando eu tento consultar minhas avaliações
Então eu devo ser redirecionado para a página de login



