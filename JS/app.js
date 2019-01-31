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
  //log the id (numbers 0-9) of any clicked square
  turn(square.target.id, huPlayer)
};

/*when player clicks on any square,
the square innertext = huPlayer = "O" */
function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
};
