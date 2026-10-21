//*********INÍCIO PESQUISAR POKÉMON*******************
// const campoPesquisa = document.querySelector("#campo-pesquisa");
// const pokemon_card = document.querySelectorAll(".pokemon-card");

// campoPesquisa.addEventListener("input", function(){


//     const pesquisa_pokemon = campoPesquisa.value.toLowerCase();
   
//     pokemon_card.forEach(function(pokemon){

//         const nome_pokemon = pokemon.querySelector("h3").textContent.toLowerCase();
//         const numero_pokemon = pokemon.querySelector(".numero").textContent;

//         if(nome_pokemon.includes(pesquisa_pokemon) || numero_pokemon.includes(pesquisa_pokemon)){
//             pokemon.style.display = "block";

//         }else{
//             pokemon.style.display = "none";
//         }

//    });

// });
//*************FINAL PESQUISAR POKÉMON***************




//*****************INÍCIO MARCAR BOTÃO FAVORITO*********************
const favoritar_pokemon = document.querySelectorAll(".favorito");

       favoritar_pokemon.forEach(function(clicado){

            clicado.addEventListener("click", function(){
                
            clicado.classList.toggle("clicado");

            const icone = clicado.querySelector("i")
            
            if (clicado.classList.contains("clicado")) {
                icone.classList.replace("fa-regular", "fa-solid")
            }
            else{
                icone.classList.replace("fa-solid", "fa-regular")
            }

        });

    });
//*****************FINAL MARCAR BOTÃO FAVORITO*********************




const opcoes = document.querySelectorAll(".options a");

opcoes.forEach(function(selecionado) {

    selecionado.addEventListener("click", function() {
         event.preventDefault();

        opcoes.forEach(function(opcao) {

            opcao.classList.remove("ativo");

        });

        selecionado.classList.add("ativo");

    });

});







const cards = document.querySelectorAll(".lista-pokemons .pokemon-card");
const areaNumeros = document.querySelector(".numeros-pagina");
const setasPagina = document.querySelectorAll(".paginacao .seta-pagina");

const cardsPorPagina = 10;
const totalPaginas = Math.ceil(cards.length / cardsPorPagina);
let paginaAtual = 1;

function mostrarPagina() {
    const inicio = (paginaAtual - 1) * cardsPorPagina;
    const fim = inicio + cardsPorPagina;

    cards.forEach(function(card, indice) {
        if (indice >= inicio && indice < fim) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    const botoes = areaNumeros.querySelectorAll(".numeros");

    botoes.forEach(function(botao, indice) {
        if (indice + 1 === paginaAtual) {
            botao.classList.add("ativo");
        } else {
            botao.classList.remove("ativo");
        }
    });

    setasPagina[0].disabled = paginaAtual === 1;
    setasPagina[1].disabled = paginaAtual === totalPaginas;
}

for (let numero = 1; numero <= totalPaginas; numero++) {
    const botao = document.createElement("button");

    botao.classList.add("numeros");
    botao.textContent = numero;

    botao.addEventListener("click", function() {
        paginaAtual = numero;
        mostrarPagina();
    });

    areaNumeros.appendChild(botao);
}

setasPagina[0].addEventListener("click", function() {
    if (paginaAtual > 1) {
        paginaAtual--;
        mostrarPagina();
    }
});

setasPagina[1].addEventListener("click", function() {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        mostrarPagina();
    }
});

mostrarPagina();