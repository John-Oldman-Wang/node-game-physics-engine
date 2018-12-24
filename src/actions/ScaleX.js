var PropertyValueInc = require('./PropertyValueInc');

var ScaleX = function(items, value, step, index, direction) {
  return PropertyValueInc(items, 'scaleX', value, step, index, direction);
};

module.exports = ScaleX;
