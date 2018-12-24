var GetLeft = require('../../bounds/GetLeft');
var GetTop = require('../../bounds/GetTop');
var SetLeft = require('../../bounds/SetLeft');
var SetTop = require('../../bounds/SetTop');

var TopLeft = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  SetLeft(gameObject, GetLeft(alignIn) - offsetX);
  SetTop(gameObject, GetTop(alignIn) - offsetY);

  return gameObject;
};

module.exports = TopLeft;
