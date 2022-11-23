const words = [
    {
        word: "apple",
        translate: "яблоко",
        example: "I like apples",
    },
    {
        word: "car",
        translate: "машина",
        example: "I'm driving in a car",
    },
    {
        word: "book",
        translate: "книга",
        example: "This is my favorite book",
    },
    {
        word: "umbrella",
        translate: "зонтик",
        example: "It's raining outside - take an umbrella",
    },
    {
        word: "dog",
        translate: "собака",
        example: "I love dogs more than cats",
    },
    {
        word: "sister",
        translate: "сестра",
        example: "My sister is a doctor",
    },
    // {
    //     word: "raspberry",
    //     translate: "малина",
    //     example: "My favorite berry is raspberry",
    // },
    // {
    //     word: "armchair",
    //     translate: "кресло",
    //     example: "My grandfather loves to relax in the armchair",
    // },
];

const card = document.querySelector(".flip-card");
const mixing = document.querySelector('#shuffle-words');
const btnNext = document.querySelector('#next');
const btnBack = document.querySelector('#back');
const btnExam = document.querySelector('#exam');
const examCards = document.querySelector('#exam-cards');

card.onclick = function () {
    card.classList.toggle('active');
};

const currentWords = [...words];

function renderCard(arr) {
    arr.forEach((item) => {
        card.append(doCard(item));
    })
};
renderCard(currentWords);

function doCard({ word, translate, example }) {
    card.querySelector("#card-front h1").textContent = word;
    card.querySelector("#card-back h1").textContent = translate;
    card.querySelector("#card-back p span").textContent = example;
};

mixing.addEventListener('click', () => {
    doCard(getRandomCard(currentWords));
});

function getRandomCard(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
 }

let current = 0;
btnNext.onclick = function () {    
    current = ++current ;
    btnBack.disabled = false;
    if( current == 4) {
        btnNext.disabled = true;
    } 
    showProgress();
}

btnBack.onclick = function () {      
    current = --current ;
    if( current == 0) {
        btnBack.disabled = true;
    }
    if( current < 5) {
        btnNext.disabled = false;
    }
    showProgress();
}

function showProgress() {
    document.getElementById('words-progress').value = current * 25;
    document.getElementById('current-word').textContent = current + 1;
    doCard(currentWords[current]);    
}

btnExam.onclick = function() {
    card.classList.add('hidden');
    btnBack.classList.add('hidden');
    btnExam.classList.add('hidden');
    btnNext.classList.add('hidden');
    document.getElementById('study-mode').classList.add('hidden');
    document.getElementById('exam-mode').classList.remove('hidden');
    renderExamCard(mixCards(currentWords));
};
 
function mixCards(arr) {
    let newArr = [];
    arr.forEach((item) => {
        newArr.push(doExamCard(item.word));
        newArr.push(doExamCard(item.translate));
    })
    return shuffle(newArr);
};

function shuffle(array) {
    let currentIndex = array.length, randomIndex;  
    while (currentIndex != 0) {        
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;      
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }  
    return array;
};

function renderExamCard(arr) {
    arr.forEach((item) => {
        examCards.append(item);
    })   
};

function doExamCard(key) {
    let item = document.createElement("div");
    item.classList.add('card');
    item.textContent = key;
    return item;
};

let firstCard = 0;
let secondCard = 0;
let firstCardIndex = 0;
let secondCardIndex = 0;
var size = Object.keys(words).length;
let endIndex = 0
let click = false;

examCards.addEventListener('click', (event) => {
    let card = event.target.closest('.card');
    if (click === false) {
        card.classList.add('correct');
        firstCard = card;
        firstCardIndex = currentWords.word.indexOf(card.textContent);
        if (firstCardIndex === -1) {
            firstCardIndex = currentWords.translate.indexOf(card.textContent);            
        }
        click = true;
    }
        else if (click === true) {
            secondCard = card;
            secondCardIndex = currentWords.word.indexOf(card.textContent);
            if (secondCardIndex === -1) {
                secondCardIndex = currentWords.translate.indexOf(card.textContent);
            }

            if (firstCardIndex === secondCardIndex) {
                endIndex++;
                firstCard.classList.add('fade-out');
                secondCard.classList.add('correct');
                secondCard.classList.add('fade-out');
                if (endIndex === size) {
                    alert("Поздравляю! Все верно!");
                }
                click = false;
            }

            else if (firstCardIndex !== secondCardIndex) {
                click = false;
                secondCard.classList.add('wrong');
                setTimeout(() => {
                    firstCard.classList.remove('correct');
                    secondCard.classList.remove('wrong');
                }, 500);
            }
        }
})
