
/*
 * ARQUIVO: favoritos.js
 *
 * Responsável por gerenciar os Pokémon favoritos.
 *
 * Principais funcionalidades:
 * - Recuperar os favoritos salvos no navegador;
 * - Adicionar e remover Pokémon dos favoritos;
 * - Atualizar o contador de favoritos;
 * - Exibir os Pokémon favoritos na página;
 * - Mostrar uma mensagem quando não houver favoritos.
 */

// Recupera os IDs dos Pokémon favoritos armazenados.
// Caso não exista nenhum registro, utiliza um array vazio.
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Seleciona o elemento responsável pelo contador.
const contadorFavoritos = document.querySelector("#contador-favoritos");


/*
 * FUNÇÃO: atualizarContadorFavoritos()
 *
 * Responsável por atualizar a quantidade de Pokémon
 * favoritos exibida no menu da Pokédex.
 *
 * Utiliza a propriedade length para contar
 * quantos IDs estão armazenados no array favoritos.
 */
function atualizarContadorFavoritos() {

    contadorFavoritos.textContent = favoritos.length;

}


/*
 * FUNÇÃO: alternarFavorito(id)
 *
 * Responsável por adicionar ou remover um Pokémon
 * da lista de favoritos.
 *
 * Primeiro, verifica se o ID já está no array.
 *
 * Se estiver, remove utilizando filter().
 * Caso contrário, adiciona utilizando push().
 *
 * Depois, salva a lista atualizada no localStorage
 * e atualiza o contador exibido na interface.
 */
function alternarFavorito(id) {

    // Verifica se o Pokémon já está favoritado.
    if (favoritos.includes(id)) {

        // Cria um novo array sem o ID removido.
        favoritos = favoritos.filter(function (favorito) {
            return favorito !== id;
        });

    } else {

        // Adiciona o ID do Pokémon aos favoritos.
        favoritos.push(id);

    }

    // Salva os favoritos atualizados no navegador.
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Atualiza a quantidade exibida no menu.
    atualizarContadorFavoritos();
}


/*
 * FUNÇÃO: mostrarFavoritos()
 *
 * Responsável por carregar e exibir os Pokémon
 * que foram adicionados aos favoritos.
 *
 * Oculta a paginação, busca os dados de cada
 * Pokémon favoritado e cria seus respectivos cards.
 *
 * Utiliza Promise.all() para aguardar as buscas
 * e requisicaoAtual para evitar que resultados
 * antigos substituam a tela atual.
 *
 * Caso não existam favoritos, apresenta uma
 * mensagem informativa ao usuário.
 */
async function mostrarFavoritos() {

    // Identifica uma nova requisição.
    requisicaoAtual++;
    const minhaRequisicao = requisicaoAtual;

    const listaPokemons = document.querySelector(".lista-pokemons");
    const paginacao = document.querySelector(".paginacao");

    // Oculta a paginação na aba de favoritos.
    paginacao.style.display = "none";

    // Cria uma promessa para cada Pokémon favoritado.
    const promessas = favoritos.map(function (id) {
        return buscarPokemon(id);
    });

    // Aguarda todas as buscas serem concluídas.
    const pokemons = await Promise.all(promessas);

    // Impede que uma requisição antiga altere a tela.
    if (minhaRequisicao !== requisicaoAtual) {
        return;
    }

    // Remove os cards exibidos anteriormente.
    listaPokemons.innerHTML = "";

    // Exibe uma mensagem se não houver favoritos.
    if (pokemons.length === 0) {

        listaPokemons.innerHTML = `
            <div class="favoritos-vazio">
                <i class="fa-regular fa-heart"></i>
                <h3>Nenhum Pokémon favoritado ainda!</h3>
                <p>Explore a Pokédex e clique no coração para salvar seus favoritos.</p>
            </div>
        `;

        return;
    }

    // Cria um card para cada Pokémon favoritado.
    pokemons.forEach(function (pokemon) {
        criarCardPokemon(pokemon);
    });

}
