
/*
 * ARQUIVO: navegacao.js
 *
 * Responsável pelo sistema de navegação da Pokédex.
 *
 * Principais funcionalidades:
 * - Alternar entre as abas Início e Favoritos;
 * - Atualizar o título conforme a aba selecionada;
 * - Limpar a pesquisa ao retornar para Início;
 * - Controlar a exibição da paginação;
 * - Executar a animação da Pokébola ao sair;
 * - Redirecionar o usuário para a página inicial.
 */


// ==================== MENUS DE NAVEGAÇÃO ====================

// Seleciona os botões do menu.
const menuInicio = document.querySelector("#menu-inicio");
const menuFavoritos = document.querySelector("#menu-favoritos");

// Seleciona o título da seção de Pokémon.
const tituloPokemons = document.querySelector("#titulo-pokemons");


/*
 * EVENTO: MENU FAVORITOS
 *
 * Executado quando o usuário seleciona a aba Favoritos.
 *
 * Impede o comportamento padrão do link,
 * remove o destaque da aba Início e ativa Favoritos.
 *
 * Atualiza o título da página e chama mostrarFavoritos(),
 * responsável por carregar os Pokémon salvos.
 */
menuFavoritos.addEventListener("click", function (event) {

    // Impede que o link recarregue ou redirecione a página.
    event.preventDefault();

    // Atualiza a aparência dos botões de navegação.
    menuInicio.classList.remove("ativo");
    menuFavoritos.classList.add("ativo");

    // Altera o título da seção.
    tituloPokemons.textContent = "MEUS FAVORITOS";

    // Carrega os Pokémon favoritos.
    mostrarFavoritos();

});


/*
 * EVENTO: MENU INÍCIO
 *
 * Executado quando o usuário retorna à aba principal.
 *
 * Remove o destaque da aba Favoritos, ativa Início
 * e limpa o campo de pesquisa.
 *
 * Também torna a paginação visível novamente,
 * restaura o título original e carrega os Pokémon
 * correspondentes à página selecionada.
 */
menuInicio.addEventListener("click", function (event) {

    event.preventDefault();

    // Atualiza a aparência dos menus.
    menuFavoritos.classList.remove("ativo");
    menuInicio.classList.add("ativo");

    // Limpa qualquer pesquisa realizada anteriormente.
    document.querySelector("#campo-pesquisa").value = "";

    // Exibe novamente os controles da paginação.
    document.querySelector(".paginacao").style.display = "";

    // Restaura o título principal.
    tituloPokemons.textContent = "TODOS OS POKÉMONS";

    // Carrega os Pokémon da página atual.
    mostrarPagina();

});



// ==================== ANIMAÇÃO DE SAÍDA ====================

// Seleciona o botão da Pokébola presente no cabeçalho.
const botaoPokebolaSair = document.querySelector(".botao-pokebola");

// Seleciona a imagem da Pokébola dentro do botão.
const imagemPokebola = botaoPokebolaSair.querySelector("img");


/*
 * EVENTO: CLIQUE NA POKÉBOLA
 *
 * Inicia a animação de saída quando o usuário
 * clica na Pokébola do cabeçalho.
 *
 * A classe "clicada" ativa os efeitos definidos
 * anteriormente no CSS.
 */
botaoPokebolaSair.addEventListener("click", function () {

    botaoPokebolaSair.classList.add("clicada");

});


/*
 * EVENTO: ANIMAÇÃO DA IMAGEM
 *
 * Aguarda o término de uma animação CSS
 * executada na imagem da Pokébola.
 *
 * Quando a animação termina, remove a classe
 * "clicada", permitindo reutilizar o efeito.
 */
imagemPokebola.addEventListener("animationend", function () {

    botaoPokebolaSair.classList.remove("clicada");

});


/*
 * EVENTO: REDIRECIONAMENTO PARA A PÁGINA INICIAL
 *
 * Aguarda o término da animação "clickPokebola".
 *
 * Quando essa animação termina, redireciona
 * o usuário para inicial.html.
 *
 * A verificação do nome impede que outras
 * animações CSS provoquem o redirecionamento.
 */
botaoPokebolaSair.addEventListener("animationend", function (event) {

    if (event.animationName === "clickPokebola") {

        window.location.href = "inicial.html";

    }

});
