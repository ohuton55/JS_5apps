const menuCover = document.querySelector('.sp-cover');
const menu = document.querySelectorAll('.sp-menu > li');
const backToMenu = document.querySelector('.sp-back-to-menu');
const originalImage = document.querySelector('#sp-original-image');
const originalBtn = document.querySelector('#sp-show-original-btn');
const screen = document.querySelector('.sp-screen');
const counter = document.querySelector('.sp-counter');

let level;
let size;
let orderedArray = [];
let hiddenTileIndex;
let tilesArray = [];    // シャッフルしたarr用
let tiles;
let count = 0;
const images = ['space', 'veges'];
// Thanks image for this site. https://pinetools.com/split-image
let selectedImage;
const levelMap = {
    easy: {grid: 'auto auto', size: 2},
    normal: {grid: 'auto auto auto', size: 3},
    hard: {grid: 'auto auto auto auto', size: 4}
};

menu.forEach(item => {
    item.addEventListener('click', () => {
        menuCover.classList.add('hide');
        level = item.dataset.level;
        size = levelMap[level].size;
        orderedArray = [];
        for(let x = 0; x < size; x++){
            for(let y = 0; y < size; y++){
                let titleXY = "" + x + y;   // 00 01 02 10 11 12 などの文字がほしい
                orderedArray.push(titleXY);
            }
        }
        hiddenTileIndex = Math.floor(Math.random() * size ** 2);
        screen.style.gridTemplateColumns = levelMap[level].grid;
        start();
    })
})

backToMenu.addEventListener('click', () => {
    menuCover.classList.remove('hide');
    screen.classList.remove('zoom');
})

function setOriginalImage(){
    selectedImage = images[Math.floor(Math.random() * images.length)];
    originalImage.setAttribute('src', `./images/slide_puzzle/${selectedImage}/${selectedImage}.png`);
}

originalImage.onload = () => {
    const naturalWidth = originalImage.naturalWidth;
    const naturalHeight = originalImage.naturalHeight;
    const ratio = Math.floor(naturalHeight / naturalWidth * 1000) / 1000;
    screen.style.width = "480px";
    // ratio ... 横を1としたときの縦の比率
    screen.style.height = `${Math.floor(480 * ratio)}px`
}

originalBtn.addEventListener('mouseover', () => {
    originalImage.classList.add('show');
})

originalBtn.addEventListener('mouseleave', () => {
    originalImage.classList.remove('show');
})

function renderTiles(arr){
    screen.innerHTML = '';
    arr.forEach((tile, index) => {
        const div = document.createElement('div');
        div.classList.add('sp-tile');
        if(index === hiddenTileIndex){
            div.classList.add('hidden');
        }
        div.style.backgroundImage = `url(./images/slide_puzzle/${selectedImage}/${level}/tile${tile}.png)`;
        screen.appendChild(div);
    })
}

function start(){
    setOriginalImage();
    count = 0;
    counter.textContent = count;
    tilesArray = generateShuffleArray(orderedArray);
    renderTiles(tilesArray);
    updateScreen();
}

function generateShuffleArray(arr){
    // slice() ... 空のパラメータにするとコピーできる
    let shuffledArray = arr.slice();
    for (let i = shuffledArray.length - 1; i > -1; i--){
        let randomIndex = Math.floor(Math.random() * shuffledArray.length);
        let tempValue = shuffledArray[i];
        shuffledArray[i] = shuffledArray[randomIndex];
        shuffledArray[randomIndex] = tempValue;
    }
    return shuffledArray;
}


function updateScreen(){
    tiles = document.querySelectorAll('.sp-tile');
    const hiddenTileRow = Math.floor(hiddenTileIndex / size);
    const hiddenTileCol = hiddenTileIndex % size;

    function generateNewArray(arr, index, hiddenTileIndex){
        const tempValue = arr[index];
        arr[index] = arr[hiddenTileIndex];
        arr[hiddenTileIndex] = tempValue;
        return arr;
    }
    
    function updateTiles(index){
        tilesArray = generateNewArray(tilesArray, index, hiddenTileIndex);
        hiddenTileIndex = index;
        renderTiles(tilesArray);
        count++;
        counter.textContent = count;
        setTimeout(() => {
            if(JSON.stringify(tilesArray) === JSON.stringify(orderedArray)){
            //if(tilesArray === orderedArray){
                // メモリに保存されているIDを比較するため、↑の書き方だと動かない
                complete();
            }
        }, 500)
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => {
            const row = Math.floor(index / size);
            const col = index % size;
            if (level === 'easy'){
                updateTiles(index);
            }else{
                if(row === hiddenTileRow && Math.abs(col - hiddenTileCol) === 1
                || col === hiddenTileCol && Math.abs(row - hiddenTileRow) === 1){
                    updateTiles(index);
                }
            }
            updateScreen();
        })
    })
}

function complete(){
    tiles[hiddenTileIndex].classList.remove('hidden');
    screen.classList.add('zoom');
    tiles.forEach(tile => {
        tile.classList.add('complete');
    })
}