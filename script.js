// script.js
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetBtn = document.querySelector('.reset-btn');
const playerDisplay = document.querySelector('.player');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  renderSymbol(clickedCell, currentPlayer);
  checkForWinner();
};

const renderSymbol = (cell, player) => {
  if (player === 'X') {
    cell.innerHTML = `
      <svg viewBox="0 0 100 100">
        <line x1="10" y1="10" x2="90" y2="90" />
        <line x1="90" y1="10" x2="10" y2="90" />
      </svg>
    `;
  } else {
    cell.innerHTML = `
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>
    `;
  }
  cell.classList.add(player);
};

const checkForWinner = () => {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;

    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerDisplay.textContent = currentPlayer;
};

const resetGame = () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  playerDisplay.textContent = currentPlayer;
  cells.forEach(cell => {
    cell.innerHTML = '';
    cell.classList.remove('X', 'O', 'win');
  });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);