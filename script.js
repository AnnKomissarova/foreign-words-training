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
    {
        word: "raspberry",
        translate: "малина",
        example: "My favorite berry is raspberry",
    },
    {
        word: "armchair",
        translate: "кресло",
        example: "My grandfather loves to relax in the armchair",
    },
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
    let randomCard = currentWords[Math.floor(Math.random() * currentWords.length)];
    doCard(randomCard);
});

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

//Переходим в режим тестирования
btnExam.onclick = function() {
    card.classList.add('hidden');
    btnBack.classList.add('hidden');
    btnExam.classList.add('hidden');
    btnNext.classList.add('hidden');
    document.getElementById('study-mode').classList.add('hidden');
    document.getElementById('exam-mode').classList.remove('hidden'); 
    
    renderExamCard(currentWords);
 };

//Отрисовываем карточки 
 function renderExamCard(arr) {
    arr.forEach((item) => {
        examCards.append(doForeignExamCard(item));
        examCards.append(doTranslatedExamCard(item));
    })
};

//Создаем карточку с английским словом
 function doForeignExamCard({word}) {
    examCards.innerHTML = word;
};

//Создаем карточку с переводом
function doTranslatedExamCard({translate}) {
    examCards.innerHTML = translate;
};
