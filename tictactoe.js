const squares = document.querySelectorAll('.square');
const player1Input = document.querySelector('#player1');
const player2Input = document.querySelector('#player2');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');
const currentPlayerDisplay = document.querySelector('#current-player');
let currentPlayer = '';
let player1 = '';
let player2 = '';

function startGame() {
  player1 = player1Input.value || 'Player 1';
  player2 = player2Input.value || 'Player 2';
  currentPlayer = 'X';
  currentPlayerDisplay.textContent = player1;
  squares.forEach(square => {
    square.addEventListener('click', handleClick);
  });
}

function handleClick(event) {
  const square = event.target;
  
  if (square.textContent !== '') {
    return;
  }
  
  square.textContent = currentPlayer;
  
  if (checkForWin()) {
    alert(`${currentPlayer} wins!`);
    endGame();
    return;
  }
  
  if (checkForTie()) {
    alert(`It's a tie!`);
    endGame();
    return;
  }
  
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisplay.textContent = currentPlayer === 'X' ? player1 : player2;
}

function checkForWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];
  
  return winningCombos.some(combo => {
    return combo.every(index => {
      return squares[index].textContent === currentPlayer;
    });
  });
}

function checkForTie() {
  return [...squares].every(square => {
    return square.textContent !== '';
  });
}

function endGame() {
  squares.forEach(square => {
    square.removeEventListener('click', handleClick);
  });
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', () => {
  location.reload();
});


