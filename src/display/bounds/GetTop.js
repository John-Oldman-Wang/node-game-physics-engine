var GetTop = function(gameObject) {
  return gameObject.y - gameObject.height * gameObject.originY;
};

module.exports = GetTop;
