var origBoard;
const huPlayer = "O";
const aiPlayer = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none"
  /*create an array of 9 elements and get only the keys from said elements which will be numbers from 0-9 and create a new array FROM this array*/
  origBoard = Array.from(Array(9).keys());
  //reset the board
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
    cells[i].addEventListener('click', turnClick, false);
  }
};

//function will be called every time a click occures
function turnClick(square) {
  if (typeof origBoard[square.target.id] == "number") {
    //log the id (numbers 0-9) of any clicked square
    turn(square.target.id, huPlayer)
    if (!checkTie()) turn(bestSpot(), aiPlayer);
  }
};

/*when player clicks on any square,
the square innertext = huPlayer = "O" */
function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player)
  if (gameWon) gameOver(gameWon)
};

/* find every index that the player has played in; clicked on */
function checkWin(board, player) {
  let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    //loop trough every winCombos arrays
    for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = {index: index, player: player};
        break;
      }
    }
    return gameWon;
};

/*in case of win, color wining combo and remove click event*/
function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
    gameWon.player == huPlayer ? "blue" : "red";
  }
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose!")
};

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame").innerText = who;
}

//any square that is a number will be empty, any square with value 0 and X ar not empty
function emptySquares() {
  return origBoard.filter(s => typeof s == "number");
}

//always play in the first empty square
function bestSpot() {
  return emptySquares()[0];
};

function checkTie() {
  if (emptySquares().length == 0) {
    for (var i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "green";
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie Game!")
    return true;
  }
  return false;
}
