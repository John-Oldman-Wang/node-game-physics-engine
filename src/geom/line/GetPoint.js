var Point = require('../point/Point');

var GetPoint = function(line, position, out) {
  if (out === undefined) {
    out = new Point();
  }

  out.x = line.x1 + (line.x2 - line.x1) * position;
  out.y = line.y1 + (line.y2 - line.y1) * position;

  return out;
};

module.exports = GetPoint;
