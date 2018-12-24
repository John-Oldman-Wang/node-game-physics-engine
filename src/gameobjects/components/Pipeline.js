var Pipeline = {
  defaultPipeline: null,

  pipeline: null,

  initPipeline: function(pipelineName) {
    // if (pipelineName === undefined) { pipelineName = 'TextureTintPipeline'; }

    // var renderer = this.scene.sys.game.renderer;

    // if (renderer && renderer.gl && renderer.hasPipeline(pipelineName))
    // {
    //     this.defaultPipeline = renderer.getPipeline(pipelineName);
    //     this.pipeline = this.defaultPipeline;

    //     return true;
    // }

    return false;
  },
  setPipeline: function(pipelineName) {
    var renderer = this.scene.sys.game.renderer;

    if (renderer && renderer.gl && renderer.hasPipeline(pipelineName)) {
      this.pipeline = renderer.getPipeline(pipelineName);
    }

    return this;
  },

  resetPipeline: function() {
    this.pipeline = this.defaultPipeline;

    return this.pipeline !== null;
  },

  getPipelineName: function() {
    return this.pipeline.name;
  }
};

module.exports = Pipeline;
