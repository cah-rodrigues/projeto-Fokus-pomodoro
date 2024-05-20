const html = document.querySelector('html')

const banner = document.querySelector('.app__image') //imagem das páginas
const contextPhrases = document.querySelector('.app__title') //frase das páginas

//variaveis dos buttons
const buttons = document.querySelectorAll('.app__card-button')
const startPauseBtn = document.querySelector('#start-pause')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtobtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')

//variaveis do timer
const timer = document.querySelector('.app__card-timer') //div do timer
let duracaoTimer = 5; //25 min
let intervaloId = null;

//variaveis de sons
const musicFocoInput = document.querySelector('#alternar-musica')
const music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true;




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
    html.setAttribute('data-contexto', 'foco')
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtobtn.addEventListener('click', () =>{
    html.setAttribute('data-contexto', 'descanso-curto')
    alterarContexto('descanso-curto')
    curtobtn.classList.add('active')
})

longoBtn.addEventListener('click', () =>{
    html.setAttribute('data-contexto', 'descanso-longo')
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})


function alterarContexto(contexto){
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
            zerar()
            alert('Tempo finalizado!')
            return 
        }
    duracaoTimer -= 1
    console.log('Temporizador: ' + duracaoTimer)
}

startPauseBtn.addEventListener('click', initAndPause)

function initAndPause() {
    if(intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}