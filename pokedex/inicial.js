// ==================== ACESSO À POKÉDEX ====================

const pokebola = document.querySelector("#entrar-pokedex");
const clarao = document.querySelector(".clarao");

let usuarioAutenticado = false;


// Controla o acesso e inicia a animação da Pokébola
pokebola.addEventListener("click", function () {

    // Impede o acesso sem login ou cadastro
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


// Redireciona para a página principal após o clarão
clarao.addEventListener("animationend", function () {

    window.location.href = "index.html";

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


// Alterna para o formulário de login
opcaoLogin.addEventListener("click", function () {

    opcaoLogin.classList.add("ativo");
    opcaoCadastro.classList.remove("ativo");

    formLogin.style.display = "block";
    formCadastro.style.display = "none";

});


// Alterna para o formulário de cadastro
opcaoCadastro.addEventListener("click", function () {

    opcaoCadastro.classList.add("ativo");
    opcaoLogin.classList.remove("ativo");

    formCadastro.style.display = "block";
    formLogin.style.display = "none";

});


// Link "Criar conta"
irCadastro.addEventListener("click", function () {

    opcaoCadastro.classList.add("ativo");
    opcaoLogin.classList.remove("ativo");

    formCadastro.style.display = "block";
    formLogin.style.display = "none";

});


// Link "Entrar"
irLogin.addEventListener("click", function () {

    opcaoLogin.classList.add("ativo");
    opcaoCadastro.classList.remove("ativo");

    formLogin.style.display = "block";
    formCadastro.style.display = "none";

});



// ==================== ELEMENTOS DE AUTENTICAÇÃO ====================

// Tela exibida após login ou cadastro
const telaSucesso = document.querySelector(".login-sucesso");
const nomeUsuario = document.querySelector(".nome-usuario");
const mensagemSucesso = document.querySelector(".mensagem-sucesso");


// Mensagens de erro
const erroLogin = document.querySelector(".erro-login");
const erroCadastro = document.querySelector(".erro-cadastro");



// ==================== LOGIN ====================

const entrarConta = document.querySelector(".entrar-conta");

entrarConta.addEventListener("click", function (event) {

    // Impede o envio padrão do formulário
    event.preventDefault();

    const emailLogin = document.querySelector("#email-login").value;
    const senhaLogin = document.querySelector("#senha-login").value;

    // Recupera o usuário salvo no navegador
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));


    // Verifica se existe um usuário cadastrado
    if (!usuarioSalvo) {
        erroLogin.textContent = "Nenhum usuário encontrado. Por favor, crie uma conta.";
        return;
    }


    // Confere os dados informados com os dados salvos
    if (emailLogin === usuarioSalvo.email && senhaLogin === usuarioSalvo.senha) {

        usuarioAutenticado = true;
        erroLogin.textContent = "";

        nomeUsuario.textContent = usuarioSalvo.nome;
        mensagemSucesso.textContent = "Login realizado com sucesso.";

        telaSucesso.style.display = "flex";
        cardLoginCadastro.style.display = "none";

    } else {

        erroLogin.textContent = "E-mail ou senha incorretos.";

    }

});



// ==================== CADASTRO ====================

const criacaoConta = document.querySelector(".criar-conta");
const termosCheckbox = document.querySelector("#aceitar-termos");

criacaoConta.addEventListener("click", function (event) {

    // Impede o envio padrão do formulário
    event.preventDefault();

    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email-cadastro").value;
    const senha = document.querySelector("#senha-cadastro").value;
    const confirmarSenha = document.querySelector("#confirmar-senha").value;


    // Verifica se todos os campos foram preenchidos
    if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
        erroCadastro.textContent = "Preencha todos os campos.";
        return;
    }


    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
        erroCadastro.textContent = "As senhas não coincidem.";
        return;
    }


    // Verifica se os termos foram aceitos
    if (!termosCheckbox.checked) {
        erroCadastro.textContent = "Você deve aceitar os termos de uso.";
        return;
    }


    // Libera o acesso e remove possíveis erros anteriores
    usuarioAutenticado = true;
    erroCadastro.textContent = "";


    // Cria o usuário e salva no navegador
    const usuario = { nome, email, senha };

    localStorage.setItem("usuario", JSON.stringify(usuario));


    // Exibe a tela de sucesso
    nomeUsuario.textContent = nome;
    mensagemSucesso.textContent = "Sua conta foi criada com sucesso.";

    telaSucesso.style.display = "flex";
    cardLoginCadastro.style.display = "none";

});




// ==================== MOSTRAR E ESCONDER SENHA ====================

const botoesMostrarSenha = document.querySelectorAll(".mostrar-senha");


botoesMostrarSenha.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const container = botao.closest(".input-container");
        const inputSenha = container.querySelector("input");
        const icone = botao.querySelector("i");

        if (inputSenha.type === "password") {

            inputSenha.type = "text";

            icone.classList.replace("fa-eye", "fa-eye-slash");

        } else {

            inputSenha.type = "password";

            icone.classList.replace("fa-eye-slash", "fa-eye");

        }

    });

});