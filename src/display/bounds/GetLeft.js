var GetLeft = function(gameObject) {
  return gameObject.x - gameObject.width * gameObject.originX;
};

module.exports = GetLeft;
