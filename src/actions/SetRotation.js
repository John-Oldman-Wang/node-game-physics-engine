var PropertyValueSet = require('./PropertyValueSet');

var SetRotation = function(items, value, step, index, direction) {
  return PropertyValueSet(items, 'rotation', value, step, index, direction);
};

module.exports = SetRotation;
