var GetRight = function(gameObject) {
  return gameObject.x + gameObject.width - gameObject.width * gameObject.originX;
};

module.exports = GetRight;
