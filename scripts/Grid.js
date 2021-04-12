class Grid {  
  constructor(rows, columns) {
    this.grid = this.createGrid(rows, columns)
    this.rows = rows;
    this.columns = columns;
    this.shape = null;
  }

  // Creates the array of blocks given the number of rows and 
  // columns specified
  createGrid(rows, cols) {
    var grid = new Array(rows)
    for(var row = 0; row < rows; row++) {
      grid[row] = new Array(cols);
      for(var col = 0; col < cols; col++) {
        grid[row][col] = null;
      };
    }
    return grid;
  }

  // Assigns the shape as the current shape for the grid. The grid isn't a part of
  // the grid at this point.
  addShape(shape) {
    // Top row of shape aligns with top row of Grid
    // Mid point of shape aligns with mid point of Grid
    this.shape = shape;
    this.shape.left = Math.round((this.columns - shape.width) / 2.0);
    this.shape.top = 0;

    return this.moveShape(0, 0, true);
  }

  // For each block that makes up the shape definition, check the following
  //    Block won't be placed outside the matrix limits
  //    Block won't be placed in an occupied location of the matrix 
  // Return true / false accordingly
  canMoveShape(rowDelta, columDelta, definition) {
    //console.log("canMoveShape: Start");
    var canMove = true;
    var self = this;
   
    $.each(definition, function (id, block) {    
      //console.log("--> $.each");
      var newBlockRow = block.row + self.shape.top + rowDelta;
      var newBlockCol = block.col + self.shape.left + columDelta;
      //console.log("---> nbr: " + newBlockRow + ", this.rows: " + self.rows);
      if (newBlockRow >= self.rows)
      {
        console.log("==>Rows");
        canMove = false;
        return;
      }
      else if (newBlockCol >= self.columns) {      
        canMove = false;
        return;
      }
      else if (newBlockCol < 0) {
        canMove = false;
        return;
      }
      else if (self.grid[newBlockRow][newBlockCol] != null) {
        console.log("==>cell full");
        canMove = false;
        return;
      }      
    })

    //console.log("canMoveShape: End");
    return canMove;
  }

  // Move associated shape down one row
  moveShapeDown() {    
    return this.moveShape(1, 0, false);
  }
  
  // Move associated shape left one column
  moveShapeLeft() {
    return this.moveShape(0, -1, false);
  }
  
  // Move associated shape right one column
  moveShapeRight() {
    return this.moveShape(0, 1, false);
  }

// Move existing shape or passed in shape to the specified location
// of the Matrix
// Parameters:
//    rowDelta: relative change in row
//    colDelta: relative change in column
//    justCheck: true to just check that shape can move to specified
//               location.
//    definition: shape definition, or module level shape if not specified
// Returns:
//    Boolean whether shape can be placed in new position or not
  moveShape(rowDelta, colDelta, justCheck, definition) {
    var canMove = true;

    //console.log("moveShape: start");
    // If shape not passed in, use module level shape definition
    definition = definition ?? this.shape.definition;    
    //console.log("definition: " + JSON.stringify(definition));

    // If we've got to this point then shape can be moved in the specified
    // direction. Update its position here.
    //console.log("-->>calling canMoveShape");
    canMove = this.canMoveShape(rowDelta, colDelta, definition);
    //console.log("moveShape: canMove: " + canMove.toString());
    if (canMove) {
      //console.log("mS: canMove: ");
      if (!justCheck) {
        //console.log("mS: !justCheck: ");
        this.shape.top += rowDelta;
        this.shape.left += colDelta;
      }
    }
    //console.log("moveShape: end");
    return canMove;
  }

  // Place associated shape permanently in the grids (when it reaches bottom row)
  placeShape() {
    var self = this;

    $.each(this.shape.definition, function (id, block) { 
      //console.log("writing: " + self.shape.top + block.row, ", " + self.shape.left + block.col);
      self.grid[self.shape.top + block.row][self.shape.left + block.col] = self.shape.colour;
    })

    this.shape = null;
  }

  // Removes any full rows from grid
  // Parameters:
  //    removeBlocksCallBack - remove actual blocks (html divs) from DOM
  //    moveBlocksCallback - move actual blocks (html divs) down as a result
  //      of row being full and removed
  // Returns:
  // Number of rows removed
  checkFullRows() {
    var row = this.rows - 1;
    var col = 0;
    var rowFull = true;  
    var blocksToRemove = [];
    var rowsFull = 0;

    // Check each row at a time
    while (row >= 0) {
      col = 0
      rowFull = true;
      blocksToRemove = [];

      // Check each column in current row
      while (rowFull && col < this.columns)
      {
        var block = this.grid[row][col];

        // A block containing null is empty, row isn't full
        if (block === null)
          rowFull = false;
        else {
          blocksToRemove.push(block.id);
        }
        col++;
      }

      // If row is full, pass individual blocks to callbacks
      if (rowFull) {
          // remove row
          // removeBlocksCallback(blocksToRemove);
          var blocksToMove = this.removeRow(row);
          // move rows above down one and add one at the top
          // moveBlocksCallback(blocksToMove);
          rowsFull++;
      }
      else
        row--;
    }

    return rowsFull;
  }

  // Overwrites individual blocks of row in matrix (not DOM objects) where a row
  // has become full. All rows above are shifted down, and a new empty row
  // added at the top
  // Parameters:
  //    rowNum - 0 based row number of row to remove from matrix
  // Returns:
  //    Array of Block Id's moved from matrix that need DOM objects
  //    also moving
  removeRow(rowNum) {
    // Overwrite row of blocks
    for(var row=rowNum; row > 0; row--) {
      for(var col=0; col < this.columns; col++)
      {
        this.grid[row][col] = this.grid[row - 1][col];
      }
    }

    // Add new empty row at the top
    this.grid[0] = new Array(this.width);
    for(var col = 0; col < this.columns; col++) {
      this.grid[0][col] = null;
    };  
  }

// Was used for debug
showGrid() {
  console.log("showGrid: start");
  // var grid = this.grid;
  //var cols = this.columns;
  //var rows = this.rows;

  console.log("showGrid: rows: " + this.rows);
  console.log("showGrid: cols: ", + this.columns);
  for(var row = 0; row < this.rows; row++) {
    var rowString ="";
    for(var col = 0; col < this.columns; col++) {
      if (this.grid[row][col] != null)
        rowString = rowString + "*";
      else {
        rowString = rowString + "-";
      }
    }
    console.log(rowString);
    }
    console.log("showGrid: end");
  }
}
