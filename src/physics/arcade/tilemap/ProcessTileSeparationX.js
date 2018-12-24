var ProcessTileSeparationX = function(body, x) {
  if (x < 0) {
    body.blocked.none = false;
    body.blocked.left = true;
  } else if (x > 0) {
    body.blocked.none = false;
    body.blocked.right = true;
  }

  body.position.x -= x;

  if (body.bounce.x === 0) {
    body.velocity.x = 0;
  } else {
    body.velocity.x = -body.velocity.x * body.bounce.x;
  }
};

module.exports = ProcessTileSeparationX;
