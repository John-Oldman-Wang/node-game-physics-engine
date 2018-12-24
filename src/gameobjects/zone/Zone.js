var BlendModes = require('../../renderer/BlendModes');
var Circle = require('../../geom/circle/Circle');
var CircleContains = require('../../geom/circle/Contains');
var Class = require('../../utils/Class');
var Components = require('../components');
var GameObject = require('../GameObject');
var Rectangle = require('../../geom/rectangle/Rectangle');
var RectangleContains = require('../../geom/rectangle/Contains');

var Zone = new Class({
  Extends: GameObject,

  Mixins: [
    Components.Depth,
    Components.GetBounds,
    Components.Origin,
    Components.ScaleMode,
    Components.Transform,
    Components.ScrollFactor,
    Components.Visible
  ],

  initialize: function Zone(scene, x, y, width, height) {
    if (width === undefined) {
      width = 1;
    }
    if (height === undefined) {
      height = width;
    }

    GameObject.call(this, scene, 'Zone');

    this.setPosition(x, y);

    this.width = width;

    this.height = height;

    this.blendMode = BlendModes.NORMAL;

    this.updateDisplayOrigin();
  },

  displayWidth: {
    get: function() {
      return this.scaleX * this.width;
    },

    set: function(value) {
      this.scaleX = value / this.width;
    }
  },

  displayHeight: {
    get: function() {
      return this.scaleY * this.height;
    },

    set: function(value) {
      this.scaleY = value / this.height;
    }
  },

  setSize: function(width, height, resizeInput) {
    if (resizeInput === undefined) {
      resizeInput = true;
    }

    this.width = width;
    this.height = height;

    if (resizeInput && this.input && this.input.hitArea instanceof Rectangle) {
      this.input.hitArea.width = width;
      this.input.hitArea.height = height;
    }

    return this;
  },

  setDisplaySize: function(width, height) {
    this.displayWidth = width;
    this.displayHeight = height;

    return this;
  },

  setCircleDropZone: function(radius) {
    return this.setDropZone(new Circle(0, 0, radius), CircleContains);
  },

  setRectangleDropZone: function(width, height) {
    return this.setDropZone(new Rectangle(0, 0, width, height), RectangleContains);
  },

  setDropZone: function(shape, callback) {
    if (shape === undefined) {
      this.setRectangleDropZone(this.width, this.height);
    } else if (!this.input) {
      this.setInteractive(shape, callback, true);
    }

    return this;
  },

  setAlpha: function() {},

  renderCanvas: function() {},

  renderWebGL: function() {}
});

module.exports = Zone;
