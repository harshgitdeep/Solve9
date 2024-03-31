# Solve9 - Sudoku Solver

## Description

Solve9 is a simple Sudoku solver that uses a backtracking algorithm to find the solution for a given Sudoku puzzle. This project provides a user-friendly interface where users can input their Sudoku puzzle and click the "Solve" button to get the solution.

## Screenshots
<img width="384" alt="Screenshot" src="https://github.com/harshgitdeep/Solve9/assets/88957566/854d84a5-85d5-4a99-85cc-82553b96e2ca">


## Live Hosted

You can try out the Sudoku solver live [here](https://solve9.netlify.app/). 

## How to Use

1. Open `index.html` in your web browser.
2. Enter the numbers for the Sudoku puzzle in the grid.
3. Click the "Solve" button to see the solution.
4. To learn more about Sudoku puzzles and the solver algorithm, click the "Learn More" button.

## Algorithm Used

The solver uses a recursive backtracking algorithm to find the solution to the Sudoku puzzle. Here's a brief explanation of the algorithm:

1. **Base Case**: If all cells in the Sudoku puzzle are filled, return true (puzzle is solved).
2. **Find Empty Cell**: Find an empty cell in the puzzle.
3. **Try Numbers**: Try numbers from 1 to 9 in the empty cell.
4. **Check Validity**: Check if the number is valid in the current cell (not present in the same row, column, or 3x3 subgrid).
5. **Recursive Call**: If the number is valid, recursively call the solve function on the next empty cell.
6. **Backtrack**: If no number is valid, backtrack (reset the current cell and try a different number).

### Code Snippets

#### Data Structures Used

```javascript
let board = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => null));
```

In this snippet, a 2D array `board` is used to represent the Sudoku puzzle. Each cell in the puzzle is represented by a number (1-9) or `null` for empty cells.

#### Finding an Empty Cell

```javascript
function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === null) {
                return [row, col];
            }
        }
    }
    return null;
}
```

This function finds the first empty cell in the puzzle and returns its row and column indices.

#### Recursive Backtracking

```javascript
function solve(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        return true; // Puzzle is solved
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
                return true;
            }
            board[row][col] = null; // Backtrack
        }
    }
    return false; // No valid number for this cell
}
```

This recursive `solve` function tries different numbers in the empty cell and recursively calls itself on the next empty cell until a solution is found or all options are exhausted.

## Deep Concepts of Data Structures and Algorithms (DSA)

### Backtracking Algorithm

The backtracking algorithm is a brute-force algorithm used to solve problems by trying all possible options and backtracking when a solution is not found. It is commonly used in problems where the solution can be represented as a sequence of decisions.

In the Sudoku solver, backtracking is used to systematically try different numbers in empty cells until a solution is found or all options are exhausted.

### Recursion

Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. It is used in the backtracking algorithm to explore all possible solutions by recursively trying different numbers in empty cells.

In the Sudoku solver, the `solve` function calls itself to find a solution for the entire puzzle by recursively solving smaller subproblems (finding a number for a single cell).

### Array Data Structure

Arrays are a fundamental data structure used to store a collection of elements. In the Sudoku solver, arrays are used to represent the Sudoku puzzle itself (`board`) and to iterate over rows, columns, and subgrids to check the validity of numbers.

### Time Complexity Analysis

The time complexity of the backtracking algorithm used in the Sudoku solver is O(9^(n*n)), where n is the size of the puzzle (9 for standard Sudoku). This is because there are 9 options for each cell, and there are n*n cells in the puzzle. However, in practice, the actual number of recursive calls is much less due to pruning invalid branches.

## Technologies Used

- HTML
- CSS
- JavaScript

## Credits

This project was created by [harshgitdeep](https://github.com/harshgitdeep). Feel free to contribute or report issues on [Solve9](https://github.com/harshgitdeep/solve9).
