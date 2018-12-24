var ImageWebGLRenderer = function(renderer, src, interpolationPercentage, camera, parentMatrix) {
  this.pipeline.batchSprite(src, camera, parentMatrix);
};

module.exports = ImageWebGLRenderer;
