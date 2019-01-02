var Class = require('../../utils/Class');
var Components = require('../components');
var GameObject = require('../GameObject');
var ImageRender = require('./ImageRender');

var Image = new Class({
  Extends: GameObject,

  Mixins: [
    Components.Alpha,
    Components.BlendMode,
    Components.Depth,
    Components.Flip,
    Components.GetBounds,
    Components.Mask,
    Components.Origin,
    Components.Pipeline,
    Components.ScaleMode,
    Components.ScrollFactor,
    Components.Size,
    Components.TextureCrop,
    Components.Tint,
    Components.Transform,
    Components.Visible,
    ImageRender
  ],

  initialize: function Image(scene, x, y, width = 0, height = 0) {
    GameObject.call(this, scene, 'Image');

    this._crop = this.resetCropObject();

    // this.setTexture(texture, frame);
    this.frame = {
      realWidth: width,
      realHeight: height,
      width,
      height
    };
    this.setPosition(x, y);
    this.setSizeToFrame({
      realWidth: width,
      realHeight: height
    });

    this.setOriginFromFrame();
    this.initPipeline();
  }
});

module.exports = Image;
