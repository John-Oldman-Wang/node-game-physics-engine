var GetCenterY = require('../../bounds/GetCenterY');
var GetLeft = require('../../bounds/GetLeft');
var SetCenterY = require('../../bounds/SetCenterY');
var SetLeft = require('../../bounds/SetLeft');

var LeftCenter = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  SetLeft(gameObject, GetLeft(alignIn) - offsetX);
  SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);

  return gameObject;
};

module.exports = LeftCenter;
