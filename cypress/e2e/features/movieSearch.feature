# language: pt
Funcionalidade: Pesquisa de Filmes

Cenario: Pesquisa de Filmes com sucesso

    Dado que eu acesso o site
    Quando pesquiso pelo filme existente "Duna"
    Então deve ser exibido o resultado da busca

Cenario: Pesquisa de Filmes não existente

    Dado que eu acesso o site
    Quando pesquiso pelo filme "Filme inexistente"
    Então deve ser exibido que nenhum filme foi encontrado

Cenario: Pesquisa de Filmes com campo vazio

    Dado que eu acesso o site
    Quando pesquiso pelo filme ""
    Então deve ser exibido a lista com todos os filmes

Cenario: Pesquisa de Filmes com caracteres especiais

    Dado que eu acesso o site
    Quando pesquiso pelo filme "@#$!!@"
    Então deve ser exibido que nenhum filme foi encontrado