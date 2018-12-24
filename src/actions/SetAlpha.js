var PropertyValueSet = require('./PropertyValueSet');

var SetAlpha = function(items, value, step, index, direction) {
  return PropertyValueSet(items, 'alpha', value, step, index, direction);
};

module.exports = SetAlpha;
