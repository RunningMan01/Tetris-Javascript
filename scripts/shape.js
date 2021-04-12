// Constructor
// parameters:
//    definition - array of block definitions to define the shape
//    size - size is either 3 or 4, to represent 3x3 or 4x4
class Shape {
  constructor(definition, size, colour) {
    this.size = size;
    this.definition = definition;
    this.colour = colour ?? this.pickColour();
    this.rendered = false;
    this.left = 0;
    this.top = 0;
  }

  // render(canvasContext, x, y, blockSize) {
  //   console.log("J_Shape: " + this.size);
  //   //let self = this;

  //   for (var block of this.definition) {
  //     let startX = block.col * this.blockSize;
  //     let startY = block.row * this.blockSize;
  //     canvasContext.fillStyle = this.colour;
  //     canvasContext.fillRect(startX, startY, blockSize, blockSize);
  //   }

    //this.definition.forEach(function(item, idx) {
    //    console.log("row: " + item.row + ", col: " + item.col);
    //    console.log("blockSize: " + self.blockSize);
    //    let startX = item.col * self.blockSize;
    //    let startY = item.row * self.blockSize;
    //    canvasContext.fillStyle = self.colour;
    //    canvasContext.fillRect(startX, startY, blockSize, blockSize);
    //});
  //}

  // Replaces the current shape definition with rotated shape
  // parameters:
  //    definition - new array to define the shape (rotated)
  replaceDefinition (definition) {
    this.definition = definition;
  };

// Rotates the shape within its own matrix
// Returns:
//    Rotated shape (array of Block)
// To Do - Uncomment this section
  rotateClockwise () {
    var size = this.size;
    var rotatedDefinition = [];

    $.each(this.definition, function(i, cell) {
      var rotatedCell = {row: cell.col, col: (size - 1) - cell.row};
      //var rotatedBlock = new Block(
      //  block.id,
      //  block.col,
      //  (size - 1) - block.row,
      //  block.colour
      //)
      rotatedDefinition.push(rotatedCell);
    })
   
   return rotatedDefinition;
  }

// // possible css colours for the shape
// Shape.prototype.getColours = ["red", "green", "blue", "yellow"];

  // Pick a random colour for this shape
  // Parameters:
  // Returns:
  //    Randomly selected colour (string)
  pickColour() {
     var colours = ["red", "green", "blue", "yellow"];
     var colorIdx = Math.floor(Math.random() * colours.length);
     return colours[colorIdx];
  }
}

