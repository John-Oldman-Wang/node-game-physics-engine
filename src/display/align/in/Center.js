var CenterOn = require('../../bounds/CenterOn');
var GetCenterX = require('../../bounds/GetCenterX');
var GetCenterY = require('../../bounds/GetCenterY');

var Center = function(gameObject, alignIn, offsetX, offsetY) {
  if (offsetX === undefined) {
    offsetX = 0;
  }
  if (offsetY === undefined) {
    offsetY = 0;
  }

  CenterOn(gameObject, GetCenterX(alignIn) + offsetX, GetCenterY(alignIn) + offsetY);

  return gameObject;
};

module.exports = Center;
