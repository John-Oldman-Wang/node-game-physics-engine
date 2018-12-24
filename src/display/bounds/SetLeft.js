var SetLeft = function(gameObject, value) {
  gameObject.x = value + gameObject.width * gameObject.originX;

  return gameObject;
};

module.exports = SetLeft;
