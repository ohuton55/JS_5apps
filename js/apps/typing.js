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
const quote = document.querySelector('#ty-quote');
const author = document.querySelector('#ty-author-name');


let timelimit = 30; // 制限時間
let remainingTime;  // 残り時間
let isActive = false;   // タイピングメニューがアクティブか
let isPlaying = false;  // タイピングゲームをプレイ中か
let intervalId = null;
let quotes;

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

async function start(){

    textarea.textContent = '';
    quote.textContent = '';
    startPage.classList.remove('show');
    typingGame.classList.add('show');
    titleTime.textContent = timelimit;
    remainingTime = timelimit;
    timer.textContent = remainingTime;
    await fetchAndRenderQuotes();
    
    textarea.disabled = false;  // テキストアリア入力有効
    textarea.focus();

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
    clearInterval(intervalId);
    typingGame.classList.remove('show');
    resultContainer.classList.remove('show');
    startPage.classList.add('show');
})

function showResult(){
    textarea.disabled = true;   // テキストアリア入力無効
    clearInterval(intervalId);  // 引数のsetInterval()をクリアする
    intervalId = setInterval(() => {
        resultContainer.classList.add('show');
    }, 1000);
}

async function fetchAndRenderQuotes(){
    const RANDOM_QUOTE_API_URL = `https://api.quotable.io/random`;
    const response = await fetch(RANDOM_QUOTE_API_URL);
    const data = await response.json();

    quotes = {quote: data.content, author: data.author};

    quotes.quote.split('').forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        quote.appendChild(span);
    })
    author.textContent = quotes.author;
}

textarea.addEventListener('input', () => {
    let inputArray = textarea.value.split('');
    let spans = quote.querySelectorAll('span');
    spans.forEach(span => {
        span.className = '';
    })
    inputArray.forEach((letter, index) => {
        if(letter === spans[index].textContent){
            spans[index].classList.add('correct');
        }else{
            spans[index].classList.add('wrong');
            if(spans[index].textContent === ' '){
                spans[index].classList.add('bar')
            }
        }
    })
    // [...]スプレッドオペレーター
    // node list -> array 
    // every() ... Returns TRUE if everything meets this condition. can use for arr.
    if (spans.length === inputArray.length &&
        [...spans].every(span => span.classList.contains('correct'))){
            showResult();
        }
})