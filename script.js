const boardElement = document.getElementById("board");
const resetButton = document.getElementById("reset");
const changeCountButton = document.getElementById("change-count");
const startGameButton = document.getElementById("start-game");
const carCountInput = document.getElementById("car-count");
const inputContainer = document.getElementById("input-container");
const boardContainer = document.getElementById("board-container");

let boardState = [];
let goalState = [];
let carCount = 0;

const carAEmoji = "🚒"; // Car A: Facing right
const carBEmoji = "🛺"; // Car B: Facing left

// Start the game
startGameButton.addEventListener("click", () => {
  const carInput = parseInt(carCountInput.value);

  if (isNaN(carInput) || carInput < 1) {
    alert("Please enter a valid number of cars");
    return;
  }

  carCount = carInput;
  initializeBoard(carCount);
  inputContainer.style.display = "none";
  boardContainer.style.display = "block";
  renderBoard();
});

// Initialize the board
function initializeBoard(count) {
  boardState = Array(count).fill("A").concat(["-"], Array(count).fill("B"));
  goalState = Array(count).fill("B").concat(["-"], Array(count).fill("A"));
}

// Render the board
function renderBoard() {
  boardElement.innerHTML = ""; // Clear previous state
  boardState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.className = `cell ${cell === "-" ? "empty" : ""}`;
    cellElement.textContent = cell === "A" ? carAEmoji : cell === "B" ? carBEmoji : "";
    cellElement.addEventListener("click", () => handleMove(index));
    boardElement.appendChild(cellElement);
  });
}

// Check if the current state matches the goal state
function checkWin() {
  if (boardState.join("") === goalState.join("")) {
    setTimeout(() => alert("🎉 Congratulations! You've completed the game! 🎉"), 100);
  }
}

// Handle a player's move
function handleMove(index) {
  const emptyIndex = boardState.indexOf("-");

  // Rules: Valid moves are:
  // 1. Adjacent move
  // 2. Jump over one player
  if (
    (index === emptyIndex - 1 || index === emptyIndex + 1) || // Adjacent move
    (index === emptyIndex - 2 || index === emptyIndex + 2) // Jump move
  ) {
    // Ensure the move is forward
    if (
      (boardState[index] === "A" && index < emptyIndex) || // A moves right
      (boardState[index] === "B" && index > emptyIndex)    // B moves left
    ) {
      // Swap the selected player and the empty space
      [boardState[index], boardState[emptyIndex]] = [boardState[emptyIndex], boardState[index]];
      renderBoard();
      checkWin();
    }
  }
}

// Reset the game
resetButton.addEventListener("click", () => {
  initializeBoard(carCount);
  renderBoard();
});

// Change car count
changeCountButton.addEventListener("click", () => {
  boardContainer.style.display = "none";
  inputContainer.style.display = "block";
});





