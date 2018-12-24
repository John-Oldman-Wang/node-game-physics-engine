var PropertyValueSet = require('./PropertyValueSet');

var SetOrigin = function(items, originX, originY, stepX, stepY, index, direction) {
  if (originY === undefined || originY === null) {
    originY = originX;
  }

  PropertyValueSet(items, 'originX', originX, stepX, index, direction);

  return PropertyValueSet(items, 'originY', originY, stepY, index, direction);
};

module.exports = SetOrigin;
