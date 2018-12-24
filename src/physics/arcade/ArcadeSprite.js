var Class = require('../../utils/Class');
var Components = require('./components');
var Sprite = require('../../gameobjects/sprite/Sprite');

var ArcadeSprite = new Class({
  Extends: Sprite,

  Mixins: [
    Components.Acceleration,
    Components.Angular,
    Components.Bounce,
    Components.Debug,
    Components.Drag,
    Components.Enable,
    Components.Friction,
    Components.Gravity,
    Components.Immovable,
    Components.Mass,
    Components.Size,
    Components.Velocity
  ],

  initialize: function ArcadeSprite(scene, x, y, texture, frame) {
    Sprite.call(this, scene, x, y, texture, frame);

    this.body = null;
  }
});

module.exports = ArcadeSprite;
