var SetTop = function(gameObject, value) {
  gameObject.y = value + gameObject.height * gameObject.originY;

  return gameObject;
};

module.exports = SetTop;
