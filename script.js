const html = document.querySelector('html')

const banner = document.querySelector('.app__image') //imagem das páginas
const contextPhrases = document.querySelector('.app__title') //frase das páginas

//variaveis dos buttons-----------------------------------------------
const buttons = document.querySelectorAll('.app__card-button')
const startPauseBtn = document.querySelector('#start-pause span')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtobtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')

//variaveis do timer-------------------------------------------
const timer = document.querySelector('#timer') //div do timer
let duracaoTimer = 1500; //25 min
let intervaloId = null;

//variaveis de sons------------------------------------------------
const musicFocoInput = document.querySelector('#alternar-musica')
const music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true;

const playSound = new Audio('/sons/play.wav')
const pauseSound = new Audio('/sons/pause.mp3')
const beepSound = new Audio('/sons/beep.mp3')

//variaveis de icones da página-----------------------------------
const playPauseIcon = document.querySelector('.app__card-primary-button-icon')

//Eventos e funções-----------------------------------------------------------------------------


//evento do input de musica-----------------------------------------------------
musicFocoInput.addEventListener('change', () =>{
    if(music.paused) {
        music.play()
    }else {
        music.pause()
    }
})

//eventos dos botoes de foco e descanso----------------------------------
focoBtn.addEventListener('click', () => {
    duracaoTimer = 1500;
    html.setAttribute('data-contexto', 'foco')
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtobtn.addEventListener('click', () =>{
    duracaoTimer = 300;
    html.setAttribute('data-contexto', 'descanso-curto')
    alterarContexto('descanso-curto')
    curtobtn.classList.add('active')
})

longoBtn.addEventListener('click', () =>{
    duracaoTimer = 900;
    html.setAttribute('data-contexto', 'descanso-longo')
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})


function alterarContexto(contexto){
    screenTimer()
    buttons.forEach(function(contexto){
        contexto.classList.remove('active')
    }) //função para remover o 'active' dos botoes
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            contextPhrases.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `

            break;
            case "descanso-curto":
                contextPhrases.innerHTML = `
                Que tal dar uma respirada?<br> 
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `

            break;
            case "descanso-curto":
                contextPhrases.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
    
        default:
            break;
    }
}


const contagemRegressiva = () => {
        if (duracaoTimer <= 0) {
            beepSound.play()
            alert('Tempo finalizado!')
            zerar()
            return 
        }
        duracaoTimer -= 1
        screenTimer()
}

startPauseBtn.addEventListener('click', initAndPause)

function initAndPause() {
    if(intervaloId){
        pauseSound.play()
        zerar()
        return
    }
    playSound.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseBtn.textContent = "Pausar";
    playPauseIcon.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    startPauseBtn.textContent = "Começar";
    playPauseIcon.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null;
}

function screenTimer() {
    const clock = new Date(duracaoTimer * 1000)
    const formatedTimer = clock.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${formatedTimer}`;
}

screenTimer()