class Main {
    #gridCtx = null;
    #render = null;
    #canvasId = null;
    #linesId;
    #configuration = null;
    #keyboardHandler = null;
    #grid;    
    #lastUserMovement;
    #lastElapsedTime;   
    #numberOfLines;
    #score;
    #currentShapeDropTime;
    #currentUserMovementTime;
    #rowsCounter;
    #previewShape;
    #previewCtx;
    constructor(gridCanvasId, previewCanvasId, linesId, configuration) {
        // this.#canvasId = '#' + gridCanvasId;
        this.#linesId = linesId;
        this.#configuration = configuration;
        this.#gridCtx = document.getElementById(gridCanvasId).getContext("2d");
        this.#previewCtx = document.getElementById(previewCanvasId).getContext("2d");
        this.#render = new Render(this.#gridCtx, this.#previewCtx, this.#configuration);
        this.#keyboardHandler = new KeyboardHandler(gridCanvasId);
        this.#numberOfLines = 0; 
        this.#score = 0;  
        this.#currentShapeDropTime = this.#configuration.shapeDropTime; 
        this.#currentUserMovementTime = this.#currentShapeDropTime / 4;
        this.#rowsCounter = 0;
        this.#previewShape = null;
    }
      
    initializeGame() {     
      this.#grid = this.grid = new Grid(this.#configuration.rows, this.#configuration.columns);
    }

    increaseLines() {
      this.#numberOfLines++;
      console.log("linesId: " + this.#linesId);
      $(this.#linesId).html("Lines - " + this.#numberOfLines);
    }

    timeElapsed(currentTime, timeObj, targetElapsedTime) {
      if (timeObj.previousTime === undefined) {
        timeObj.previousTime = currentTime;    
      }
      else {
        let elapsedTime = Math.abs(currentTime - timeObj.previousTime);
        if (elapsedTime > targetElapsedTime) {
          timeObj.previousTime = currentTime;
          return true;
        }
      }    
      return false;
    }
    
    handleKeyPress() {      
      if (KeyboardHandler.Left) {    
        this.#grid.moveShapeLeft();
      } else if (KeyboardHandler.Right) {  
        this.#grid.moveShapeRight();
      } else if (KeyboardHandler.Down) {
        this.#grid.moveShapeDown();
      } else if (KeyboardHandler.Up) {
        // Get rotated shapes new rotatedDefinition
        var rotatedDefinition = this.#grid.shape.rotateClockwise();
        // Check that it doesn't collide with existing blockSize, if not rotate
        if (this.#grid.moveShape(0, 0, true, rotatedDefinition)) {
          this.#grid.shape.replaceDefinition(rotatedDefinition);
        }
      }
      this.#keyboardHandler.clearKeyPresses();
    }

    userMovementTimeElapsed(timestamp) {      
      //console.log("uMTE: " + this.#configuration.userMovementTime);
      var timeObj = { previousTime: this.#lastUserMovement };
      if (this.timeElapsed(timestamp, timeObj, this.#currentUserMovementTime)) {
        this.handleKeyPress();             
      }
      this.#lastUserMovement = timeObj.previousTime;
    }

    getShape() {
        var shape; 
        if (this.#grid.shape === null) {
            if (this.#previewShape === null) {
                // new shape is set to current preview shape
                shape = ShapeFactory.createShape();
            }
            else {
                // set shape to new shape
                shape = this.#previewShape;
            }
            this.#previewShape = ShapeFactory.createShape();

            // attempt to add new shape to the grid              
            if (!this.#grid.addShape(shape)) {
                console.log("End of game!");
                return false; // end of the game
            }
        }
        return true;;
    }

    updateScore(rowsRemoved) {    
      if (rowsRemoved > 0) {    
        this.#score += rowsRemoved * 10;          
        $(this.#configuration.labelScoreValue).html(this.#score.toString());
      }
    }

    updateLevel(rowsRemoved) {
      //console.log("updateLevel: rowsRemoved: " + rowsRemoved)      
      //console.log("updateLevel: this.#configuration.levelIncreaseTrigger: " + this.#configuration.levelIncreaseTrigger);
      if (rowsRemoved > 0) {
        //console.log("updateLevel: this.#rowsCounter: " + this.#rowsCounter);
        //console.log("updateLevel: this.#configuration.levelIncreaseTrigger: " + this.#configuration.levelIncreaseTrigger);
        this.#rowsCounter += rowsRemoved;
        if (this.#rowsCounter >= this.#configuration.levelIncreaseTrigger) {
          this.#currentShapeDropTime -= this.#configuration.levelIntervalReduction;
          this.#currentUserMovementTime = this.#currentShapeDropTime / 4;
          this.#rowsCounter -= this.#configuration.levelIncreaseTrigger;
          console.log("updateLevel: currentShapeDropLogtime updated: " + this.#currentShapeDropTime);
          console.log("updateLevel: currentUserMovementTime update: " + this.#currentUserMovementTime);
        }
      }
    }

    startGameLoop() {
      var self = this;
      this.#score = 0;      
      window.requestAnimationFrame(self.gameLoop.bind(self));
    }

    gameLoop(timestamp) {
      var timeObj;      
      var moved = false;

      timestamp = timestamp || new Date().getTime();
      // console.log("--->time elapsed: " + timestamp);
      // if getShape returns false then its game over
        if (this.getShape())
        {
            // draw preview shape

            this.userMovementTimeElapsed(timestamp);

            // draw current grid 
            this.#render.renderGrid(this.#grid);
            this.#render.renderPreviewShape(this.#previewShape);

            timeObj = { previousTime: this.#lastElapsedTime };        
            if (this.timeElapsed(timestamp, timeObj, this.#currentShapeDropTime)) {
            console.log("this.#currentShapeDropTime: " + this.#currentShapeDropTime);
            //console.log("--->time elapsed: moving shape down: " + timestamp);
            var canMove = this.#grid.moveShapeDown();
            if (!canMove) {
                // this.increaseLines();  // to do - remove this
                this.#grid.placeShape();
                var rowsRemoved = this.#grid.checkFullRows();        
                this.updateScore(rowsRemoved);
                this.updateLevel(rowsRemoved);            
            
            }
        }
        this.#lastElapsedTime = timeObj.previousTime;        

        // Check for game over

        // Check for level up

        var self = this;
        window.requestAnimationFrame(self.gameLoop.bind(self));
      }
      else {
        // game is over at this point, just try and work out how to display the final shape
        // the shape is placed in its starting position, try and fit as much of it in the 
        // grid prior to displaying game over  
        // this.#grid.fitLastShapeIn();
        this.#render.renderGrid(this.#grid);
        // Display game over message
        $("#labelGameOver").css("visibility", "visible");

      }
    }

    testCode() {
      // means of testing methods
      // in final version, remove this
      // Test code
      //var image = new Image(this.#configuration.blockSize, "Red");
      console.log("testCode: " + this.#configuration.blockSize);
        var render = new Render(this.#gridCtx, this.#configuration);      
      var grid = new Grid(20, 10);
      //var shape = new L_Shape("Red", 20);
      //var shape = new L_Shape();
      var shapeFactory = new ShapeFactory();
      var shape = ShapeFactory.createShape();

      var canMove = false;
      console.log("before add shape: " + shape.top + ", " + shape.left);
      grid.addShape(shape);
      console.log("after add shape: " + shape.top + ", " + shape.left);
      // grid.showGrid();
      grid.moveShapeDown();
      grid.moveShapeDown();
      grid.moveShapeDown();     
      //render.renderShape(grid.shape);
      grid.placeShape();
      render.renderGrid(grid);
      shape = new J_Shape("Green", 20);

      grid.addShape(shape);
      // render.renderShape(grid.shape);

      // grid.moveShapeDown();
      // grid.placeShape();
      // grid.showGrid();
    }
}