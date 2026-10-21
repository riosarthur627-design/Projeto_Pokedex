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





const nomePokemon = document.querySelector(".pokemon-info h3");
const numeroPokemon = document.querySelector(".numero");

fetch("https://pokeapi.co/api/v2/pokemon/6")

    .then(function (resposta) {
        return resposta.json();
    })

    .then(function (pokemon) {

        console.log(pokemon);

        nomePokemon.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        numeroPokemon.textContent = "#" + pokemon.id.toString().padStart(4, "0");

        const imagemPokemon = document.createElement("img");
        const divImagem = document.querySelector(".pokemon-imagem");
        imagemPokemon.src = pokemon.sprites.other["official-artwork"].front_default
        imagemPokemon.alt = pokemon.name;
        divImagem.appendChild(imagemPokemon);


        const divTipos = document.querySelector(".tipos");

        pokemon.types.forEach(function (tipo) {

            const tipoIngles = tipo.type.name;
            const tipoPortugues = traducaoTipos[tipoIngles];

            const spanTipo = document.createElement("span");

            spanTipo.textContent = tipoPortugues;
            spanTipo.classList.add("tipo", "tipo-" + tipoPortugues);
            divTipos.appendChild(spanTipo);

        });


        const cardPokemon = document.querySelector(".pokemon-card");

        const tipoPrincipal = pokemon.types[0].type.name;

        const tipoTraduzido = traducaoTipos[tipoPrincipal];

        cardPokemon.classList.add(tipoTraduzido);

    })

    .catch(function (erro) {
        console.error("Erro ao buscar Pokémon:", erro);
    });

