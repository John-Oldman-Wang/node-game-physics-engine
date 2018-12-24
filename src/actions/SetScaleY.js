var PropertyValueSet = require('./PropertyValueSet');

var SetScaleY = function(items, value, step, index, direction) {
  return PropertyValueSet(items, 'scaleY', value, step, index, direction);
};

module.exports = SetScaleY;
