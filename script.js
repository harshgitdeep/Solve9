// Initialize DOM elements
const sudokuGrid = document.getElementById("sudokuGrid");
const solveButton = document.getElementById("solveButton");

// Initialize an empty 9x9 Sudoku board
let board = new Array(9).fill(null).map(() => new Array(9).fill(null));

// Create Sudoku grid with input cells
for (let i = 0; i < 9; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  for (let j = 0; j < 9; j++) {
    const cell = document.createElement("input");
    cell.classList.add("cell");
    cell.type = "text";
    cell.maxLength = 1;
    cell.addEventListener("input", () => {
      const value = cell.value.trim();
      if (
        value === "" ||
        (value >= 1 && value <= 9 && isUnique(board, i, j, parseInt(value)))
      ) {
        board[i][j] = value === "" ? null : parseInt(value);
      } else {
        cell.value = "";
        board[i][j] = null;
      }
    });
    row.appendChild(cell);
  }
  sudokuGrid.appendChild(row);
}

// Event listener for the solve button
solveButton.addEventListener("click", () => {
  const solvedBoard = solveSudoku(board);
  if (solvedBoard) {
    displaySudoku(solvedBoard);
  } else {
    alert("Invalid Sudoku puzzle");
  }
});

// Main function to solve Sudoku
function solveSudoku(board) {
  return solve(board) ? board : null;
}

// Recursive backtracking function to solve the board
function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
              return true;
            } else {
              board[row][col] = null;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Check if placing num at board[row][col] is valid
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
    const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
    const boxCol = Math.floor(col / 3) * 3 + (i % 3);
    if (board[boxRow][boxCol] === num) {
      return false;
    }
  }
  return true;
}

// Check if num is unique in row and column
function isUnique(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }
  return true;
}

// Display solved Sudoku on the grid
function displaySudoku(sudoku) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = sudokuGrid.children[i].children[j];
      cell.value = sudoku[i][j] === null ? "" : sudoku[i][j];
    }
  }
}
