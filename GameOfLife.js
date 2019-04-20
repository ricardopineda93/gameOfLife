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
    // TODO: Create and return an 2D Array
    // with `this.heigh` as rows and `this.width` as cols.
    // For example, given a height of 4 and a width of 3, it will generate:
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

    if (this.board[row] !== undefined) {
      let n1 = this.board[row][column + 1];
      let n7 = this.board[row][column - 1];
      neighbors.push(n1, n7);
    }

    if (this.board[row - 1] !== undefined) {
      let n2 = this.board[row - 1][column + 1];
      let n5 = this.board[row - 1][column];
      let n8 = this.board[row - 1][column - 1];
      neighbors.push(n2, n5, n8);
    }

    if (this.board[row + 1] !== undefined) {
      let n3 = this.board[row + 1][column + 1];
      let n4 = this.board[row + 1][column];
      let n6 = this.board[row + 1][column - 1];
      neighbors.push(n3, n4, n6);
    }

    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i] === undefined) {
        continue;
      } else {
        total += neighbors[i];
      }
    }

    return total;
    // TODO: Return the count of living neighbors.
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */

  // eslint-disable-next-line complexity
  tick() {
    const newBoard = this.makeBoard();
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
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    this.board = newBoard;
  }
}
