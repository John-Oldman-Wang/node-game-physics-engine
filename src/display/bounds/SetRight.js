var SetRight = function(gameObject, value) {
  gameObject.x = value - gameObject.width + gameObject.width * gameObject.originX;

  return gameObject;
};

module.exports = SetRight;
