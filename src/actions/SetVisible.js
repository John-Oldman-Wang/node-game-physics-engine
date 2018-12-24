var PropertyValueSet = require('./PropertyValueSet');

var SetVisible = function(items, value, index, direction) {
  return PropertyValueSet(items, 'visible', value, 0, index, direction);
};

module.exports = SetVisible;
