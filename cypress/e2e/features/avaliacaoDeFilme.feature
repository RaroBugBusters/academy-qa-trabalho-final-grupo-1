# language: pt
Funcionalidade: Avaliação de filmes

  Cenário: CT001 - Avaliação de filmes com sucesso

   Dado que eu acesso o site e estou logado
   Quando pesquisar pelo filme "Duna"
   E selecionar o rating 5 e escrever uma review
   Então a avaliação deve ser registrada

  Cenário: CT002 - Avaliação de filmes com rating 0

   Dado que eu acesso o site e crio um usuário
   Quando pesquisar pelo filme "Duna"
   E não selecionar o rating e escrever uma review
   Então a avaliação deve gerar uma mensagem de erro

  # Cenário: CT003 - Avaliação de filmes sem review

  #  Dado que eu acesso o site e loguei
  #  Quando pesquisar pelo filme "Duna"
  #  E selecionar o rating 5 e não escrever uma review
  #  Então não deve ser possível gerar uma avaliação

  # Cenário: CT004 - Avaliação de filmes com mesmo usuário

  #  Dado que eu acesso o site e loguei
  #  Quando pesquisar pelo filme "Duna"
  #  E selecionar o rating 3 e escrever uma nova review
  #  Então a avaliação e o rating devem ser atualizados
