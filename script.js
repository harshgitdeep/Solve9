const sudokuGrid = document.getElementById('sudokuGrid');
const solveButton = document.getElementById('solveButton');

let board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => null));

for (let i = 0; i < 9; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('input');
        cell.classList.add('cell');
        cell.type = 'text';
        cell.maxLength = 1;
        cell.addEventListener('input', () => {
            const value = cell.value.trim();
            if (value === '' || (value >= 1 && value <= 9 && isUnique(board, i, j, parseInt(value)))) {
                board[i][j] = value === '' ? null : parseInt(value);
            } else {
                cell.value = '';
                board[i][j] = null;
            }
        });
        row.appendChild(cell);
    }
    sudokuGrid.appendChild(row);
}

solveButton.addEventListener('click', () => {
    const solvedBoard = solveSudoku(board);
    if (solvedBoard) {
        displaySudoku(solvedBoard);
    } else {
        alert('Invalid Sudoku puzzle');
    }
});

function solveSudoku(board) {
    return solve(board) ? board : null;
}

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

function isUnique(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }
    return true;
}

function displaySudoku(sudoku) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = sudokuGrid.children[i].children[j];
            cell.value = sudoku[i][j] === null ? '' : sudoku[i][j];
        }
    }
}