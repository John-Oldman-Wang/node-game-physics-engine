var GetRight = require('../../bounds/GetRight');
var GetTop = require('../../bounds/GetTop');
var SetRight = require('../../bounds/SetRight');
var SetTop = require('../../bounds/SetTop');

var TopRight = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  SetRight(gameObject, GetRight(alignIn) + offsetX);
  SetTop(gameObject, GetTop(alignIn) - offsetY);

  return gameObject;
};

module.exports = TopRight;
