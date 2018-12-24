var SetCenterX = function(gameObject, x) {
  var offsetX = gameObject.width * gameObject.originX;

  gameObject.x = x + offsetX - gameObject.width * 0.5;

  return gameObject;
};

module.exports = SetCenterX;
