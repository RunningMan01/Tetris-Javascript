class J_Shape extends Shape {      
  constructor() {    
    //  *
    //  *
    // **
    var definition = [{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}, {row: 2, col: 0}];    
    var size = 3;
    var width = 2;

    super(definition, size);
    
    this.definition = definition;
    this.size = size; // kept in for the moment but not sure is needed
    this.width = width;
  }
}
