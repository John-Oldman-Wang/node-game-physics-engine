var CircumferencePoint = require('./CircumferencePoint');
var FromPercent = require('../../math/FromPercent');
var MATH_CONST = require('../../math/const');
var Point = require('../point/Point');

var GetPoint = function(circle, position, out) {
  if (out === undefined) {
    out = new Point();
  }

  var angle = FromPercent(position, 0, MATH_CONST.PI2);

  return CircumferencePoint(circle, angle, out);
};

module.exports = GetPoint;
