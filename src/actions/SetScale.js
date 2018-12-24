var PropertyValueSet = require('./PropertyValueSet');

var SetScale = function(items, scaleX, scaleY, stepX, stepY, index, direction) {
  if (scaleY === undefined || scaleY === null) {
    scaleY = scaleX;
  }

  PropertyValueSet(items, 'scaleX', scaleX, stepX, index, direction);

  return PropertyValueSet(items, 'scaleY', scaleY, stepY, index, direction);
};

module.exports = SetScale;
