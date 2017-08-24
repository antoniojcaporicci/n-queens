var board3 = [
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
  [0, 0, 0, 0]
];

var myBoard = new Board(board3);


var displayBoard = function(board) {
  for (var i = 0; i < board.get('n'); i++) {
    console.log(board.get(i).toString());
  }
};

displayBoard(myBoard);

console.log(myBoard.hasMinorDiagonalConflictAt(2));