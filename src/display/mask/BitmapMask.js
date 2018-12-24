var Class = require('../../utils/Class');

var BitmapMask = new Class({
  initialize: function BitmapMask(scene, renderable) {
    var renderer = scene.sys.game.renderer;

    this.renderer = renderer;

    this.bitmapMask = renderable;

    this.maskTexture = null;

    this.mainTexture = null;

    this.dirty = true;

    this.mainFramebuffer = null;

    this.maskFramebuffer = null;

    this.invertAlpha = false;

    if (renderer && renderer.gl) {
      var width = renderer.width;
      var height = renderer.height;
      var pot = (width & (width - 1)) === 0 && (height & (height - 1)) === 0;
      var gl = renderer.gl;
      var wrap = pot ? gl.REPEAT : gl.CLAMP_TO_EDGE;
      var filter = gl.LINEAR;

      this.mainTexture = renderer.createTexture2D(0, filter, filter, wrap, wrap, gl.RGBA, null, width, height);
      this.maskTexture = renderer.createTexture2D(0, filter, filter, wrap, wrap, gl.RGBA, null, width, height);
      this.mainFramebuffer = renderer.createFramebuffer(width, height, this.mainTexture, false);
      this.maskFramebuffer = renderer.createFramebuffer(width, height, this.maskTexture, false);

      renderer.onContextRestored(function(renderer) {
        var width = renderer.width;
        var height = renderer.height;
        var pot = (width & (width - 1)) === 0 && (height & (height - 1)) === 0;
        var gl = renderer.gl;
        var wrap = pot ? gl.REPEAT : gl.CLAMP_TO_EDGE;
        var filter = gl.LINEAR;

        this.mainTexture = renderer.createTexture2D(0, filter, filter, wrap, wrap, gl.RGBA, null, width, height);
        this.maskTexture = renderer.createTexture2D(0, filter, filter, wrap, wrap, gl.RGBA, null, width, height);
        this.mainFramebuffer = renderer.createFramebuffer(width, height, this.mainTexture, false);
        this.maskFramebuffer = renderer.createFramebuffer(width, height, this.maskTexture, false);
      }, this);
    }
  },

  setBitmap: function(renderable) {
    this.bitmapMask = renderable;
  },

  preRenderWebGL: function(renderer, maskedObject, camera) {
    renderer.pipelines.BitmapMaskPipeline.beginMask(this, maskedObject, camera);
  },

  postRenderWebGL: function(renderer) {
    renderer.pipelines.BitmapMaskPipeline.endMask(this);
  },

  preRenderCanvas: function() {
    // NOOP
  },

  postRenderCanvas: function() {
    // NOOP
  },

  destroy: function() {
    this.bitmapMask = null;

    var renderer = this.renderer;

    if (renderer && renderer.gl) {
      renderer.deleteTexture(this.mainTexture);
      renderer.deleteTexture(this.maskTexture);
      renderer.deleteFramebuffer(this.mainFramebuffer);
      renderer.deleteFramebuffer(this.maskFramebuffer);
    }

    this.mainTexture = null;
    this.maskTexture = null;
    this.mainFramebuffer = null;
    this.maskFramebuffer = null;
    this.renderer = null;
  }
});

module.exports = BitmapMask;
