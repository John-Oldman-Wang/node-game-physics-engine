var GetCenterX = require('../../bounds/GetCenterX');
var GetTop = require('../../bounds/GetTop');
var SetCenterX = require('../../bounds/SetCenterX');
var SetTop = require('../../bounds/SetTop');

var TopCenter = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
  SetTop(gameObject, GetTop(alignIn) - offsetY);

  return gameObject;
};

module.exports = TopCenter;
