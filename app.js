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
  let gameState = 0;

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
        if (gameMatrix[i][j] === 1) {
          document
            .querySelector(`[data-x="${i}"][data-y="${j}"]`)
            .classList.add('token1');
        }
      }
    }
  };
  document.querySelectorAll('.grid').forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (gameState === 0) {
        for (let i = 0; i < gameMatrix.length; i++) {
          for (let j = 0; j < gameMatrix[i].length; j++) {
            if (e.target.dataset['y'] === j.toString()) {
              console.log(e.target.dataset['y']);
            }
          }
        }
      }
    });
  });
});
