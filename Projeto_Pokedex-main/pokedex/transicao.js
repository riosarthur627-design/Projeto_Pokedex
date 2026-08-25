const pokebola = document.querySelector("#entrar-pokedex");
const scanner = document.querySelector(".scanner");

pokebola.addEventListener("click", function () {

    pokebola.classList.add("abrindo");

    setTimeout(function () {

        scanner.classList.add("ativo");

        document.body.classList.add("transicionando");

    }, 700);


    setTimeout(function () {

        window.location.href = "index.html";

    }, 3800);

});