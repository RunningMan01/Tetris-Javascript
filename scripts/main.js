class Main {
    #ctx = null;
    #render = null;
    #canvasId = null;
    #configuration = null;
    #keyboardHandler = null;
    #grid;
    //#lastTime;
    #lastUserMovement;
    #lastElapsedTime;    
    constructor(canvasId, configuration) {
      this.#canvasId = canvasId;
      this.#configuration = configuration;      
      this.#ctx = document.getElementById(canvasId).getContext("2d");
      this.#render = new Render(this.#ctx, this.#configuration);
      this.#keyboardHandler = new KeyboardHandler(canvasId);
      //this.#keyboardHandler.bindKeyPress();
    }
      
    initializeGame() {
      console.log("columns: " + this.#configuration.columns);
      console.log("rows: " + this.#configuration.rows);
      $(this.#canvasId).attr("width", this.#configuration.blockSize * this.#configuration.columns);
      $(this.#canvasId).attr("height", this.#configuration.blockSize * this.#configuration.rows);
      this.#grid = this.grid = new Grid(this.#configuration.rows, this.#configuration.columns);
    }

    testCode() {
      // means of testing methods
      // in final version, remove this
      // Test code
      //var image = new Image(this.#configuration.blockSize, "Red");
      console.log("testCode: " + this.#configuration.blockSize);
      var render = new Render(this.#ctx, this.#configuration);      
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

    timeElapsed(currentTime, timeObj, targetElapsedTime) {      
      // timeElapsed(timestamp, lastTime, 600);
      //console.log("timeElapsed: start");
      if (timeObj.previousTime === undefined) {        
        timeObj.previousTime = currentTime;
        // console.log("timeElapsed: pT: " + timeObj.previousTime);
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
      var timeObj = { previousTime: this.#lastUserMovement };
      if (this.timeElapsed(timestamp, timeObj, this.#configuration.userMovementTime)) {
        this.handleKeyPress();             
      }
      this.#lastUserMovement = timeObj.previousTime;
    }

    getShape() {
      var shape;
      if (this.#grid.shape === null) {
        shape = ShapeFactory.createShape();
        this.#grid.addShape(shape);
      } else {
        shape = this.#grid.shape;
      }

      return shape;
    }

    gameLoop(timestamp) {
      var timeObj;
      var moved = false;

      timestamp = timestamp || new Date().getTime();
      this.getShape();  
      this.userMovementTimeElapsed(timestamp);

      // draw current grid 
      this.#render.renderGrid(this.#grid);    

      timeObj = { previousTime: this.#lastElapsedTime };
      if (this.timeElapsed(timestamp, timeObj, this.#configuration.shapeDropTime)) {
        var canMove = this.#grid.moveShapeDown();
        if (!canMove) {
          this.#grid.placeShape();          
          var rowsRemoved = this.#grid.checkFullRows();
        }
      }
      this.#lastElapsedTime = timeObj.previousTime;

      // Score points

      // Check for game over

      // Check for level up

      var self = this;
      window.requestAnimationFrame(self.gameLoop.bind(self));            
    }
}