var SetCenterX = require('./SetCenterX');
var SetCenterY = require('./SetCenterY');

var CenterOn = function(gameObject, x, y) {
  SetCenterX(gameObject, x);

  return SetCenterY(gameObject, y);
};

module.exports = CenterOn;
