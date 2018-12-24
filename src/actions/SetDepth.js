var PropertyValueSet = require('./PropertyValueSet');

var SetDepth = function(items, value, step, index, direction) {
  return PropertyValueSet(items, 'depth', value, step, index, direction);
};

module.exports = SetDepth;
