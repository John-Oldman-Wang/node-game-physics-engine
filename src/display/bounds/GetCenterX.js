var GetCenterX = function(gameObject) {
  return gameObject.x - gameObject.width * gameObject.originX + gameObject.width * 0.5;
};

module.exports = GetCenterX;
