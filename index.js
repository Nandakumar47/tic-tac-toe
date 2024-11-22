const cells = document.querySelectorAll(".cell");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const gameInfo = document.getElementById("gameInfo");
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let playersChoices = ["", "", "", "", "", "", "", "", ""];
let isCurrentPlayerX = true;
let isGameStarted = false;
let choiceCount = 0;
startButton.addEventListener("click", () => {
  isGameStarted = true;
  gameInfo.innerHTML = "Next player is X";
  startButton.disabled = true;
  resetButton.disabled = false;
});
const checkTheWinner = () => {
  for (const [first, second, third] of winningConditions) {
    const firstChoice = playersChoices[first];
    const secondChoice = playersChoices[second];
    const thirdChoice = playersChoices[third];
    if (
      firstChoice !== "" &&
      firstChoice === secondChoice &&
      secondChoice === thirdChoice
    ) {
      gameInfo.innerHTML = `The winner is ${firstChoice}. Click on restart to start again`;
      isGameStarted = false;
      choiceCount = 0;
      return;
    }
  }

  if (choiceCount === 9) {
    gameInfo.innerHTML = `The Game ended in a Tie. Click on restart to start again`;
    isGameStarted = false;
    choiceCount = 0;
  }
};
const resetTheGame = () => {
  playersChoices = ["", "", "", "", "", "", "", "", ""];
  isCurrentPlayerX = true;
  gameInfo.innerHTML = "Click on start button to start the game";
  startButton.disabled = false;
  isGameStarted = false;
  choiceCount = 0;
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
};
const handleCellClick = (index, cell) => {
  if (playersChoices[index] !== "" || !isGameStarted) {
    return;
  }
  const currentPlayer = isCurrentPlayerX ? "X" : "O";
  const nextPlayer = isCurrentPlayerX ? "O" : "X";
  choiceCount += 1;
  playersChoices[index] = currentPlayer;
  cell.innerHTML = currentPlayer;
  gameInfo.innerHTML = `Next player is ${nextPlayer}`;
  isCurrentPlayerX = !isCurrentPlayerX;
  checkTheWinner();
};
resetButton.addEventListener("click", resetTheGame);
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index, cell));
});
