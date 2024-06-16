# language: pt
Funcionalidade: Pesquisa de Filmes

  # Cenário: CT001 - Pesquisa de Filmes com sucesso

  #  Dado que eu acesso o site
  #  Quando pesquiso pelo filme existente "Duna"
  #  Então deve ser exibido o resultado da busca

  Cenário: CT002 - Pesquisa de Filmes não existente

   Dado que eu acesso o site
   Quando pesquiso pelo filme "Filme inexistente"
   Então deve ser exibido que nenhum filme foi encontrado

  Cenário: CT003 - Pesquisa de Filmes com campo vazio

   Dado que eu acesso o site
   Quando pesquiso pelo filme ""
   Então deve ser exibido a lista com todos os filmes

  Cenário: CT004 - Pesquisa de Filmes com caracteres especiais

   Dado que eu acesso o site
   Quando pesquiso pelo filme "@#$!!@"
   Então deve ser exibido que nenhum filme foi encontrado
