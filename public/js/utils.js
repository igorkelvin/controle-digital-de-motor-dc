// Utils

function constrain(x, min, max) {
  //return (x < min ) ? min : (x > max) ? max : x;
  return Math.max(Math.min(x, max), min);
}

