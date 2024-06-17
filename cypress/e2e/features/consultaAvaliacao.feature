# language: pt
Funcionalidade: Consulta de avaliações do usuário

  Contexto: Acessar a página de avaliação de filmes
    Dado que estou cadastrado e logado no sistema

  Cenário: CT001 - Usuário autenticado sem avaliações
    Dado acesso a página do meu perfil
    Quando visualizo as minhas informações
    Então minhas avaliações devem estar vazias

  Cenário: CT001 - Usuário autenticado com avaliações
    Dado realizo avaliação de filme
    E atualizo a página do filme
    E o filme contém minha nova avaliação
    E acesso a página do meu perfil
    Quando visualizo as minhas informações
    Então minhas avaliações devem conter os filmes avaliados

  Cenário: CT002 - Usuário tenta consultar avaliações sem estar autenticado
    Dado que realizo o logout
    Quando eu tento consultar minhas avaliações
    Então devo ser redirecionado para a página de login
