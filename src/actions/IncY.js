var PropertyValueInc = require('./PropertyValueInc');

var IncY = function(items, value, step, index, direction) {
  return PropertyValueInc(items, 'y', value, step, index, direction);
};

module.exports = IncY;
