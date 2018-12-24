var GetBottom = require('../../bounds/GetBottom');
var GetCenterX = require('../../bounds/GetCenterX');
var SetBottom = require('../../bounds/SetBottom');
var SetCenterX = require('../../bounds/SetCenterX');

var BottomCenter = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
  SetBottom(gameObject, GetBottom(alignIn) + offsetY);

  return gameObject;
};

module.exports = BottomCenter;
