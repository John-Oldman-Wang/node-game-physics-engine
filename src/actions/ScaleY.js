var PropertyValueInc = require('./PropertyValueInc');

var ScaleY = function(items, value, step, index, direction) {
  return PropertyValueInc(items, 'scaleY', value, step, index, direction);
};

module.exports = ScaleY;
