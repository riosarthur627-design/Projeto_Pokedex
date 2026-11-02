
/*
 * ARQUIVO: inicial.js
 *
 * Responsável pelo funcionamento da página inicial da Pokédex.
 *
 * Principais funcionalidades:
 * - Controlar o acesso à Pokédex;
 * - Executar a animação de entrada da Pokébola;
 * - Alternar entre os formulários de login e cadastro;
 * - Cadastrar usuários utilizando localStorage;
 * - Validar o nome de usuário durante o login;
 * - Exibir uma mensagem de sucesso após a autenticação.
 */


// ==================== ACESSO À POKÉDEX ====================

// Seleciona a Pokébola utilizada para entrar na Pokédex.
const pokebola = document.querySelector("#entrar-pokedex");

// Seleciona o elemento responsável pelo efeito de clarão.
const clarao = document.querySelector(".clarao");

// Controla se o usuário realizou login ou cadastro.
// Inicialmente, o acesso não está liberado.
let usuarioAutenticado = false;


/*
 * EVENTO: CLIQUE NA POKÉBOLA
 *
 * Responsável por iniciar a animação de entrada.
 *
 * Antes de executar a animação, verifica se o usuário
 * realizou login ou cadastro.
 *
 * Caso não esteja autenticado, apresenta um aviso
 * e encerra a execução do evento.
 *
 * Se estiver autenticado, inicia a animação da Pokébola
 * e oculta os elementos visuais da página inicial.
 */
pokebola.addEventListener("click", function () {

    // Impede o acesso de usuários não autenticados.
    if (!usuarioAutenticado) {
        alert("Você precisa criar uma conta ou fazer login para acessar a Pokédex.");
        return;
    }

    // Adiciona a classe que inicia a animação da Pokébola.
    pokebola.classList.add("clicada");

    // Seleciona os elementos que serão ocultados.
    const texto = document.querySelector(".conteudo-primario");
    const setas = document.querySelector(".setas");
    const clique = document.querySelector(".click-pokebola");

    // Oculta os elementos enquanto a Pokébola é animada.
    texto.classList.add("sumir");
    setas.classList.add("sumir");
    clique.classList.add("sumir");

});


/*
 * EVENTO: FIM DA ANIMAÇÃO DA POKÉBOLA
 *
 * O evento animationend é executado quando uma
 * animação CSS chega ao final.
 *
 * Verificamos o nome da animação para garantir
 * que o efeito de clarão seja iniciado somente
 * após a animação correta da Pokébola.
 */
pokebola.addEventListener("animationend", function (event) {

    if (event.animationName === "clicarPokebola") {
        clarao.classList.add("ativo");
    }

});


/*
 * EVENTO: FIM DA ANIMAÇÃO DO CLARÃO
 *
 * Aguarda o término do efeito visual de clarão.
 *
 * Quando a animação chamada "clarao" termina,
 * o usuário é redirecionado para index.html,
 * onde está localizada a listagem dos Pokémon.
 */
clarao.addEventListener("animationend", function (event) {

    if (event.animationName === "clarao") {
        window.location.href = "index.html";
    }

});



// ==================== LOGIN E CADASTRO ====================

// Seleciona as opções principais de login e cadastro.
const opcaoLogin = document.querySelector(".opcao-login");
const opcaoCadastro = document.querySelector(".opcao-cadastro");

// Seleciona os links que permitem alternar entre formulários.
const irCadastro = document.querySelector(".ir-cadastro");
const irLogin = document.querySelector(".ir-login");

// Seleciona os formulários.
const formLogin = document.querySelector(".form-login");
const formCadastro = document.querySelector(".form-cadastro");

// Seleciona o card que contém os formulários.
const cardLoginCadastro = document.querySelector(".card-conta");


/*
 * FUNÇÃO: mostrarFormulario(tipo)
 *
 * Responsável por alternar entre os formulários
 * de login e cadastro.
 *
 * Recebe como parâmetro uma string que identifica
 * qual formulário deverá aparecer.
 *
 * Quando recebe "login", exibe o formulário de login
 * e oculta o cadastro.
 *
 * Para os demais valores, exibe o cadastro e
 * oculta o formulário de login.
 *
 * Também atualiza a classe "ativo" dos botões,
 * permitindo destacar a opção selecionada.
 */
function mostrarFormulario(tipo) {

    if (tipo === "login") {

        // Destaca a opção de login.
        opcaoLogin.classList.add("ativo");
        opcaoCadastro.classList.remove("ativo");

        // Exibe o login e oculta o cadastro.
        formLogin.style.display = "block";
        formCadastro.style.display = "none";

    } else {

        // Destaca a opção de cadastro.
        opcaoCadastro.classList.add("ativo");
        opcaoLogin.classList.remove("ativo");

        // Exibe o cadastro e oculta o login.
        formCadastro.style.display = "block";
        formLogin.style.display = "none";

    }

}


/*
 * EVENTOS: ALTERNÂNCIA DOS FORMULÁRIOS
 *
 * Configura os botões e links responsáveis
 * por alternar entre login e cadastro.
 *
 * Todos reutilizam a função mostrarFormulario(),
 * evitando repetir a lógica de exibição.
 */

// Exibe o formulário de login.
opcaoLogin.addEventListener("click", function () {
    mostrarFormulario("login");
});

// Exibe o formulário de cadastro.
opcaoCadastro.addEventListener("click", function () {
    mostrarFormulario("cadastro");
});

// Link que direciona para o cadastro.
irCadastro.addEventListener("click", function () {
    mostrarFormulario("cadastro");
});

// Link que direciona para o login.
irLogin.addEventListener("click", function () {
    mostrarFormulario("login");
});



// ==================== ELEMENTOS DE AUTENTICAÇÃO ====================

// Seleciona a tela exibida após login ou cadastro.
const telaSucesso = document.querySelector(".login-sucesso");

// Elemento utilizado para apresentar o nome de usuário.
const nomeUsuario = document.querySelector(".nome-usuario");

// Elemento utilizado para apresentar a mensagem de sucesso.
const mensagemSucesso = document.querySelector(".mensagem-sucesso");

// Elementos responsáveis por exibir mensagens de erro.
const erroLogin = document.querySelector(".erro-login");
const erroCadastro = document.querySelector(".erro-cadastro");


/*
 * FUNÇÃO: concluirAcesso(usuario, mensagem)
 *
 * Responsável por finalizar o processo de login
 * ou cadastro e liberar o acesso à Pokédex.
 *
 * Recebe dois parâmetros:
 *
 * usuario:
 * Objeto que contém as informações do usuário.
 *
 * mensagem:
 * Texto que será apresentado após a autenticação.
 *
 * A função atualiza o estado de autenticação,
 * apresenta o nome do usuário e substitui
 * o formulário pela tela de sucesso.
 */
function concluirAcesso(usuario, mensagem) {

    // Libera o acesso à Pokédex nesta página.
    usuarioAutenticado = true;

    // Exibe o nome de usuário.
    nomeUsuario.textContent = usuario.username;

    // Apresenta a mensagem recebida.
    mensagemSucesso.textContent = mensagem;

    // Mostra a tela de sucesso.
    telaSucesso.style.display = "flex";

    // Oculta o formulário de login e cadastro.
    cardLoginCadastro.style.display = "none";

}



// ==================== LOGIN ====================

/*
 * EVENTO: ENVIO DO FORMULÁRIO DE LOGIN
 *
 * Responsável por validar o nome de usuário informado.
 *
 * Primeiro, impede o comportamento padrão do formulário.
 * Depois, recupera os dados armazenados no localStorage.
 *
 * Verifica se o campo foi preenchido e se existe
 * algum usuário cadastrado no navegador.
 *
 * Caso o nome informado corresponda ao nome salvo,
 * libera o acesso por meio de concluirAcesso().
 *
 * Se houver algum problema, apresenta uma mensagem
 * de erro para orientar o usuário.
 */
formLogin.addEventListener("submit", function (event) {

    // Impede o recarregamento padrão da página.
    event.preventDefault();

    // Recupera o nome digitado e remove espaços das extremidades.
    const usernameLogin = document.querySelector("#username-login").value.trim();

    // Recupera o usuário armazenado no navegador.
    // JSON.parse transforma a string JSON em um objeto JavaScript.
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));


    // Verifica se o campo foi preenchido.
    if (usernameLogin === "") {
        erroLogin.textContent = "Digite seu nome de usuário.";
        return;
    }


    // Verifica se existe um usuário cadastrado.
    if (!usuarioSalvo || !usuarioSalvo.username) {
        erroLogin.textContent = "Nenhum usuário encontrado. Por favor, crie uma conta.";
        return;
    }


    // Compara o nome informado com o nome armazenado.
    if (usernameLogin === usuarioSalvo.username) {

        // Remove mensagens de erro anteriores.
        erroLogin.textContent = "";

        // Libera o acesso e exibe a mensagem de sucesso.
        concluirAcesso(usuarioSalvo, "Login realizado com sucesso.");

    } else {

        // Informa que o usuário não foi encontrado.
        erroLogin.textContent = "Nome de usuário não encontrado.";

    }

});



// ==================== CADASTRO ====================

/*
 * EVENTO: ENVIO DO FORMULÁRIO DE CADASTRO
 *
 * Responsável por cadastrar um usuário na Pokédex.
 *
 * Recupera os valores preenchidos no formulário
 * e verifica se todos os campos obrigatórios
 * possuem informações.
 *
 * Caso estejam preenchidos, cria um objeto com
 * os dados do usuário e utiliza localStorage
 * para armazená-lo no navegador.
 *
 * Após salvar os dados, libera o acesso e
 * apresenta a tela de cadastro concluído.
 */
formCadastro.addEventListener("submit", function (event) {

    // Impede o envio padrão do formulário.
    event.preventDefault();

    // Recupera os dados informados pelo usuário.
    const nome = document.querySelector("#nome").value.trim();
    const sobrenome = document.querySelector("#sobrenome").value.trim();
    const username = document.querySelector("#username-cadastro").value.trim();
    const dataNascimento = document.querySelector("#data-nascimento").value;


    // Verifica se todos os campos obrigatórios foram preenchidos.
    if (nome === "" || sobrenome === "" || username === "" || dataNascimento === "") {

        erroCadastro.textContent = "Preencha todos os campos.";
        return;

    }


    /*
     * OBJETO: usuario
     *
     * Agrupa as informações preenchidas em um
     * único objeto JavaScript, facilitando
     * o armazenamento e a recuperação dos dados.
     */
    const usuario = {
        nome: nome,
        sobrenome: sobrenome,
        username: username,
        dataNascimento: dataNascimento
    };


    // JSON.stringify transforma o objeto em uma string JSON.
    // localStorage mantém os dados salvos no navegador.
    localStorage.setItem("usuario", JSON.stringify(usuario));


    // Libera o acesso e apresenta a tela de sucesso.
    concluirAcesso(usuario, "Sua conta foi criada com sucesso.");

});
