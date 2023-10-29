console.log('hello from modules');

const startPage = document.querySelector('#ty-start-page');
const typingGame = document.querySelector('#ty-game');
const titleTime = document.querySelector('#ty-title');
const timer = document.querySelector('#ty-timer');

let timelimit = 30; // 制限時間
let remainingTime;  // 残り時間

window.addEventListener('keypress', e => {
    console.log(e);
})