const editPlayer1Btn = document.getElementById('edit-player1-btn');
const editPlayer2Btn = document.getElementById('edit-player2-btn');

editPlayer1Btn.addEventListener('click', editButtonClicked);
editPlayer2Btn.addEventListener('click', editButtonClicked);

const playerOverlay = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const currentPlayer = document.getElementById('current-player');
const gameOverElement = document.getElementById('game-over');

const cancelBtn = document.getElementById('cancel-btn');

cancelBtn.addEventListener('click', overlayClose);

backdropElement.addEventListener('click', overlayClose);

const formElement = document.getElementById('game-form');

formElement.addEventListener('submit', formSubmited);

const errorName = document.getElementById('error');

let chosenPlayer = 0;
let activePlayer = 0;

const players = [
    {
        name: '',
        symbol: 'O',
    },
    {
        name: '',
        symbol: 'X',
    },
];

const startButton = document.getElementById('start-button');

startButton.addEventListener('click', gameStart);

const fieldsClicked = document.querySelectorAll('#game-board li');
const fields = document.getElementById('game-board');

for (const fieldClicked of fieldsClicked) {    
    fieldClicked.addEventListener('click', selectedField);
}

const data = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

let currentRound = 1;