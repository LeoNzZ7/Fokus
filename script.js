const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const iniciarSom = new Audio('/sons/play.mp3');
const pauseSom = new Audio('/sons/pause.mp3');
const tempoNaTela = document.querySelector('#timer')
const beepSom = new Audio('/sons/beep.mp3');
const startPauseBt = document.querySelector('#start-pause');
const startPauseBtImg = document.querySelector('#start-pause img');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
//constantes que selecionam elementos da página.

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
//Varíaveis do temporizador.

musica.loop = true;
//propiedade que faz com que a música se mantenha em loop.

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    };
});
// Função que reproduz ou pausa música do contexto.

focoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 1500;
    AlterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 300;
    AlterarContexto('descanso-curto')
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos = 900;
    AlterarContexto('descanso-longo')
    longoBt.classList.add('active');
});

//eventos de click que executam funções que alteram o contexto da página e a aparência da páginan.

function AlterarContexto (contexto) {
    mostrarTempo()
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    });
    // função que remove a clase de "active" que muda a aparência do botão que está ativo.

    html.setAttribute('data-contexto', contexto);
    //função que altera o contexto da página.
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    //função que altera o banner da página.

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,</br>
                <strong class="app__title-strong" >mergulhe no que importa</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?</br>
                <strong class="app__title-strong">de uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `hora de voltar à superfície,</br>
                <strong class="app__title-strong" > Faça uma pausa longa.</strong>`
            break;
        default: 
            break;
    };
    //switch que altera os titulos com base no contexto passado como parâmetro.
};

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beepSom.play();
        zerar()
        return;
    };
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}; 
//Função que faz a contagem regressiva.

startPauseBt.addEventListener('click', iniciarOuPausar);
//Adiciona evento de click no botão de iniciar e inicia o temporizador.

function iniciarOuPausar () {
    if(intervaloId) {
        pauseSom.play();
        zerar();
        return;
    };
    //Condicional que para o temporizador;

    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarSom.play();
    iniciarOuPausarBt.textContent = `Pausar`;
    startPauseBtImg.setAttribute('src', '/imagens/pause.png');
    //Tempo que está sendo decorrido;
};
//Função que faz com que o tempo do temporizador diminua.

function zerar () {
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = `Começar`;
    startPauseBtImg.setAttribute('src', '/imagens/play_arrow.png');
};
//Função que para o temporizador.

function mostrarTempo () {
    const tempo =  new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
};
//Função que mostra o tempo formatado na tela.

mostrarTempo();
//Chamada função no escopo global para sempre mostrar o tempo