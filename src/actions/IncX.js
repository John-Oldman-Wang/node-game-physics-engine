var PropertyValueInc = require('./PropertyValueInc');

var IncX = function(items, value, step, index, direction) {
  return PropertyValueInc(items, 'x', value, step, index, direction);
};

module.exports = IncX;
