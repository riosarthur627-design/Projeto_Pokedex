//*********INÍCIO PESQUISAR POKÉMON*******************
const campoPesquisa = document.querySelector("#campo-pesquisa");
const pokemon_card = document.querySelectorAll(".pokemon-card");

campoPesquisa.addEventListener("input", function(){


    const pesquisa_pokemon = campoPesquisa.value.toLowerCase();
   
    pokemon_card.forEach(function(pokemon){

        const nome_pokemon = pokemon.querySelector("h3").textContent.toLowerCase();
        const numero_pokemon = pokemon.querySelector(".numero").textContent;

        if(nome_pokemon.includes(pesquisa_pokemon) || numero_pokemon.includes(pesquisa_pokemon)){
            pokemon.style.display = "block";

        }else{
            pokemon.style.display = "none";
        }

   });

});
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
