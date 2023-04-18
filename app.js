'useStrict';
//on load function
document.addEventListener('DOMContentLoaded', () => {
  //variables
  let gameMatrix;
  let gameWon = false;
  let draw = false;
  let playerState = 1;
  let score = {
    p1: 0,
    p2: 0,
  };

  const messagesEl = document.querySelector('.messages');
  const boardContainerEl = document.querySelector('.board-container');
  const scoresEl = document.querySelector('.scores');
  const resetBoardEl = document.querySelector('.board');
  const resetGameEl = document.querySelector('.game');

  //set matrix to Zeros
  const setMatrix = () =>
    (gameMatrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);

  const setScores = (a = 0, b = 0) => {
    score.p1 = a;
    score.p2 = b;
    scoresEl.innerHTML = `<span class="player01">Player01 : ${score.p1}</span> || <span class="player02">Player02 : ${score.p2}</span>`;
  };

  //function to draw the board
  const drawBoard = () => {
    setMatrix();
    setScores();
    // creating the game board
    for (let i = 0; i < gameMatrix.length; i++) {
      for (let j = 0; j < gameMatrix[i].length; j++) {
        let cell = document.createElement('div');
        cell.classList.add('grid');
        cell.dataset.x = i;
        cell.dataset.y = j;
        cell.state = 0;
        boardContainerEl.append(cell);
      }
    }
  };

  //rendering the tokens
  const renderToken = () => {
    for (let i = 0; i < gameMatrix.length; i++) {
      for (let j = 0; j < gameMatrix[i].length; j++) {
        if (gameMatrix[i][j] !== 0) {
          document
            .querySelector(`[data-x="${i}"][data-y="${j}"]`)
            .classList.add(`token${gameMatrix[i][j]}`);
        } else {
          document
            .querySelector(`[data-x="${i}"][data-y="${j}"]`)
            .classList.remove(`token1`);
          document
            .querySelector(`[data-x="${i}"][data-y="${j}"]`)
            .classList.remove(`token2`);
        }
      }
    }
  };

  //render message Element
  const renderMessage = (message) => (messagesEl.textContent = message);

  //function to check if the game is won
  const checkWin = (player) => {
    if (gameMatrix.flat().reduce((a, b) => a + b) > 9) {
      const isWinningMove = (x, y, dx, dy) => {
        return (
          gameMatrix[x][y] === gameMatrix[x + dx][y + dy] &&
          gameMatrix[x][y] === gameMatrix[x + dx * 2][y + dy * 2] &&
          gameMatrix[x][y] === gameMatrix[x + dx * 3][y + dy * 3]
        );
      };
      const isWinningMoveHorizontal = (x, y) => isWinningMove(x, y, 0, 1);
      const isWinningMoveVertical = (x, y) => isWinningMove(x, y, 1, 0);
      const isWinningMoveDiagonal1 = (x, y) => isWinningMove(x, y, 1, 1);
      const isWinningMoveDiagonal2 = (x, y) => isWinningMove(x, y, -1, 1);
      const isNotEmpty = (x, y) => gameMatrix[x][y] !== 0;

      for (let x = 0; x < gameMatrix.length; x++) {
        for (let y = 0; y < gameMatrix[x].length; y++) {
          if (
            isNotEmpty(x, y) &&
            (isWinningMoveHorizontal(x, y) ||
              (x < 3 && isWinningMoveVertical(x, y)) ||
              (x < 3 && isWinningMoveDiagonal1(x, y)) ||
              (x > 2 && isWinningMoveDiagonal2(x, y)))
          ) {
            renderMessage(`The Winner is Player ${player}!`);
            if (!gameWon) {
              player === 1 ? score.p2++ : score.p1x++;
            }
            gameWon = true;
            setScores(score.p1, score.p2);
            return;
          }

          if (draw) {
            gameWon = true;
            renderMessage(`It's a Tie, Play again!!!`);
          }
        }
      }
    }
  };

  const game = () => {
    // adding event listener to each cell

    document.querySelectorAll('.grid').forEach((cell) => {
      cell.addEventListener('click', (e) => {
        //checking if the cell is already occupied
        for (let i = 5; i >= 0; i--) {
          if (
            gameMatrix[i][Number(e.target.dataset.y)] === 0 &&
            gameWon === false
          ) {
            gameMatrix[i][Number(e.target.dataset.y)] = playerState;
            renderToken();
            playerState === 1 ? (playerState = 2) : (playerState = 1);
            renderMessage(`Player 0${playerState} Turns`);
            break;
          }
        }
        //check for draw
        gameMatrix.flat().reduce((a, b) => a + b, 0) > 62
          ? (draw = true)
          : (draw = false);
        checkWin(playerState);
      });
    });
  };

  resetBoardEl.addEventListener('click', () => {
    setMatrix();
    setScores(score.p1, score.p2);
    renderToken();
    renderMessage(`Player 0${playerState === 1 ? 1 : 2} Turns`);
    playerState = playerState === 1 ? 1 : 2;
    gameWon = false;
    draw = false;
  });

  resetGameEl.addEventListener('click', () => {
    setMatrix();
    setScores();
    renderToken();
    renderMessage(`Player 0${1} Turns`);
    playerState = 1;
    gameWon = false;
    draw = false;
  });

  drawBoard();
  game();
});
