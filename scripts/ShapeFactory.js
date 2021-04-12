class ShapeFactory {
    static #numShapes = 7;
    //static configuration;
    constructor() {
    //    ShapeFactory.configuration = configuration;
    }

    static createShape () {
        var shapeId = Math.floor(Math.random() * this.#numShapes);
        var shape;

        switch (shapeId) {
            case 0 : 
                shape = new J_Shape();
                break;
             case 1 : 
                 shape = new L_Shape();
                 break;
             case 2 :
                 shape = new Line_Shape();
                 break;
             case 3 :
                 shape = new S_Shape();
                 break;
             case 4 : 
                 shape = new Square_Shape();
                 break;
             case 5 :
                 shape = new T_Shape();
                 break;
             case 6 :
                 shape = new Z_Shape();
                 break;
             default:
                shape = new J_Shape();
                break;
        }

        return shape;
   }
}