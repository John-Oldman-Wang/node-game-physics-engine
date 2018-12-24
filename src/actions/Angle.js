var PropertyValueInc = require('./PropertyValueInc');
var Angle = function(items, value, step, index, direction) {
  return PropertyValueInc(items, 'angle', value, step, index, direction);
};

module.exports = Angle;
