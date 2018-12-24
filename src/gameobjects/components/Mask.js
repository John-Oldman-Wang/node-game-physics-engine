var BitmapMask = require('../../display/mask/BitmapMask');
var GeometryMask = require('../../display/mask/GeometryMask');

var Mask = {
  mask: null,

  setMask: function(mask) {
    this.mask = mask;

    return this;
  },

  clearMask: function(destroyMask) {
    if (destroyMask === undefined) {
      destroyMask = false;
    }

    if (destroyMask && this.mask) {
      this.mask.destroy();
    }

    this.mask = null;

    return this;
  },

  createBitmapMask: function(renderable) {
    if (renderable === undefined && this.texture) {
      // eslint-disable-next-line consistent-this
      renderable = this;
    }

    return new BitmapMask(this.scene, renderable);
  },

  createGeometryMask: function(graphics) {
    if (graphics === undefined && this.type === 'Graphics') {
      // eslint-disable-next-line consistent-this
      graphics = this;
    }

    return new GeometryMask(this.scene, graphics);
  }
};

module.exports = Mask;
