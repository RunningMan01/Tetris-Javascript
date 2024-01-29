class Configuration {
  static blockSize = 25;
  static rows = 20;
  static columns = 10;
  static shapeDropTime = 600; // ms - wait time before shape is moved down
  static levelIntervalReduction = 50; // ms - reduction in time when user completes required number of rows
  static levelIncreaseTrigger = 5; // number of completed rows that trigger a level increase (reduce time interval)
  static userMovementTime = this.shapeDropTime / 4;  // ms - wait time between user moving shape
  static labelScoreValue = "#labelScoreValue";  // id of the current score value
}