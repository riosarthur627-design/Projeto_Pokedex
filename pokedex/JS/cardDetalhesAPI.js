
/*
 * ARQUIVO: CardDetalhesAPI.js
 *
 * Responsável pelo funcionamento do modal de detalhes.
 *
 * Principais funcionalidades:
 * - Exibir informações e estatísticas dos Pokémon;
 * - Gerenciar o coração de favoritos no modal;
 * - Sincronizar os favoritos com os cards;
 * - Buscar e traduzir descrições utilizando APIs;
 * - Armazenar traduções no localStorage;
 * - Tratar falhas de conexão e respostas inválidas;
 * - Impedir que requisições antigas alterem o modal.
 */

// Identifica o Pokémon exibido no modal.
let pokemonDetalhesAtual = null;

// Identifica cada abertura do modal para controlar
// respostas assíncronas que chegam atrasadas.
let versaoDetalhes = 0;


/*
 * FUNÇÃO: mostrarDetalhes(pokemon)
 *
 * Recebe os dados de um Pokémon e preenche o modal
 * com suas informações principais, tipos e estatísticas.
 *
 * Também verifica o estado dos favoritos, configura
 * o botão de coração e inicia a busca pela descrição.
 */
function mostrarDetalhes(pokemon) {

    pokemonDetalhesAtual = pokemon.id;

    // Registra uma nova abertura do modal.
    versaoDetalhes++;
    const minhaVersao = versaoDetalhes;

    // Seleciona os elementos do modal.
    const modalDetalhes = document.querySelector("#modal-detalhes");

    const nomeDetalhes = document.querySelector("#nome-detalhes");
    const numeroDetalhes = document.querySelector("#numero-detalhes");
    const imagemDetalhes = document.querySelector("#imagem-detalhes");
    const alturaDetalhes = document.querySelector("#altura-detalhes");
    const pesoDetalhes = document.querySelector("#peso-detalhes");
    const habilidadeDetalhes = document.querySelector("#habilidade-detalhes");
    const experienciaDetalhes = document.querySelector("#experiencia-detalhes");
    const tiposDetalhes = document.querySelector("#tipos-detalhes");

    // Remove os tipos do Pokémon anterior.
    tiposDetalhes.innerHTML = "";

    // Preenche as informações principais.
    nomeDetalhes.textContent = pokemon.name;

    numeroDetalhes.textContent =
        "#" + String(pokemon.id).padStart(4, "0");

    imagemDetalhes.src =
        pokemon.sprites.other["official-artwork"].front_default;

    // A PokeAPI fornece altura em decímetros
    // e peso em hectogramas.
    alturaDetalhes.textContent = (pokemon.height / 10) + " m";
    pesoDetalhes.textContent = (pokemon.weight / 10) + " kg";

    habilidadeDetalhes.textContent =
        pokemon.abilities[0].ability.name;

    experienciaDetalhes.textContent = pokemon.base_experience;

    // Torna o modal visível.
    modalDetalhes.classList.add("ativo");


    /*
     * TIPOS DO POKÉMON
     *
     * Percorre os tipos recebidos da PokeAPI.
     * Traduz cada tipo e cria um span com a classe
     * correspondente à sua cor.
     */
    pokemon.types.forEach(function (tipo) {

        const tipoTraduzido = traducaoTipos[tipo.type.name];

        const tipoPokemonDetalhes = document.createElement("span");

        tipoPokemonDetalhes.classList.add(
            "tipo-detalhes",
            "tipo-" + tipoTraduzido
        );

        tipoPokemonDetalhes.textContent = tipoTraduzido;

        tiposDetalhes.appendChild(tipoPokemonDetalhes);

    });


    /*
     * ESTATÍSTICAS DO POKÉMON
     *
     * Percorre as estatísticas e utiliza o índice
     * para encontrar a barra e o valor correspondentes.
     *
     * A largura é calculada considerando 150 como
     * referência visual e limitada a 100%.
     */
    pokemon.stats.forEach(function (stat, indice) {

        const barra = document.getElementById(barras[indice]);
        const valor = document.getElementById(valores[indice]);

        const numeroStat = stat.base_stat;

        valor.textContent = numeroStat;

        barra.style.width =
            Math.min((numeroStat / 150) * 100, 100) + "%";

    });


    /*
     * FAVORITOS DO MODAL
     *
     * Atualiza o coração conforme o estado atual
     * dos favoritos e configura o clique para
     * adicionar ou remover o Pokémon.
     */
    const botaoFavoritoDetalhes =
        document.querySelector(".favoritar-detalhes");

    const iconeFavoritoDetalhes =
        botaoFavoritoDetalhes.querySelector("i");

    const estaFavoritado = favoritos.includes(pokemon.id);

    iconeFavoritoDetalhes.classList.toggle(
        "fa-solid",
        estaFavoritado
    );

    iconeFavoritoDetalhes.classList.toggle(
        "fa-regular",
        !estaFavoritado
    );

    // onclick substitui o evento anterior, evitando
    // acumular eventos a cada abertura do modal.
    botaoFavoritoDetalhes.onclick = function () {

        alternarFavorito(pokemon.id);

        const estaFavoritado = favoritos.includes(pokemon.id);

        // Atualiza o coração dentro do modal.
        iconeFavoritoDetalhes.classList.toggle(
            "fa-solid",
            estaFavoritado
        );

        iconeFavoritoDetalhes.classList.toggle(
            "fa-regular",
            !estaFavoritado
        );

        // Sincroniza o coração do card principal.
        atualizarCoracaoCard(pokemon.id);

    };

    // Busca a descrição, associando a resposta
    // à abertura atual do modal.
    buscarDescricao(pokemon, minhaVersao);
}


/*
 * FECHAMENTO DO MODAL
 *
 * Remove a classe que mantém o modal visível.
 *
 * Também invalida requisições pendentes, evitando
 * que uma tradução atrasada modifique o conteúdo
 * depois que o usuário fechar o modal.
 */
const modalDetalhes = document.querySelector("#modal-detalhes");
const fecharDetalhes = document.querySelector(".fechar-detalhes");

fecharDetalhes.addEventListener("click", function () {

    modalDetalhes.classList.remove("ativo");

    pokemonDetalhesAtual = null;

    // Invalida respostas de aberturas anteriores.
    versaoDetalhes++;

});


/*
 * FUNÇÃO: atualizarCoracaoCard(id)
 *
 * Localiza o card correspondente ao ID recebido
 * e atualiza a aparência do coração.
 *
 * A função verifica se o card e o ícone existem
 * antes de tentar modificá-los, evitando erros
 * quando o Pokémon não está na página atual.
 */
function atualizarCoracaoCard(id) {

    const card = document.querySelector(
        `.pokemon-card[data-id="${id}"]`
    );

    // Encerra a função se o card não existir.
    if (!card) {
        return;
    }

    const icone = card.querySelector(".fa-heart");

    // Encerra se o coração não for encontrado.
    if (!icone) {
        return;
    }

    const estaFavoritado = favoritos.includes(id);

    icone.classList.toggle("fa-solid", estaFavoritado);
    icone.classList.toggle("fa-regular", !estaFavoritado);
}


/*
 * FUNÇÃO: buscarDescricao(pokemon, minhaVersao)
 *
 * Busca a descrição do Pokémon e apresenta
 * o texto traduzido para português brasileiro.
 *
 * Primeiro consulta o localStorage. Se a descrição
 * já estiver salva, não realiza novas requisições.
 *
 * Caso contrário, busca uma descrição em inglês
 * na PokeAPI e solicita sua tradução à MyMemory.
 *
 * Utiliza try/catch para tratar erros e uma
 * identificação de versão para impedir que respostas
 * antigas sobrescrevam o conteúdo do modal.
 */
async function buscarDescricao(pokemon, minhaVersao) {

    const descricaoPokemon =
        document.querySelector("#descricao-pokemon");

    const chaveDescricao = "descricao-pokemon-" + pokemon.id;

    // Verifica se esta execução ainda corresponde
    // ao Pokémon e à abertura atual do modal.
    function descricaoAindaAtual() {
        return pokemonDetalhesAtual === pokemon.id &&
            minhaVersao === versaoDetalhes;
    }

    // Procura uma tradução salva anteriormente.
    const descricaoSalva = localStorage.getItem(chaveDescricao);

    if (descricaoSalva) {

        if (descricaoAindaAtual()) {
            descricaoPokemon.textContent = descricaoSalva;
        }

        return;
    }

    // Exibe uma mensagem enquanto a descrição carrega.
    descricaoPokemon.textContent = "Carregando descrição...";

    try {

        // Busca os dados da espécie do Pokémon.
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`
        );

        // Verifica se a requisição HTTP foi bem-sucedida.
        if (!resposta.ok) {
            throw new Error("Falha ao buscar descrição na PokeAPI.");
        }

        const dados = await resposta.json();

        // Procura a primeira descrição em inglês.
        const descricaoIngles = dados.flavor_text_entries.find(
            function (entrada) {
                return entrada.language.name === "en";
            }
        );

        // Se não houver descrição, informa o usuário.
        if (!descricaoIngles) {

            if (descricaoAindaAtual()) {
                descricaoPokemon.textContent =
                    "Descrição não disponível.";
            }

            return;
        }

        // Remove espaços e quebras de linha desnecessárias.
        const textoIngles = descricaoIngles.flavor_text
            .replace(/\s+/g, " ")
            .trim();

        // Só altera a interface se a abertura ainda for atual.
        if (descricaoAindaAtual()) {
            descricaoPokemon.textContent = "Traduzindo descrição...";
        }

        // Solicita a tradução do texto.
        const textoTraduzido = await traduzirDescricao(textoIngles);

        // Armazena uma tradução válida para uso futuro,
        // mesmo que o usuário já tenha fechado o modal.
        localStorage.setItem(chaveDescricao, textoTraduzido);

        // Evita exibir a tradução no Pokémon errado.
        if (!descricaoAindaAtual()) {
            return;
        }

        descricaoPokemon.textContent = textoTraduzido;

    } catch (erro) {

        // Registra o problema no console.
        console.error(
            "Erro ao buscar ou traduzir descrição:",
            erro
        );

        // Evita alterar um modal fechado ou diferente.
        if (!descricaoAindaAtual()) {
            return;
        }

        // Informa ao usuário que houve um problema.
        descricaoPokemon.textContent =
            "Não foi possível carregar a descrição.";

    }
}


/*
 * FUNÇÃO: traduzirDescricao(texto)
 *
 * Recebe um texto em inglês e solicita sua tradução
 * para português brasileiro utilizando a API MyMemory.
 *
 * encodeURIComponent() prepara o texto para a URL.
 *
 * A função verifica a resposta HTTP e o conteúdo
 * retornado pela API antes de devolver a tradução.
 *
 * Se ocorrer algum problema, lança um erro que
 * será tratado pela função buscarDescricao().
 */
async function traduzirDescricao(texto) {

    const url =
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|pt-BR`;

    // Envia a requisição à API de tradução.
    const resposta = await fetch(url);

    // Verifica se a requisição HTTP foi bem-sucedida.
    if (!resposta.ok) {
        throw new Error("Falha na API de tradução.");
    }

    const dados = await resposta.json();

    // Verifica se a API confirmou a tradução.
    if (
        dados.responseStatus !== 200 ||
        typeof dados.responseData?.translatedText !== "string" ||
        !dados.responseData.translatedText.trim()
    ) {
        throw new Error("A API não retornou uma tradução válida.");
    }

    // Retorna somente o texto traduzido.
    return dados.responseData.translatedText;
}
