var Clamp = require('./Clamp');

var FromPercent = function(percent, min, max) {
  percent = Clamp(percent, 0, 1);

  return (max - min) * percent;
};

module.exports = FromPercent;
