var SpriteCanvasRenderer = function(renderer, src, interpolationPercentage, camera, parentMatrix) {
  renderer.batchSprite(src, src.frame, camera, parentMatrix);
};

module.exports = SpriteCanvasRenderer;
