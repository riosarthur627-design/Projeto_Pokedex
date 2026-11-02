
/*
 * ARQUIVO: paginacaoHTML.js
 *
 * Responsável por controlar a paginação dos Pokémon.
 *
 * Este arquivo gerencia:
 * - A quantidade de Pokémon exibidos por página;
 * - A criação dos botões numerados;
 * - A navegação pelas setas;
 * - A busca dos Pokémon correspondentes à página atual;
 * - A atualização dos botões visíveis da paginação.
 */

// Seleciona a área onde serão exibidos os números das páginas.
const areaNumeros = document.querySelector(".numeros-pagina");

// Define a quantidade total de Pokémon disponíveis na paginação.
const totalPokemons = 400;

// Seleciona as setas utilizadas para avançar e voltar páginas.
const setasPagina = document.querySelectorAll(".paginacao .seta-pagina");

// Define quantos Pokémon serão exibidos em cada página.
const cardsPorPagina = 10;

// Armazena a página em que o usuário está atualmente.
let paginaAtual = 1;

// Seleciona os cards existentes na lista.
const cards = document.querySelectorAll(".lista-pokemons .pokemon-card");

// Calcula o número total de páginas, arredondando para cima.
const totalPaginas = Math.ceil(totalPokemons / cardsPorPagina);


/*
 * FUNÇÃO: mostrarPagina()
 *
 * Responsável por carregar e exibir os Pokémon da página atual.
 *
 * Primeiro, calcula o intervalo de IDs correspondente à página.
 * Depois, limpa a lista anterior e realiza as requisições
 * para buscar os dados dos Pokémon.
 *
 * Utiliza Promise.all() para aguardar todas as buscas e
 * verifica se a requisição ainda corresponde à página atual,
 * evitando exibir resultados de uma navegação anterior.
 */
async function mostrarPagina() {

    // Identifica uma nova solicitação de carregamento.
    requisicaoAtual++;
    const minhaRequisicao = requisicaoAtual;

    // Calcula o primeiro e o último ID da página atual.
    const inicio = (paginaAtual - 1) * cardsPorPagina + 1;
    const fim = inicio + cardsPorPagina - 1;

    // Atualiza os botões numéricos da paginação.
    atualizarPaginacao();

    // Limpa os cards da página anterior.
    const listaPokemons = document.querySelector(".lista-pokemons");
    listaPokemons.innerHTML = "";

    // Array que armazenará as promessas das requisições.
    const promessas = [];

    // Busca os Pokémon pertencentes ao intervalo da página.
    for (let id = inicio; id <= fim; id++) {
        promessas.push(buscarPokemon(id));
    }

    // Aguarda todas as requisições serem concluídas.
    const pokemons = await Promise.all(promessas);

    // Impede que uma requisição antiga sobrescreva a página atual.
    if (minhaRequisicao !== requisicaoAtual) {
        return;
    }

    // Cria os cards com os dados dos Pokémon encontrados.
    pokemons.forEach(function (pokemon) {

        criarCardPokemon(pokemon);

    });

}


/*
 * CRIAÇÃO DOS BOTÕES NUMERADOS
 *
 * Gera automaticamente um botão para cada página disponível.
 *
 * Cada botão recebe seu número e um evento de clique.
 * Quando o usuário seleciona uma página, a variável
 * paginaAtual é atualizada e os Pokémon são carregados.
 */
for (let numero = 1; numero <= totalPaginas; numero++) {

    const botao = document.createElement("button");

    // Adiciona a classe utilizada na estilização.
    botao.classList.add("numeros");

    // Define o número exibido no botão.
    botao.textContent = numero;

    // Permite navegar diretamente para a página selecionada.
    botao.addEventListener("click", function () {
        paginaAtual = numero;
        mostrarPagina();
    });

    // Adiciona o botão à área de paginação.
    areaNumeros.appendChild(botao);
}


/*
 * EVENTO: SETA PARA VOLTAR
 *
 * Permite retornar à página anterior.
 *
 * A condição impede que o usuário tente navegar
 * para uma página menor que a primeira.
 */
setasPagina[0].addEventListener("click", function () {

    if (paginaAtual > 1) {
        paginaAtual--;
        mostrarPagina();
    }

});


/*
 * EVENTO: SETA PARA AVANÇAR
 *
 * Permite navegar para a próxima página.
 *
 * A condição impede que o usuário ultrapasse
 * a última página disponível.
 */
setasPagina[1].addEventListener("click", function () {

    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        mostrarPagina();
    }

});


// Define quantos botões numéricos podem aparecer ao mesmo tempo.
const botoesVisiveis = 5;


/*
 * FUNÇÃO: atualizarPaginacao()
 *
 * Responsável por controlar quais números de página
 * ficam visíveis e destacar a página selecionada.
 *
 * Calcula uma janela de até cinco botões, tentando
 * manter a página atual próxima ao centro.
 *
 * Também verifica os limites da primeira e da última
 * página para evitar números fora do intervalo.
 */
function atualizarPaginacao() {

    // Calcula o início da janela de botões visíveis.
    let inicioJanela = paginaAtual - Math.floor(botoesVisiveis / 2);

    // Impede que a janela comece antes da primeira página.
    if (inicioJanela < 1) {
        inicioJanela = 1;
    }

    // Calcula o último número que deverá aparecer.
    let fimJanela = inicioJanela + botoesVisiveis - 1;

    // Ajusta a janela quando estiver próxima da última página.
    if (fimJanela > totalPaginas) {
        fimJanela = totalPaginas;
        inicioJanela = Math.max(1, fimJanela - botoesVisiveis + 1);
    }

    // Seleciona todos os botões numerados criados anteriormente.
    const numerosPaginacao = document.querySelectorAll(".numeros");

    numerosPaginacao.forEach(function (botao) {

        // Converte o texto do botão em um número.
        const numero = Number(botao.textContent);

        // Exibe somente os números que pertencem à janela atual.
        if (numero >= inicioJanela && numero <= fimJanela) {
            botao.style.display = "";
        } else {
            botao.style.display = "none";
        }

        // Destaca visualmente o botão da página selecionada.
        if (numero === paginaAtual) {
            botao.classList.add("ativo");
        } else {
            botao.classList.remove("ativo");
        }

    });
}
