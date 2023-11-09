const menu = document.querySelector('#gl-menu');
const sizeSelect = document.querySelector('.gl-size-select');
const speedSelect = document.querySelector('.gl-speed-select');
const randomBtns = document.querySelectorAll('.gl-random-btn');
const selfSelectBtn = document.querySelector('.gl-self-select-btn');
const canvasContainer = document.querySelector('.gl-canvas-container');
const pattern = document.querySelector('.gl-pattern');
const controller = document.querySelector('.gl-controller');
const backToMenu = document.querySelector('.gl-back-to-menu');

let size = sizeSelect.value;
let speed = speedSelect.value;
let runningState = false;
const RESUME_COLOR = `#0aa`;
const PAUSE_COLOR = `#f55`;
const ALIVE_CELL = `#0f7`;
const DEAD_CELL = `#000`;

sizeSelect.addEventListener('change', () => {
    size = sizeSelect.value;
})
speedSelect.addEventListener('change', () => {
    speed = speedSelect.value;
})

randomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        menu.classList.add('hide');
        canvasContainer.classList.add('active');
        runningState = true;
        controller.textContent = `Pause`;
        controller.style.backgroundColor = PAUSE_COLOR;
    })
})
selfSelectBtn.addEventListener('click', () => {
    menu.classList.add('hide');
    canvasContainer.classList.add('active');
    pattern.classList.add('active');
    controller.textContent = `Generate`;
    controller.style.backgroundColor = RESUME_COLOR;
})

backToMenu.addEventListener('click', () => {
    menu.classList.remove('hide');
    canvasContainer.classList.remove('active');
    pattern.classList.remove('active');
    runningState = false;
})

controller.addEventListener('click', () => {
    runningState = runningState ? false : true;
    if(!runningState){
        controller.textContent = 'Resume';
        controller.style.backgroundColor = RESUME_COLOR;
    }else{
        controller.textContent = 'Pause';
        controller.style.backgroundColor = PAUSE_COLOR;
    }
})