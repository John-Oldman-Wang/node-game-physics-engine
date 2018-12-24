var GetBottom = require('../../bounds/GetBottom');
var GetLeft = require('../../bounds/GetLeft');
var SetBottom = require('../../bounds/SetBottom');
var SetLeft = require('../../bounds/SetLeft');

var BottomLeft = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  SetLeft(gameObject, GetLeft(alignIn) - offsetX);
  SetBottom(gameObject, GetBottom(alignIn) + offsetY);

  return gameObject;
};

module.exports = BottomLeft;
