const campoPesquisa = document.querySelector("#campo-pesquisa");
const pokemon_card = document.querySelectorAll(".pokemon-card");

campoPesquisa.addEventListener("input", function(){


    const pesquisa_pokemon = campoPesquisa.value.toLowerCase();
   
    pokemon_card.forEach(function(pokemon){

        const nome_pokemon = pokemon.querySelector("h3").textContent.toLowerCase();

        if(nome_pokemon.includes(pesquisa_pokemon)){
            pokemon.style.display = "block";

        }else{
            pokemon.style.display = "none";
        }

   });

});


