var PropertyValueInc = require('./PropertyValueInc');

var IncAlpha = function(items, value, step, index, direction) {
  return PropertyValueInc(items, 'alpha', value, step, index, direction);
};

module.exports = IncAlpha;
