const width = 35;
const height = 30; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement('tbody');
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement('tr');
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement('td');
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById('board').append(table);

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  let flatBoardArray = gol.board.flat();

  for (let i = 0; i < flatBoardArray.length; i++) {
    if (flatBoardArray[i] === 1) {
      tds[i].className = 'alive';
    } else if (flatBoardArray[i] === 0) {
      tds[i].className = '';
    }
  }
};

/**
 * Event Listeners
 */

document.getElementById('board').addEventListener('click', event => {
  let xCoord = event.target.getAttribute('data-row');
  let yCoord = event.target.getAttribute('data-col');

  gol.toggleCell(xCoord, yCoord);
  paint();

  // TODO: Toggle clicked cell (event.target) and paint
});

document.getElementById('step_btn').addEventListener('click', event => {
  gol.tick();
  paint();
  // TODO: Do one gol tick and paint
});

document.getElementById('play_btn').addEventListener('click', event => {
  //debugger;
  gol.currentlyRunning = true;

  const interval = setInterval(() => {
    let playButton = document.getElementById('play_btn');
    if (gol.currentlyRunning === true) {
      gol.tick();
      paint();
      playButton.disabled = true;
    } else if (gol.currentlyRunning === false) {
      playButton.disabled = false;
      clearInterval(interval);
    }
  }, 300);

  interval();
  // TODO: Start playing by calling `tick` and paint
  // repeatedly every fixed time interval.
});

document.getElementById('random_btn').addEventListener('click', event => {
  let maxColIndexForBoard = gol.width - 1;
  let maxRowIndexForBoard = gol.height - 1;
  let finalBoardIndexCell = gol.height * gol.width - 1;

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const randomizedNumberOfCellsToFill = generateRandomNumber(
    0,
    finalBoardIndexCell
  );

  for (let i = 0; i <= randomizedNumberOfCellsToFill; i++) {
    gol.toggleCell(
      generateRandomNumber(0, maxRowIndexForBoard),
      generateRandomNumber(0, maxColIndexForBoard)
    );
  }

  paint();

  // TODO: Randomize the board and paint
});

document.getElementById('pause_btn').addEventListener('click', event => {
  gol.currentlyRunning = false;
});

document.getElementById('clear_btn').addEventListener('click', event => {
  gol.currentlyRunning = false;
  gol.board = gol.makeBoard();
  paint();
});
