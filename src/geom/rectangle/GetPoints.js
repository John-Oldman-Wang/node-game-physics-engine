var GetPoint = require('./GetPoint');
var Perimeter = require('./Perimeter');

//  Return an array of points from the perimeter of the rectangle
//  each spaced out based on the quantity or step required

var GetPoints = function(rectangle, quantity, stepRate, out) {
  if (out === undefined) {
    out = [];
  }

  //  If quantity is a falsey value (false, null, 0, undefined, etc) then we calculate it based on the stepRate instead.
  if (!quantity) {
    quantity = Perimeter(rectangle) / stepRate;
  }

  for (var i = 0; i < quantity; i++) {
    var position = i / quantity;

    out.push(GetPoint(rectangle, position));
  }

  return out;
};

module.exports = GetPoints;
