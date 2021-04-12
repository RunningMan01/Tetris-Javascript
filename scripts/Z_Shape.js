class Z_Shape extends Shape {
  constructor() {    
    var definition = [{row: 0, col: 0}, {row: 0, col: 1}, {row: 1, col: 1}, {row: 1, col: 2}];
    var size = 3;
    var width = 3;

    super(definition, size);

    this.definition = definition;
    this.size = size;
    this.width = width;
  }
}