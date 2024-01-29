class J_Shape extends Shape {      
    constructor() {
        
        //  *
        //  *
        // **

        var definition = [{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}, {row: 2, col: 0}];    
        var size = 3;
        var width = 2;
        var height = 3;

        super(definition, size);
    
        this.definition = definition;
        this.size = size;
        this.width = width;
        this.height = height;
    }
}
