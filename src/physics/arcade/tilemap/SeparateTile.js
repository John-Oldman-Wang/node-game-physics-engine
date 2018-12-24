var TileCheckX = require('./TileCheckX');
var TileCheckY = require('./TileCheckY');
var TileIntersectsBody = require('./TileIntersectsBody');

var SeparateTile = function(i, body, tile, tileWorldRect, tilemapLayer, tileBias) {
  var tileLeft = tileWorldRect.left;
  var tileTop = tileWorldRect.top;
  var tileRight = tileWorldRect.right;
  var tileBottom = tileWorldRect.bottom;
  var faceHorizontal = tile.faceLeft || tile.faceRight;
  var faceVertical = tile.faceTop || tile.faceBottom;

  //  We don't need to go any further if this tile doesn't actually have any colliding faces. This
  //  could happen if the tile was meant to be collided with re: a callback, but otherwise isn't
  //  needed for separation.
  if (!faceHorizontal && !faceVertical) {
    return false;
  }

  var ox = 0;
  var oy = 0;
  var minX = 0;
  var minY = 1;

  if (body.deltaAbsX() > body.deltaAbsY()) {
    //  Moving faster horizontally, check X axis first
    minX = -1;
  } else if (body.deltaAbsX() < body.deltaAbsY()) {
    //  Moving faster vertically, check Y axis first
    minY = -1;
  }

  if (body.deltaX() !== 0 && body.deltaY() !== 0 && faceHorizontal && faceVertical) {
    //  We only need do this if both axes have colliding faces AND we're moving in both
    //  directions
    minX = Math.min(Math.abs(body.position.x - tileRight), Math.abs(body.right - tileLeft));
    minY = Math.min(Math.abs(body.position.y - tileBottom), Math.abs(body.bottom - tileTop));
  }

  if (minX < minY) {
    if (faceHorizontal) {
      ox = TileCheckX(body, tile, tileLeft, tileRight, tileBias);

      //  That's horizontal done, check if we still intersects? If not then we can return now
      if (ox !== 0 && !TileIntersectsBody(tileWorldRect, body)) {
        return true;
      }
    }

    if (faceVertical) {
      oy = TileCheckY(body, tile, tileTop, tileBottom, tileBias);
    }
  } else {
    if (faceVertical) {
      oy = TileCheckY(body, tile, tileTop, tileBottom, tileBias);

      //  That's vertical done, check if we still intersects? If not then we can return now
      if (oy !== 0 && !TileIntersectsBody(tileWorldRect, body)) {
        return true;
      }
    }

    if (faceHorizontal) {
      ox = TileCheckX(body, tile, tileLeft, tileRight, tileBias);
    }
  }

  return ox !== 0 || oy !== 0;
};

module.exports = SeparateTile;
