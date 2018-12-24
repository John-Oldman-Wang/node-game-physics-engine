var PropertyValueInc = require('./PropertyValueInc');

var ScaleXY = function(items, scaleX, scaleY, stepX, stepY, index, direction) {
  if (scaleY === undefined || scaleY === null) {
    scaleY = scaleX;
  }

  PropertyValueInc(items, 'scaleX', scaleX, stepX, index, direction);

  return PropertyValueInc(items, 'scaleY', scaleY, stepY, index, direction);
};

module.exports = ScaleXY;
