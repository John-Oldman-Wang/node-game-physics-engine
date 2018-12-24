var PropertyValueInc = require('./PropertyValueInc');

var Rotate = function(items, value, step, index, direction) {
  return PropertyValueInc(items, 'rotation', value, step, index, direction);
};

module.exports = Rotate;
