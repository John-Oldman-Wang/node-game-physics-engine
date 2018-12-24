var GetBottom = function(gameObject) {
  return gameObject.y + gameObject.height - gameObject.height * gameObject.originY;
};

module.exports = GetBottom;
