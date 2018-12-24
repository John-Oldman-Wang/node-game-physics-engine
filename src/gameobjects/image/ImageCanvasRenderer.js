var ImageCanvasRenderer = function(renderer, src, interpolationPercentage, camera, parentMatrix) {
  renderer.batchSprite(src, src.frame, camera, parentMatrix);
};

module.exports = ImageCanvasRenderer;
