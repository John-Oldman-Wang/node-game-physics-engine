var GetCenterY = function(gameObject) {
  return gameObject.y - gameObject.height * gameObject.originY + gameObject.height * 0.5;
};

module.exports = GetCenterY;
