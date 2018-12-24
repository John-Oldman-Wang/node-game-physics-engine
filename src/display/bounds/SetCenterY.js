var SetCenterY = function(gameObject, y) {
  var offsetY = gameObject.height * gameObject.originY;

  gameObject.y = y + offsetY - gameObject.height * 0.5;

  return gameObject;
};

module.exports = SetCenterY;
