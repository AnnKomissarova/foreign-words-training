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
];

const card = document.querySelector(".flip-card");
const mixing = document.querySelector('#shuffle-words');
const btnNext =  document.querySelector('#next');
const btnBack =  document.querySelector('#back');
const btnExam = document.querySelector('#exam');
const examCards = document.querySelector('#exam-cards');

card.onclick = function() {
    card.classList.toggle('active');
};

const currentWords = [...words];

function renderCard(arr) {
    arr.forEach((item) => {
        card.append(doCard(item));                
     })
};

renderCard(currentWords);

function doCard({word, translate, example}) {       
    card.querySelector("#card-front h1").textContent = word;
    card.querySelector("#card-back h1").textContent = translate;
    card.querySelector("#card-back p span").textContent = example;
};

mixing.addEventListener('click', () => {
    let randomCard = currentWords[Math.floor(Math.random() * currentWords.length)];
    renderCard(randomCard);  
});

