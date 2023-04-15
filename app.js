'useStrict';

let gameMatrix = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];
document.addEventListener('DOMContentLoaded', () => {
  let playerState = 1;

  for (let i = 0; i < gameMatrix.length; i++) {
    for (let j = 0; j < gameMatrix[i].length; j++) {
      let cell = document.createElement('div');
      cell.classList.add('grid');
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.state = 0;
      document.querySelector('.board-container').append(cell);
    }
  }

  const renderToken = () => {
    for (let i = 0; i < gameMatrix.length; i++) {
      for (let j = 0; j < gameMatrix[i].length; j++) {
        if (gameMatrix[i][j] !== 0) {
          document
            .querySelector(`[data-x="${i}"][data-y="${j}"]`)
            .classList.add(`token${gameMatrix[i][j]}`);
        }
      }
    }
  };

  document.querySelectorAll('.grid').forEach((cell) => {
    cell.addEventListener('click', (e) => {
      let x = Number(e.target.dataset.x);
      let y = Number(e.target.dataset.y);
      console.log(playerState);
      for (let i = 5; i >= 0; i--) {
        if (gameMatrix[i][y] === 0) {
          gameMatrix[i][y] = playerState;
          renderToken();
          playerState === 1 ? (playerState = 2) : (playerState = 1);
          break;
        }
      }
      console.log(gameMatrix);
    });
  });
});
