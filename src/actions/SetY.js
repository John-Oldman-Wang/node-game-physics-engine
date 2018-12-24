var PropertyValueSet = require('./PropertyValueSet');

var SetY = function(items, value, step, index, direction) {
  return PropertyValueSet(items, 'y', value, step, index, direction);
};

module.exports = SetY;
