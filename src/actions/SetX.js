var PropertyValueSet = require('./PropertyValueSet');

var SetX = function(items, value, step, index, direction) {
  return PropertyValueSet(items, 'x', value, step, index, direction);
};

module.exports = SetX;
