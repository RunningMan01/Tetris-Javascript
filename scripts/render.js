class Render {
  #canvasContext;
  //#configuration;
  #rows;
  #columns;
  #blockSize;
  constructor(canvasContext, configuration) {
    this.#canvasContext = canvasContext;
    //this.#configuration = configuration;
    this.#blockSize = configuration.blockSize;
    this.#rows = configuration.rows;
    //console.log("main->rows: " + this.#rows);
    this.#columns = configuration.columns;
  }

  drawBlock(row, column, colour) {
    // console.log("drawBlock: row: " + row);
    // console.log("drawBlock: column: " + column);
    // console.log("drawBlock: colour: " + colour);
    var x = column * this.#blockSize;
    var y = row * this.#blockSize;

    this.#canvasContext.fillStyle = colour;    
    this.#canvasContext.fillRect(x, y, this.#blockSize, this.#blockSize);
  }

  renderGrid(grid) {
    //console.log(JSON.stringify(grid));
    // clear current canvas context
    this.#canvasContext.clearRect(0, 0, this.#canvasContext.canvas.width, this.#canvasContext.canvas.height)

    // draw all blocks in grid
    for(var row = 0; row < this.#rows; row++) {
      //console.log("r:" + row);
      for(var column = 0; column < this.#columns; column++) {
        //console.log(grid[row][column]);
        //console.log("c:" + column);
        
        if (grid.grid[row][column] !== null)
        {
          //console.log("calling drawBlock");
          this.drawBlock(row, column, grid.grid[row][column]);
        }          
      };
    }
    this.renderShape(grid);
  }

  renderShape(grid) {
    //console.log("lenght:" + shape.definition.length);
    //console.log("shape top: " + shape.top);
    //console.log("shape left: " + shape.left);
    for(var block = 0; block < grid.shape.definition.length; block++)
    {
      var row = grid.shape.top + grid.shape.definition[block].row;
      //console.log("renderShape: " + block.row);
      var column = grid.shape.left + grid.shape.definition[block].col;
      //console.log("renderShape: " + column);
      this.drawBlock(row, column, grid.shape.colour);
    }
  }
}