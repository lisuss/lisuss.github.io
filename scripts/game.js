function resetGame() {
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = '<span id="winner">Playername</span> won';
    gameOverElement.style.display = 'none';

    let k = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            data[i][j] = 0;
            fields.children[k].textContent = '';
            fields.children[k].classList.remove('disabled');
            k++;
        }
    }
}

function gameStart() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Names cannot be blank");
    return;
  }

  resetGame();

  currentPlayer.textContent = players[activePlayer].name;
  document.getElementById("main-game").style.display = "block";
}

function checkIfWon() {
  for (let i = 0; i < 3; i++) {
    if (
      data[i][0] === data[i][1] &&
      data[i][1] === data[i][2] &&
      data[i][0] > 0
    ) {
      return data[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      data[0][i] === data[1][i] &&
      data[0][i] === data[2][i] &&
      data[0][i] > 0
    ) {
      return data[0][i];
    }
  }

  if (
    data[0][0] === data[1][1] &&
    data[1][1] === data[2][2] &&
    data[0][0] > 0
  ) {
    return data[0][0];
  }

  if (
    data[0][2] === data[1][1] &&
    data[1][1] === data[2][0] &&
    data[2][0] > 0
  ) {
    return data[0][2];
  }

  if (currentRound === 9) {
    return 3;
  }

  return 0;
}

let switchPlayers = () =>
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

let currentPlayerName = () =>
  (currentPlayer.textContent = players[activePlayer].name);

function selectedField(event) {
  const selectedColumn = event.target.dataset.col;
  const selectedRow = event.target.dataset.row;

  if (data[selectedRow - 1][selectedColumn - 1] > 0) {
    return;
  }

  event.target.textContent = players[activePlayer].symbol;
  event.target.classList.add("disabled");

  data[+selectedRow - 1][+selectedColumn - 1] = activePlayer + 1;

  const winner = checkIfWon();

  if (winner !== 0) {
      winnerOfTheGame(winner);
  }

  currentRound++;
  switchPlayers();
  currentPlayerName();
}

function winnerOfTheGame(winner) {
    gameOverElement.style.display = 'block';
    if (winner < 3 && winner > 0) {
        const winnerName = players[winner - 1].name;
        gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    } else {
        gameOverElement.firstElementChild.textContent = 'DRAW';
    }

}
