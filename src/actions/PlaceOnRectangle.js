var MarchingAnts = require('../geom/rectangle/MarchingAnts');
var RotateLeft = require('../utils/array/RotateLeft');
var RotateRight = require('../utils/array/RotateRight');

var PlaceOnRectangle = function(items, rect, shift) {
  if (shift === undefined) {
    shift = 0;
  }

  var points = MarchingAnts(rect, false, items.length);

  if (shift > 0) {
    RotateLeft(points, shift);
  } else if (shift < 0) {
    RotateRight(points, Math.abs(shift));
  }

  for (var i = 0; i < items.length; i++) {
    items[i].x = points[i].x;
    items[i].y = points[i].y;
  }

  return items;
};

module.exports = PlaceOnRectangle;
