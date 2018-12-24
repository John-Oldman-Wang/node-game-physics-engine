var ProcessTileSeparationY = function(body, y) {
  if (y < 0) {
    body.blocked.none = false;
    body.blocked.up = true;
  } else if (y > 0) {
    body.blocked.none = false;
    body.blocked.down = true;
  }

  body.position.y -= y;

  if (body.bounce.y === 0) {
    body.velocity.y = 0;
  } else {
    body.velocity.y = -body.velocity.y * body.bounce.y;
  }
};

module.exports = ProcessTileSeparationY;
