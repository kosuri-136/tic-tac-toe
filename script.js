document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const currentPlayer = document.getElementById('current-player');
    const winner = document.getElementById('winner');
    const draw = document.getElementById('draw');
    const restartBtn = document.getElementById('restart-btn');
  
    let currentPlayerSymbol = 'X';
    let gameEnd = false;
    let moves = 0;
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
  
    const handleCellClick = (e) => {
      const cellIndex = parseInt(e.target.dataset.index);
  
      if (gameBoard[cellIndex] === '' && !gameEnd) {
        gameBoard[cellIndex] = currentPlayerSymbol;
        e.target.textContent = currentPlayerSymbol;
        moves++;
  
        if (checkWinner(currentPlayerSymbol)) {
          winner.textContent = `Player ${currentPlayerSymbol} wins!`;
          gameEnd = true;
        } else if (moves === 9) {
          draw.textContent = 'It\'s a draw!';
          gameEnd = true;
        } else {
          currentPlayerSymbol = currentPlayerSymbol === 'X' ? 'O' : 'X';
          currentPlayer.textContent = `Current Player: ${currentPlayerSymbol}`;
        }
      }
    };
  
    const checkWinner = (symbol) => {
      for (let combination of winningCombinations) {
        if (
          gameBoard[combination[0]] === symbol &&
          gameBoard[combination[1]] === symbol &&
          gameBoard[combination[2]] === symbol
        ) {
          return true;
        }
      }
      return false;
    };
  
    const restartGame = () => {
      currentPlayerSymbol = 'X';
      gameEnd = false;
      moves = 0;
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      cells.forEach((cell) => {
        cell.textContent = '';
      });
      currentPlayer.textContent = `Current Player: ${currentPlayerSymbol}`;
      winner.textContent = '';
      draw.textContent = '';
    };
  
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });
  
    restartBtn.addEventListener('click', restartGame);
  });
  