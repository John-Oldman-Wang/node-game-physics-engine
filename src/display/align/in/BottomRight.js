var GetBottom = require('../../bounds/GetBottom');
var GetRight = require('../../bounds/GetRight');
var SetBottom = require('../../bounds/SetBottom');
var SetRight = require('../../bounds/SetRight');

var BottomRight = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  SetRight(gameObject, GetRight(alignIn) + offsetX);
  SetBottom(gameObject, GetBottom(alignIn) + offsetY);

  return gameObject;
};

module.exports = BottomRight;
