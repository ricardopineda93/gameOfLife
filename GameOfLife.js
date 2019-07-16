class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentlyRunning = false;
    this.board = this.makeBoard();
  }

  getCell(row, column) {
    const currentCell = this.board[row][column];

    if (currentCell === 1) {
      return currentCell;
    } else {
      return 'dead';
    }
  }

  setCell(value, row, column) {
    if (row > this.width - 1 || column > this.height - 1) {
      return 'this is an invalid cell';
    } else {
      this.board[row][column] = value;
    }
  }

  toggleCell(row, column) {
    if (this.board[row][column] === 1) {
      this.board[row][column] = 0;
    } else {
      this.board[row][column] = 1;
    }
  }
  /**
   * Returns a 2D Array
   */

  makeBoard() {
    // Creates and returns an 2D Array
    // [
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    // ]
    let rows = new Array(this.height);
    for (let i = 0; i < rows.length; i++) {
      rows[i] = new Array(this.width);
    }
    for (let x = 0; x < rows.length; x++) {
      for (let e = 0; e < rows[x].length; e++) {
        rows[x][e] = 0;
      }
    }

    return rows;
  }

  /**
   * Return the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, column) {
    if (row > this.height - 1 || column > this.width - 1) {
      return 'this is an invalid cell';
    }

    let total = 0;
    let neighbors = [];

    // On cell's row
    if (this.board[row] !== undefined) {
      let sameRowLeft = this.board[row][column + 1];
      // Omit the cell we are currently on when on it's same row.
      let sameRowRight = this.board[row][column - 1];
      neighbors.push(sameRowLeft, sameRowRight);
    }

    // Row directly above
    if (this.board[row - 1] !== undefined) {
      let upperRight = this.board[row - 1][column + 1];
      let upperCenter = this.board[row - 1][column];
      let upperLeft = this.board[row - 1][column - 1];
      neighbors.push(upperRight, upperCenter, upperLeft);
    }

    // Row directly below
    if (this.board[row + 1] !== undefined) {
      let lowerRight = this.board[row + 1][column + 1];
      let lowerCenter = this.board[row + 1][column];
      let lowerLeft = this.board[row + 1][column - 1];
      neighbors.push(lowerRight, lowerCenter, lowerLeft);
    }

    // Calculates total num of neighbors, omitting undefined cells out of board bounds.
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i] === undefined) {
        continue;
      } else {
        total += neighbors[i];
      }
    }

    return total;
  }

  tick() {
    const newBoard = this.makeBoard();
    // Loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        let neighborsTotal = this.livingNeighbors(i, j);
        let currentCell = this.getCell(i, j);
        if (currentCell === 1 && neighborsTotal < 2) {
          newBoard[i][j] = 0;
        } else if (currentCell === 1 && neighborsTotal > 3) {
          newBoard[i][j] = 0;
        } else if (currentCell === 'dead' && neighborsTotal === 3) {
          newBoard[i][j] = 1;
        } else if (currentCell === 1) {
          if (neighborsTotal === 2 || neighborsTotal === 3) {
            newBoard[i][j] = 1;
          }
        }
      }
    }
    this.board = newBoard;
  }
}
