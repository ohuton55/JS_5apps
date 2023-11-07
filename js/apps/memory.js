const deck = document.querySelector('.mc-deck');
const congrats = document.querySelector('.mc-congrats');

let cards = [];
let openedCards = [];
const faces = ['bug', 'upload', 'congfiguration', 'connection', 'database', 'www', 'mobile', 'keyboard'];
const facesPath = {bug: './images/memory_card/bug.svg',
    upload: './images/memory_card/upload.svg',
    configuration: './images/memory_card/configuration.svg',
    connection: './images/memory_card/connection.svg',
    database: './images/memory_card/database.svg',
    www: './images/memory_card/www.svg',
    mobile: './images/memory_card/mobile.svg',
    keyboard: './images/memory_card/keyboard.svg'};

function createDeck(){
    function createCard(){
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('mc-card');

        const frontDiv = document.createElement('div');
        frontDiv.classList.add('mc-front');
        const frontImg = document.createElement('img');
        frontDiv.appendChild(frontImg);

        const backDiv = document.createElement('div');
        backDiv.classList.add('mc-back');
        const backImg = document.createElement('img');
        backImg.setAttribute('src', './images/memory_card/hand.svg');
        backDiv.appendChild(backImg);

        cardDiv.appendChild(frontDiv);
        cardDiv.appendChild(backDiv);

        return cardDiv
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

    // ...arr   arr内の要素が全て展開される
    const orderedFaces = [...faces, ...faces];
    const shuffledFaces = generateShuffleArray(orderedFaces);

    shuffledFaces.forEach((face) => {
        const cardDiv = createCard();
        const frontImage = cardDiv.querySelector('.mc-front > img');
        frontImage.setAttribute('src', facesPath[face]);
        deck.appendChild(cardDiv);
        cardDiv.addEventListener('click', flip);
    })
}

createDeck();

function flip(){
    if(openedCards.length === 0){
        this.classList.add('rotate');
        openedCards.push(this);
    }else if(openedCards.length === 1){
        if(this === openedCards[0]){
            return
        }
        this.classList.add('rotate');
        openedCards.push(this);
        matchedOrNot(openedCards[0], openedCards[1]);
    }
}

function matchedOrNot(card1, card2){

}