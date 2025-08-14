//let titulo = document.querySelector("h1");
//titulo.innerHTML = "Jogo do Número Secreto";


//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um número entre 1 e 10!"
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//funções com parametros
function alterarTexto(tag, texto) {
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function mensagemInicial() {
    alterarTexto("h1", "Jogo do Número Secreto");
    alterarTexto("p", "Escolha um número entre 1 e 10!");
}
//chamada da função mensagemInicial
mensagemInicial();


function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        alterarTexto("h1", "Parabéns, você acertou!");
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativas}!`;
        alterarTexto("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            alterarTexto("p", "O número secreto é menor que " + chute);
        } else {
            alterarTexto("p", "O número secreto é maior que " + chute);
        }
        tentativas++;
        alterarTexto("h1", "Tente novamente!");
        limparCampo();
    }
}

//funções com retorno
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()* 10 + 1);
    let quantidadeNumerosSorteados = listaDeNumerosSorteados.length;
    //verifica se o número já foi sorteado
    if (quantidadeNumerosSorteados >= 10) {
        listaDeNumerosSorteados = [];
        console.log("Todos os números já foram sorteados. Reiniciando a lista.");
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log("Números sorteados: " + listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//função para limpar o campo de input
function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

//função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    //chamada da função mensagemInicial
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", "true");
}