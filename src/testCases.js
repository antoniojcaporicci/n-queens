var board3 = [
  [0, 1, 0, 1, 0],
  [1, 0, 0, 1, 1],
  [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 1],
  [0, 1, 0, 0, 0]
];

var myBoard = new Board(board3);


var displayBoard = function(board) {
  for (var i = 0; i < board.get('n'); i++) {
    console.log(board.get(i).toString());
  }
};

console.log('1c (expect [1, 0, 0, 0], false: ', myBoard.hasMinorDiagonalConflictAt(1, 'c'));
console.log('2c (expect [0, 0, 1], false: ', myBoard.hasMinorDiagonalConflictAt(2, 'c'));
console.log('3c (expect [1, 1], true: ', myBoard.hasMinorDiagonalConflictAt(3, 'c'));