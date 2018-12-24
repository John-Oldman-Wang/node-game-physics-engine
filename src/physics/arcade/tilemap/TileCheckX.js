var ProcessTileSeparationX = require('./ProcessTileSeparationX');

var TileCheckX = function(body, tile, tileLeft, tileRight, tileBias) {
  var ox = 0;

  if (body.deltaX() < 0 && !body.blocked.left && tile.collideRight && body.checkCollision.left) {
    //  Body is moving LEFT
    if (tile.faceRight && body.x < tileRight) {
      ox = body.x - tileRight;

      if (ox < -tileBias) {
        ox = 0;
      }
    }
  } else if (body.deltaX() > 0 && !body.blocked.right && tile.collideLeft && body.checkCollision.right) {
    //  Body is moving RIGHT
    if (tile.faceLeft && body.right > tileLeft) {
      ox = body.right - tileLeft;

      if (ox > tileBias) {
        ox = 0;
      }
    }
  }

  if (ox !== 0) {
    if (body.customSeparateX) {
      body.overlapX = ox;
    } else {
      ProcessTileSeparationX(body, ox);
    }
  }

  return ox;
};

module.exports = TileCheckX;
