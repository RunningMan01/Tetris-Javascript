class Line_Shape extends Shape { 
  constructor() {    
    //  *
    //  *
    //  *
    //  *
    var definition = [{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}, {row: 3, col: 1}];
    var size = 4;
    var width = 3;

    super(definition, size);
    
    this.definition = definition;
    this.size = size;
    this.width = width;
  }
}
