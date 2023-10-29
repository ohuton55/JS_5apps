console.log('hello from modules');

const startPage = document.querySelector('#ty-start-page');
const typingGame = document.querySelector('#ty-game');
const titleTime = document.querySelector('#ty-title-time');
const timer = document.querySelector('#ty-timer');
const timeSelectEl = document.querySelector('.ty-time-select');
const typing = document.querySelector('#typing');
const backToStart = document.querySelector('#ty-back-to-start');
const resultContainer = document.querySelector('#ty-result-container');
const textarea = document.querySelector('#ty-textarea');

let timelimit = 30; // 制限時間
let remainingTime;  // 残り時間
let isActive = false;   // タイピングメニューがアクティブか
let isPlaying = false;  // タイピングゲームをプレイ中か
let intervalId = null;

timeSelectEl.addEventListener('change', () => {
    timelimit = timeSelectEl.value;
})

window.addEventListener('keypress', e => {
    isActive = typing.classList.contains('active');

    if(e.key === 'Enter' && isActive){
        if(!isPlaying){
            isActive = false;
            isPlaying = true;
            // Enterが押され、typing sectionがactiveのときゲームをスタート
            start();
        }   
    }
    return;
})

function start(){
    startPage.classList.remove('show');
    typingGame.classList.add('show');
    titleTime.textContent = timelimit;
    remainingTime = timelimit;
    timer.textContent = remainingTime;
    textarea.focus();
    textarea.disabled = false;  // テキストアリア入力有効

    intervalId = setInterval(() => {
        remainingTime -= 1;
        timer.textContent = remainingTime;
        if(remainingTime <= 0){
            showResult();
        }
    }, 1000);
}

// スタートに戻るボタンを押された
backToStart.addEventListener('click', () => {
    isPlaying = false;
    typingGame.classList.remove('show');
    startPage.classList.add('show');
    resultContainer.classList.remove('show');
})

function showResult(){
    textarea.disabled = true;   // テキストアリア入力無効
    clearInterval(intervalId);  // 引数のsetInterval()をクリアする
    setInterval(() => {
        resultContainer.classList.add('show');
    }, 1000);
}