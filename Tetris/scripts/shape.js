// Constructor
// parameters:
//    definition - array of block definitions to define the shape
//    size - size is either 3 or 4, to represent 3x3 or 4x4
class Shape {
  constructor(definition, size) {
    this.size = size;
    this.definition = definition;
    this.colour = this.pickColour();
    this.rendered = false;
    this.left = 0;
    this.top = 0;
  }

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

      rotatedDefinition.push(rotatedCell);
    })
   
   return rotatedDefinition;
  }

  // Pick a random colour for this shape
  // Parameters:
  // Returns:
  //    Randomly selected colour (string)
  pickColour() {
     var colours = ["red", "green", "pink", "yellow"];
     var colorIdx = Math.floor(Math.random() * colours.length);
     return colours[colorIdx];
  }
}

