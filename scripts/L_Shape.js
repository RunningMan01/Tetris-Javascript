class L_Shape extends Shape { 
  constructor() {    
    //  *
    //  *
    //  **
    var definition = [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}, {row: 2, col: 1}];
    var size = 3;
    var width = 2;

    super(definition, size);
    
    this.definition = definition;
    this.size = size;
    this.width = width;
  }
}
