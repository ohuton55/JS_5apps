console.log('hello from modules');

const startPage = document.querySelector('#ty-start-page');
const typingGame = document.querySelector('#ty-game');
const titleTime = document.querySelector('#ty-title-time');
const timer = document.querySelector('#ty-timer');
const timeSelectEl = document.querySelector('.ty-time-select');
const typing = document.querySelector('#typing');
const backToStart = document.querySelector('#back-to-start');
const resultContainer = document.querySelector('#ty-result-container');

let timelimit = 30; // 制限時間
let remainingTime;  // 残り時間
let isActive = false;   // タイピングメニューがアクティブか
let isPlaying = false;  // タイピングゲームをプレイ中か

timeSelectEl.addEventListener('change', () => {
    timelimit = timeSelectEl.value;
})

window.addEventListener('keypress', e => {
    isActive = typing.classList.contains('active');

    if(e.key === 'Enter'){
        // Enterが押され、typing sectionがactiveのときゲームをスタート
        start();
        isActive = false;
        isPlaying = true;
    }
    return;
})

function start(){
    startPage.classList.remove('show');
    typingGame.classList.add('show');
    titleTime.textContent = timelimit;
    remainingTime = timelimit;
    timer.textContent = remainingTime;
}

// スタートに戻るボタンを押された
backToStart.addEventListener('click', () => {
    isPlaying = false;
    typingGame.classList.remove('show');
    startPage.classList.add('show');
    resultContainer.classList.remove('show');
})