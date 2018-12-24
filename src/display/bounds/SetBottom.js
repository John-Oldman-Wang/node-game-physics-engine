var SetBottom = function(gameObject, value) {
  gameObject.y = value - gameObject.height + gameObject.height * gameObject.originY;

  return gameObject;
};

module.exports = SetBottom;
