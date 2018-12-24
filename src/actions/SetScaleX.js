var PropertyValueSet = require('./PropertyValueSet');

var SetScaleX = function(items, value, step, index, direction) {
  return PropertyValueSet(items, 'scaleX', value, step, index, direction);
};

module.exports = SetScaleX;
