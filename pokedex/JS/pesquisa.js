
/*
 * ARQUIVO: pesquisa.js
 *
 * Responsável pelo sistema de pesquisa da Pokédex.
 *
 * Principais funcionalidades:
 * - Carregar os nomes e IDs dos primeiros 400 Pokémon;
 * - Permitir pesquisas pelo nome ou número do Pokémon;
 * - Filtrar os resultados conforme o texto digitado;
 * - Buscar os dados completos dos Pokémon encontrados;
 * - Atualizar os cards exibidos na página;
 * - Evitar que requisições antigas sobrescrevam os resultados;
 * - Tratar erros e pesquisas sem resultados.
 */

// Armazena a lista de Pokémon utilizada na pesquisa.
let listaTodosPokemons = [];

// Seleciona o campo de pesquisa do HTML.
const campoPesquisa = document.querySelector("#campo-pesquisa");

// Controla as requisições da pesquisa, paginação e favoritos.
// Deve ser declarada apenas uma vez no projeto.
let requisicaoAtual = 0;
let temporizadorPesquisa;


/*
 * FUNÇÃO: carregarListaPokemonsPesquisa()
 *
 * Responsável por buscar na PokeAPI uma lista contendo
 * os nomes e endereços dos primeiros 400 Pokémon.
 *
 * Esses dados serão utilizados para filtrar os Pokémon
 * conforme o nome ou ID informado pelo usuário.
 *
 * A função utiliza try/catch para identificar possíveis
 * erros de conexão ou problemas com a resposta da API.
 */
async function carregarListaPokemonsPesquisa() {

    try {

        // Solicita a lista dos primeiros 400 Pokémon.
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=400");

        // Verifica se a requisição foi bem-sucedida.
        if (!resposta.ok) {
            throw new Error("Erro ao carregar lista de Pokémon.");
        }

        // Converte a resposta para um objeto JavaScript.
        const dados = await resposta.json();

        // Armazena os resultados para realizar pesquisas.
        listaTodosPokemons = dados.results;

    } catch (erro) {

        // Exibe informações sobre o erro no console.
        console.error("Erro ao carregar lista de Pokémon:", erro);

    }
}


/*
 * EVENTO: DIGITAÇÃO NO CAMPO DE PESQUISA
 *
 * Aguarda 300 milissegundos após o usuário parar
 * de digitar antes de executar a pesquisa.
 *
 * Isso evita várias pesquisas consecutivas
 * e deixa a atualização dos cards mais suave.
 */
campoPesquisa.addEventListener("input", function () {

    // Cancela o temporizador iniciado pela tecla anterior.
    clearTimeout(temporizadorPesquisa);

    // Invalida qualquer busca anterior ainda em andamento.
    requisicaoAtual++;

    // Aguarda 300ms antes de realizar a pesquisa.
    temporizadorPesquisa = setTimeout(function () {

        realizarPesquisa();

    }, 300);

});


/*
 * FUNÇÃO: realizarPesquisa()
 *
 * Responsável por pesquisar os Pokémon pelo nome ou ID,
 * carregar seus dados e atualizar os cards exibidos.
 *
 * A lógica é praticamente a mesma que estava
 * anteriormente dentro do evento input.
 */
async function realizarPesquisa() {

    // Recupera o texto, converte para minúsculas
    // e remove espaços das extremidades.
    const pesquisa = campoPesquisa.value.toLowerCase().trim();

    // Seleciona a área dos cards e a paginação.
    const listaPokemons = document.querySelector(".lista-pokemons");
    const paginacao = document.querySelector(".paginacao");

    /*
     * CAMPO VAZIO
     *
     * Se o usuário apagar a pesquisa, a paginação
     * volta a aparecer e os Pokémon da página
     * selecionada são carregados novamente.
     */
    if (pesquisa === "") {

        paginacao.style.display = "";

        mostrarPagina();
        return;

    }

    // Oculta a paginação enquanto o usuário pesquisa.
    paginacao.style.display = "none";

    // Identifica esta pesquisa para evitar resultados antigos.
    const minhaRequisicao = requisicaoAtual;

    /*
     * FILTRAGEM DOS POKÉMON
     *
     * Percorre a lista carregada da PokeAPI.
     *
     * Para cada Pokémon, verifica se o nome contém
     * o texto pesquisado ou se o ID corresponde
     * exatamente ao número digitado.
     */
    const resultados = listaTodosPokemons.filter(function (pokemon) {

        // Divide a URL para recuperar o ID do Pokémon.
        const partes = pokemon.url.split("/");
        const id = partes[6];

        // Verifica se o nome contém o texto pesquisado.
        const nomeCorresponde = pokemon.name.includes(pesquisa);

        // Verifica se o ID corresponde ao número digitado.
        const numeroCorresponde = id === pesquisa;

        // Mantém o Pokémon se uma das condições for verdadeira.
        return nomeCorresponde || numeroCorresponde;

    });

    /*
     * PESQUISA SEM RESULTADOS
     *
     * Caso nenhum Pokémon corresponda ao texto,
     * apresenta uma mensagem e encerra o evento.
     */
    if (resultados.length === 0) {

        listaPokemons.innerHTML = `
            <div class="pesquisa-vazia">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>Nenhum Pokémon encontrado!</h3>
                <p>Tente pesquisar outro nome ou número.</p>
            </div>
        `;

        return;

    }

    try {

        /*
         * BUSCA DOS DADOS COMPLETOS
         *
         * map() percorre os resultados encontrados
         * e cria uma promessa para cada Pokémon.
         *
         * Promise.all() aguarda todas as requisições
         * antes de continuar a execução.
         */
        const promessas = resultados.map(function (pokemon) {

            return buscarPokemon(pokemon.name);

        });

        const pokemons = await Promise.all(promessas);

        /*
         * CONTROLE DE REQUISIÇÕES
         *
         * Se outra pesquisa ou navegação começou
         * enquanto os dados carregavam, encerramos
         * esta execução para evitar resultados antigos.
         */
        if (minhaRequisicao !== requisicaoAtual) {
            return;
        }

        // Remove os resultados anteriores somente
        // quando os novos Pokémon estiverem prontos.
        listaPokemons.innerHTML = "";

        // Cria os cards dos Pokémon encontrados.
        pokemons.forEach(function (pokemon) {

            criarCardPokemon(pokemon);

        });

    } catch (erro) {

        // Ignora erros de pesquisas que já foram substituídas.
        if (minhaRequisicao !== requisicaoAtual) {
            return;
        }

        // Registra o erro para facilitar a identificação.
        console.error("Erro ao pesquisar Pokémon:", erro);

        // Apresenta uma mensagem ao usuário.
        listaPokemons.textContent =
            "Não foi possível realizar a pesquisa. Tente novamente.";

    }
};
