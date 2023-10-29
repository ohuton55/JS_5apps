console.log('hello from modules');

const startPage = document.querySelector('#ty-start-page');
const typingGame = document.querySelector('#ty-game');
const titleTime = document.querySelector('#ty-title-time');
const timer = document.querySelector('#ty-timer');
const timeSelectEl = document.querySelector('.ty-time-select');

let timelimit = 30; // 制限時間
let remainingTime;  // 残り時間

timeSelectEl.addEventListener('change', () => {
    timelimit = timeSelectEl.value;
})
window.addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        console.log('Enter');
        start();
    }
    console.log(e.key);
    return;
})

function start(){
    startPage.classList.remove('show');
    typingGame.classList.add('show');
    titleTime.textContent = timelimit;
    remainingTime = timelimit;
    timer.textContent = remainingTime;
}