var PropertyValueInc = require('./PropertyValueInc');

var IncXY = function(items, x, y, stepX, stepY, index, direction) {
  if (y === undefined || y === null) {
    y = x;
  }

  PropertyValueInc(items, 'x', x, stepX, index, direction);

  return PropertyValueInc(items, 'y', y, stepY, index, direction);
};

module.exports = IncXY;
