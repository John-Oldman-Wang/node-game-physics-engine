var PropertyValueSet = require('./PropertyValueSet');

var SetXY = function(items, x, y, stepX, stepY, index, direction) {
  if (y === undefined || y === null) {
    y = x;
  }

  PropertyValueSet(items, 'x', x, stepX, index, direction);

  return PropertyValueSet(items, 'y', y, stepY, index, direction);
};

module.exports = SetXY;
