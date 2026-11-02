const traducaoTipos = {
    normal: "normal",
    fire: "fogo",
    water: "agua",
    electric: "eletrico",
    grass: "planta",
    ice: "gelo",
    fighting: "lutador",
    poison: "veneno",
    ground: "terra",
    flying: "voador",
    psychic: "psiquico",
    bug: "inseto",
    rock: "pedra",
    ghost: "fantasma",
    dragon: "dragao",
    dark: "sombrio",
    steel: "aco",
    fairy: "fada"
};


const barras = [
    "barra-hp",
    "barra-ataque",
    "barra-defesa",
    "barra-ataque-especial",
    "barra-defesa-especial",
    "barra-velocidade"
];

const valores = [
    "valor-hp",
    "valor-ataque",
    "valor-defesa",
    "valor-ataque-especial",
    "valor-defesa-especial",
    "valor-velocidade"
];





async function buscarPokemon(id) {

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar o Pokémon");
        }

        const pokemon = await resposta.json();
        return pokemon;

    } catch (erro) {
        console.error("Erro ao buscar o Pokémon:", erro);
        throw erro;
    }
}

function criarCardPokemon(pokemon) {


    const articlePokemon = document.createElement("article");
    articlePokemon.classList.add("pokemon-card");
    articlePokemon.dataset.id = pokemon.id;

    const listaPokemons = document.querySelector(".lista-pokemons");
    listaPokemons.appendChild(articlePokemon);

    const botaoFavorito = document.createElement("button");
    botaoFavorito.classList.add("favorito");
    articlePokemon.appendChild(botaoFavorito);

    const iconeFavorito = document.createElement("i");
    iconeFavorito.classList.add("fa-regular", "fa-heart");
    botaoFavorito.appendChild(iconeFavorito);

    if (favoritos.includes(pokemon.id)) {
        iconeFavorito.classList.remove("fa-regular");
        iconeFavorito.classList.add("fa-solid");
    }

    botaoFavorito.addEventListener("click", function () {

        alternarFavorito(pokemon.id);

        if (favoritos.includes(pokemon.id)) {

            iconeFavorito.classList.remove("fa-regular");
            iconeFavorito.classList.add("fa-solid");

        } else {

            iconeFavorito.classList.remove("fa-solid");
            iconeFavorito.classList.add("fa-regular");

            if (menuFavoritos.classList.contains("ativo")) {
                articlePokemon.remove();


                if (favoritos.length === 0) {
                    const listaPokemons = document.querySelector(".lista-pokemons");


                    listaPokemons.innerHTML = `
                        <div class="favoritos-vazio">
                            <i class="fa-regular fa-heart"></i>
                            <h3>Nenhum Pokémon favoritado ainda!</h3>
                            <p>Explore a Pokédex e clique no coração para salvar seus favoritos.</p>
                        </div>
                    `;
                }
            }

        }

    });


    const divPokemonImagem = document.createElement("div");
    divPokemonImagem.classList.add("pokemon-imagem");
    articlePokemon.appendChild(divPokemonImagem);

    const pokemonImg = document.createElement("img");
    pokemonImg.src = pokemon.sprites.other["official-artwork"].front_default;
    pokemonImg.alt = pokemon.name;
    divPokemonImagem.appendChild(pokemonImg);

    const pokemonInfo = document.createElement("div");
    pokemonInfo.classList.add("pokemon-info");
    articlePokemon.appendChild(pokemonInfo);

    const numeroPokemon = document.createElement("span");
    numeroPokemon.classList.add("numero");
    numeroPokemon.textContent = "#" + pokemon.id.toString().padStart(4, "0");
    pokemonInfo.appendChild(numeroPokemon);

    const nomePokemon = document.createElement("h3");
    nomePokemon.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonInfo.appendChild(nomePokemon);


    const divPokemonTipo = document.createElement("div");
    divPokemonTipo.classList.add("tipos");
    pokemonInfo.appendChild(divPokemonTipo);

    pokemon.types.forEach(function (tipo) {

        const tipoTraduzido = traducaoTipos[tipo.type.name];

        const tipoPokemon = document.createElement("span");
        tipoPokemon.classList.add("tipo", "tipo-" + tipoTraduzido);
        tipoPokemon.textContent = tipoTraduzido;
        divPokemonTipo.appendChild(tipoPokemon);

    });



    const verDetalhes = document.createElement("button");
    verDetalhes.classList.add("ver-detalhes");
    verDetalhes.textContent = "Ver detalhes ";
    pokemonInfo.appendChild(verDetalhes);
    verDetalhes.addEventListener("click", function () {
        mostrarDetalhes(pokemon);
    });

    const iconeVerDetalhes = document.createElement("i");
    iconeVerDetalhes.classList.add("fa-solid", "fa-arrow-right");
    verDetalhes.appendChild(iconeVerDetalhes);


    const tipoPrincipalCard = pokemon.types[0].type.name;

    const tipoTraduzidoCard = traducaoTipos[tipoPrincipalCard];

    articlePokemon.classList.add(tipoTraduzidoCard);
}

