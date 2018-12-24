var PropertyValueSet = require('./PropertyValueSet');

var SetBlendMode = function(items, value, index, direction) {
  return PropertyValueSet(items, 'blendMode', value, 0, index, direction);
};

module.exports = SetBlendMode;
