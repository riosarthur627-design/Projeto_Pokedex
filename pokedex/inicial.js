        const pokebola = document.querySelector("#entrar-pokedex");
        pokebola.addEventListener("click", function(){
        pokebola.classList.add("clicada");


        const texto = document.querySelector(".conteudo-primario");
        const setas = document.querySelector(".setas");
        const clique = document.querySelector(".click-pokebola");
        const comecar = document.querySelector(".para-comecar");

        texto.classList.add("sumir");
        setas.classList.add("sumir");
        clique.classList.add("sumir");
        comecar.classList.add("sumir");
        });

        const clarao = document.querySelector(".clarao");

        pokebola.addEventListener("animationend", function(event){
        if (event.animationName === "clicarPokebola"){
        clarao.classList.add("ativo");
        }

        });


        clarao.addEventListener("animationend", function(){
        window.location.href = "index.html";

        });