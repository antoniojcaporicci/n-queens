// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({
    
    initialize: function (params) {
      
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);

      var sum = row.reduce(function(acc, val) {
        return acc += val;
      });
  
      //console.log(sum);
      if (sum > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var col = [];
      for (var i = 0; i < this.get('n'); i++) {
        col.push(this.get(i)[colIndex]);
      }
      
      return col.reduce(function(acc, val) { return acc + val; }) > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        } 
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) { // expecting positive or negative integer.  
      //Diag 0 - length = 'n', Iterate to n, push this.get(i)[i] = 0
      
      //Diag 1c - length = n-1, iterate to n-1, push this.get(i+1)[i] = 1
      
      //Diag 1r - length = n-1, iterate to n-1, push this.get(i)[i+1] = -1 
      
      //Diag 2c - length = n-2, iterate to n-2, push this.get(i+2)[i] = 2
      
      //Diag 2r - length = n-2, iterate to n-2, push this.get(i)[i+2] = -2
      
      var diag = [];
      var n = this.get('n');
      
      
      if (majorDiagonalColumnIndexAtFirstRow === 0) {
        for (var i = 0; i < n; i++) {
          diag.push(this.get(i)[i]);
        }
      } else if (majorDiagonalColumnIndexAtFirstRow < 0) {
        for (var i = Math.abs(majorDiagonalColumnIndexAtFirstRow); i < n; i++) {
          diag.push(this.get(i)[i - Math.abs(majorDiagonalColumnIndexAtFirstRow)]);
        }
      } else {
        for (var i = 0; i < n - Math.abs(majorDiagonalColumnIndexAtFirstRow); i++) {
          diag.push(this.get(i)[i + Math.abs(majorDiagonalColumnIndexAtFirstRow)]);
        }
      }
      return diag.reduce(function(acc, val) { return acc + val; }, 0) > 1;
    },
    
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var tests = [];
      var n = this.get('n');
      for (var i = (-n + 2); i < n - 1; i++) {
        tests.push(i);
      }
      
      // console.log(tests);
      for (var i = 0; i < tests.length; i++) {
        if (this.hasMajorDiagonalConflictAt(tests[i])) {
          return true;
        }
      }
      return false;
    },
    

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var diag = [];
      var n = this.get('n');
      
      var count = n - 1;
      
      if (minorDiagonalColumnIndexAtFirstRow === n - 1 ) {
        for (var i = 0; i < n; i++) {
          diag.push(this.get(i)[n - i - 1]);
        }
      } else if (minorDiagonalColumnIndexAtFirstRow < n - 1) {
        for (var i = 0; i < minorDiagonalColumnIndexAtFirstRow + 1; i++) {
          diag.push(this.get(i)[minorDiagonalColumnIndexAtFirstRow - i]);
        }
      } else {
        for (var i = minorDiagonalColumnIndexAtFirstRow - (n - 1); i < n; i++) {
          diag.push(this.get(i)[count]);
          count--;          
        }
      }
      
      return diag.reduce(function(acc, val) {
        return acc + val;
      }) > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var tests = [];
      for (var i = 1; i < this.get('n') + 2; i++) {
        tests.push(i);
      }
      console.log(tests);
      for (var i = 0; i < tests.length; i++) {
        if (this.hasMinorDiagonalConflictAt(tests[i])) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
