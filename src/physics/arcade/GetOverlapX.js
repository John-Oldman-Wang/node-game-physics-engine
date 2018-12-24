var CONST = require('./const');

var GetOverlapX = function(body1, body2, overlapOnly, bias) {
  var overlap = 0;
  var maxOverlap = body1.deltaAbsX() + body2.deltaAbsX() + bias;

  if (body1._dx === 0 && body2._dx === 0) {
    //  They overlap but neither of them are moving
    body1.embedded = true;
    body2.embedded = true;
  } else if (body1._dx > body2._dx) {
    //  Body1 is moving right and / or Body2 is moving left
    overlap = body1.right - body2.x;

    if ((overlap > maxOverlap && !overlapOnly) || body1.checkCollision.right === false || body2.checkCollision.left === false) {
      overlap = 0;
    } else {
      body1.touching.none = false;
      body1.touching.right = true;

      body2.touching.none = false;
      body2.touching.left = true;

      if (body2.physicsType === CONST.STATIC_BODY) {
        body1.blocked.none = false;
        body1.blocked.right = true;
      }

      if (body1.physicsType === CONST.STATIC_BODY) {
        body2.blocked.none = false;
        body2.blocked.left = true;
      }
    }
  } else if (body1._dx < body2._dx) {
    //  Body1 is moving left and/or Body2 is moving right
    overlap = body1.x - body2.width - body2.x;

    if ((-overlap > maxOverlap && !overlapOnly) || body1.checkCollision.left === false || body2.checkCollision.right === false) {
      overlap = 0;
    } else {
      body1.touching.none = false;
      body1.touching.left = true;

      body2.touching.none = false;
      body2.touching.right = true;

      if (body2.physicsType === CONST.STATIC_BODY) {
        body1.blocked.none = false;
        body1.blocked.left = true;
      }

      if (body1.physicsType === CONST.STATIC_BODY) {
        body2.blocked.none = false;
        body2.blocked.right = true;
      }
    }
  }

  //  Resets the overlapX to zero if there is no overlap, or to the actual pixel value if there is
  body1.overlapX = overlap;
  body2.overlapX = overlap;

  return overlap;
};

module.exports = GetOverlapX;
