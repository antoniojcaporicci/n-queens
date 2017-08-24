/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = []; 
  
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      if (j === i) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    solution.push(row);
  }
  
  

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  n = 3;
  var testBoard = new Board({'n': n});
  
  //Create variables for incrementing the toggle indices.
  //Toggle testBoard with all possible combinations.  
  //For every toggle combination - Use helper functions to check for solution.  
  //If solution exists, increment number of solutions.
  
  // if (n === 1) {
  //   testBoard.togglePiece(0, 0);
  //   solutionCount = checkRookSolution(testBoard, solutionCount);
  // }
  
  var recParse = function(board, unplacedRooks, nextRow, nextCol) {
    if (unplacedRooks === 0) {
      solutionCount++;
      return;
    } else {
      board.togglePiece(nextRow, nextCol);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(nextRow, nextCol);
        for (var i = nextRow; i < n; i++) {
          for (var j = nextCol; j < n; j++) {
            recParse(board, unplacedRooks, i, j);
          }
        }
      } else {
        unplacedRooks--;
        for (var i = nextRow + 1; i < n; i++) {
          for (var j = 0; j < n; j++) {
            recParse(board, unplacedRooks, i, j);
          }
        }
      }
    }
  };
  
  recParse(testBoard, n, 0, 0);
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
