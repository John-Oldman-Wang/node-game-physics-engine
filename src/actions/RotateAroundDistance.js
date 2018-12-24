var MathRotateAroundDistance = require('../math/RotateAroundDistance');

var RotateAroundDistance = function(items, point, angle, distance) {
  var x = point.x;
  var y = point.y;

  //  There's nothing to do
  if (distance === 0) {
    return items;
  }

  for (var i = 0; i < items.length; i++) {
    MathRotateAroundDistance(items[i], x, y, angle, distance);
  }

  return items;
};

module.exports = RotateAroundDistance;
