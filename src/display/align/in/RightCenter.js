var GetCenterY = require('../../bounds/GetCenterY');
var GetRight = require('../../bounds/GetRight');
var SetCenterY = require('../../bounds/SetCenterY');
var SetRight = require('../../bounds/SetRight');

var RightCenter = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  SetRight(gameObject, GetRight(alignIn) + offsetX);
  SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);

  return gameObject;
};

module.exports = RightCenter;
