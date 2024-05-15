const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtobtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');

//variaveis da lista de exercícios ↓
const startPauseBtn = document.querySelector('.app__card-primary-button');
const timer = document.querySelector('.app__card-timer');
const imagePosition = document.querySelector('.app__image');
const contextPhrases = document.querySelector('.app__title');

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;



focoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
})

curtobtn.addEventListener('click', () =>{
    html.setAttribute('data-contexto', 'descanso-curto');
})

longoBtn.addEventListener('click', () =>{
    html.setAttribute('data-contexto','descanso-longo');
})

//botões da lista de exercicios



