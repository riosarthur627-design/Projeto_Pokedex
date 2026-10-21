// ==================== ACESSO À POKÉDEX ====================

const pokebola = document.querySelector("#entrar-pokedex");
const clarao = document.querySelector(".clarao");

let usuarioAutenticado = false;


// Controla o acesso e inicia a animação da Pokébola
pokebola.addEventListener("click", function () {

    if (!usuarioAutenticado) {
        alert("Você precisa criar uma conta ou fazer login para acessar a Pokédex.");
        return;
    }

    pokebola.classList.add("clicada");

    const texto = document.querySelector(".conteudo-primario");
    const setas = document.querySelector(".setas");
    const clique = document.querySelector(".click-pokebola");

    // Esconde os elementos durante a animação
    texto.classList.add("sumir");
    setas.classList.add("sumir");
    clique.classList.add("sumir");

});


// Ativa o clarão após a animação da Pokébola
pokebola.addEventListener("animationend", function (event) {

    if (event.animationName === "clicarPokebola") {
        clarao.classList.add("ativo");
    }

});


// Redireciona para a Pokédex após o clarão
clarao.addEventListener("animationend", function (event) {

    if (event.animationName === "clarao") {
        window.location.href = "index.html";
    }

});



// ==================== LOGIN E CADASTRO ====================

// Botões de navegação
const opcaoLogin = document.querySelector(".opcao-login");
const opcaoCadastro = document.querySelector(".opcao-cadastro");

const irCadastro = document.querySelector(".ir-cadastro");
const irLogin = document.querySelector(".ir-login");


// Formulários
const formLogin = document.querySelector(".form-login");
const formCadastro = document.querySelector(".form-cadastro");

const cardLoginCadastro = document.querySelector(".card-conta");


// Função responsável por alternar os formulários
function mostrarFormulario(tipo) {

    if (tipo === "login") {

        opcaoLogin.classList.add("ativo");
        opcaoCadastro.classList.remove("ativo");

        formLogin.style.display = "block";
        formCadastro.style.display = "none";

    } else {

        opcaoCadastro.classList.add("ativo");
        opcaoLogin.classList.remove("ativo");

        formCadastro.style.display = "block";
        formLogin.style.display = "none";

    }

}


// Eventos para alternar entre login e cadastro
opcaoLogin.addEventListener("click", function () {
    mostrarFormulario("login");
});

opcaoCadastro.addEventListener("click", function () {
    mostrarFormulario("cadastro");
});

irCadastro.addEventListener("click", function () {
    mostrarFormulario("cadastro");
});

irLogin.addEventListener("click", function () {
    mostrarFormulario("login");
});



// ==================== ELEMENTOS DE AUTENTICAÇÃO ====================

// Tela exibida após login ou cadastro
const telaSucesso = document.querySelector(".login-sucesso");
const nomeUsuario = document.querySelector(".nome-usuario");
const mensagemSucesso = document.querySelector(".mensagem-sucesso");


// Mensagens de erro
const erroLogin = document.querySelector(".erro-login");
const erroCadastro = document.querySelector(".erro-cadastro");


// Função responsável por liberar o acesso
function concluirAcesso(usuario, mensagem) {

    usuarioAutenticado = true;

    nomeUsuario.textContent = usuario.username;
    mensagemSucesso.textContent = mensagem;

    telaSucesso.style.display = "flex";
    cardLoginCadastro.style.display = "none";

}



// ==================== LOGIN ====================

formLogin.addEventListener("submit", function (event) {

    // Impede o envio padrão do formulário
    event.preventDefault();

    const usernameLogin = document.querySelector("#username-login").value.trim();

    // Recupera o usuário salvo no navegador
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));


    // Verifica se o campo foi preenchido
    if (usernameLogin === "") {
        erroLogin.textContent = "Digite seu nome de usuário.";
        return;
    }


    // Verifica se existe um usuário cadastrado
    if (!usuarioSalvo || !usuarioSalvo.username) {
        erroLogin.textContent = "Nenhum usuário encontrado. Por favor, crie uma conta.";
        return;
    }


    // Confere o username informado com o username salvo
    if (usernameLogin === usuarioSalvo.username) {

        erroLogin.textContent = "";

        concluirAcesso(usuarioSalvo, "Login realizado com sucesso.");

    } else {

        erroLogin.textContent = "Nome de usuário não encontrado.";

    }

});



// ==================== CADASTRO ====================

formCadastro.addEventListener("submit", function (event) {

    // Impede o envio padrão do formulário
    event.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const sobrenome = document.querySelector("#sobrenome").value.trim();
    const username = document.querySelector("#username-cadastro").value.trim();
    const dataNascimento = document.querySelector("#data-nascimento").value;


    // Verifica se todos os campos foram preenchidos
    if (nome === "" || sobrenome === "" || username === "" || dataNascimento === "") {

        erroCadastro.textContent = "Preencha todos os campos.";
        return;

    }


    // Cria o objeto com os dados do usuário
    const usuario = {
        nome: nome,
        sobrenome: sobrenome,
        username: username,
        dataNascimento: dataNascimento
    };


    // Salva o usuário no navegador
    localStorage.setItem("usuario", JSON.stringify(usuario));


    // Libera o acesso e exibe a tela de sucesso
    concluirAcesso(usuario, "Sua conta foi criada com sucesso.");

});