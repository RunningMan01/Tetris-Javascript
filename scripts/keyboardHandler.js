class KeyboardHandler {
  #canvasId = null;
  static cursorLeft = 37;
  static cursorUp = 38;  
  static cursorRight = 39;
  static cursorDown = 40;  
  static Left = false;
  static Right = false;
  static Up = false;
  static Down = false;
    constructor() {            
      window.addEventListener("keydown", this.keyDown);
      // window.addEventListener("keyup", this.keyUp);
    }

  clearKeyPresses() {
    KeyboardHandler.Left = false;
    KeyboardHandler.Right = false;
    KeyboardHandler.Up = false;
    KeyboardHandler.Down = false;
  }

  // User presses a key
  keyDown(e) {
    //console.log("key down: " + KeyboardHandler.cursorLeft);
    switch (e.keyCode) {
      case KeyboardHandler.cursorLeft :
        //console.log("--->>DOWN key left");
        KeyboardHandler.Left = true;
        //console.log("--->>DOWN KH lef: " + KeyboardHandler.Left);
        //self.Left = true;
        break;
      case KeyboardHandler.cursorUp :
        KeyboardHandler.Up = true;
        break;
      case KeyboardHandler.cursorRight :
        KeyboardHandler.Right = true;
        break;
      case KeyboardHandler.cursorDown :
        KeyboardHandler.Down = true;
        break;
    }
  }

  // User releases a key
  keyUp(e) {
    //console.log("key up");
    switch (e.keyCode) {
      case KeyboardHandler.cursorLeft :
        KeyboardHandler.Left = false;
        //console.log("--->>UP key left");
        break;
      case KeyboardHandler.cursorUp :
        KeyboardHandler.Up = false;
        break;
      case KeyboardHandler.cursorRight :
        KeyboardHandler.Right = false;
        break;
      case KeyboardHandler.cursorDown :
        KeyboardHandler.Down = false;
        break;
    }
  }
}