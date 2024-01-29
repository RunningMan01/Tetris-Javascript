class Render {
    #canvasContext;
    #previewContext;
    #rows;
    #columns;
    #blockSize;
    constructor(canvasContext, previewContext, configuration)
    {
        this.#canvasContext = canvasContext; 
        this.#previewContext = previewContext;
        this.#blockSize = configuration.blockSize;
        this.#rows = configuration.rows;
        this.#columns = configuration.columns;
    }

    renderPreviewShape(previewShape)
    {
        // clear existing preview shape ready to redraw
        this.#previewContext.clearRect(0, 0, this.#previewContext.canvas.width, this.#previewContext.canvas.height);

        var startCol = (4 - previewShape.width) / 2;
        var startRow = (4 - previewShape.height) / 2;


        //var startCol = Math.floor((4 - previewShape.height) / 2);
        //var startRow = Math.floor((4 - previewShape.width) / 2);

        for (var block = 0; block < previewShape.definition.length; block++)
        {
            var row = startRow + previewShape.definition[block].row;
            var column = startCol + previewShape.definition[block].col;
            this.renderBlock(this.#previewContext, row, column, previewShape.colour);
        }
    }

    renderBlock(canvasCtx, row, column, colour)
    {
        var x = column * this.#blockSize;
        var y = row * this.#blockSize;
   
        canvasCtx.fillStyle = colour;  
        canvasCtx.fillRect(x, y, this.#blockSize - 2, this.#blockSize - 2);
    }

    renderGrid(grid)
    {    
        // clear current canvas context
        this.#canvasContext.clearRect(0, 0, this.#canvasContext.canvas.width, this.#canvasContext.canvas.height)

        // draw all blocks in grid
        for (var row = 0; row < this.#rows; row++) {
            for (var column = 0; column < this.#columns; column++)
            {
                if (grid.grid[row][column] !== null)
                {          
                    this.renderBlock(this.#canvasContext, row, column, grid.grid[row][column]);
                }          
            };
        }
        this.renderShape(grid);    
    }

    renderShape(grid)
    {    
        for(var block = 0; block < grid.shape.definition.length; block++)
        {
            var row = grid.shape.top + grid.shape.definition[block].row;      
            var column = grid.shape.left + grid.shape.definition[block].col;      
            this.renderBlock(this.#canvasContext, row, column, grid.shape.colour);
        }
    }
}