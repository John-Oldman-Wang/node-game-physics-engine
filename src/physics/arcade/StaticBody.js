var CircleContains = require('../../geom/circle/Contains');
var Class = require('../../utils/Class');
var CONST = require('./const');
var RectangleContains = require('../../geom/rectangle/Contains');
var Vector2 = require('../../math/Vector2');

var StaticBody = new Class({
  initialize: function StaticBody(world, gameObject) {
    var width = gameObject.width ? gameObject.width : 64;
    var height = gameObject.height ? gameObject.height : 64;

    this.world = world;

    this.gameObject = gameObject;

    this.debugShowBody = world.defaults.debugShowStaticBody;

    this.debugBodyColor = world.defaults.staticBodyDebugColor;

    this.enable = true;

    this.isCircle = false;

    this.radius = 0;

    this.offset = new Vector2();

    this.position = new Vector2(gameObject.x - gameObject.displayOriginX, gameObject.y - gameObject.displayOriginY);

    this.width = width;

    this.height = height;

    this.halfWidth = Math.abs(this.width / 2);

    this.halfHeight = Math.abs(this.height / 2);

    this.center = new Vector2(gameObject.x + this.halfWidth, gameObject.y + this.halfHeight);

    this.velocity = Vector2.ZERO;

    this.allowGravity = false;

    this.gravity = Vector2.ZERO;

    this.bounce = Vector2.ZERO;

    //  If true this Body will dispatch events

    this.onWorldBounds = false;

    this.onCollide = false;

    this.onOverlap = false;

    this.mass = 1;

    this.immovable = true;

    this.customSeparateX = false;

    this.customSeparateY = false;

    this.overlapX = 0;

    this.overlapY = 0;

    this.overlapR = 0;

    this.embedded = false;

    this.collideWorldBounds = false;

    this.checkCollision = { none: false, up: true, down: true, left: true, right: true };

    this.touching = { none: true, up: false, down: false, left: false, right: false };

    this.wasTouching = { none: true, up: false, down: false, left: false, right: false };

    this.blocked = { none: true, up: false, down: false, left: false, right: false };

    this.physicsType = CONST.STATIC_BODY;

    this._dx = 0;

    this._dy = 0;
  },

  setGameObject: function(gameObject, update) {
    if (gameObject && gameObject !== this.gameObject) {
      //  Remove this body from the old game object
      this.gameObject.body = null;

      gameObject.body = this;

      //  Update our reference
      this.gameObject = gameObject;
    }

    if (update) {
      this.updateFromGameObject();
    }

    return this;
  },

  updateFromGameObject: function() {
    this.world.staticTree.remove(this);

    var gameObject = this.gameObject;

    gameObject.getTopLeft(this.position);

    this.width = gameObject.displayWidth;
    this.height = gameObject.displayHeight;

    this.halfWidth = Math.abs(this.width / 2);
    this.halfHeight = Math.abs(this.height / 2);

    this.center.set(this.position.x + this.halfWidth, this.position.y + this.halfHeight);

    this.world.staticTree.insert(this);

    return this;
  },

  setOffset: function(x, y) {
    if (y === undefined) {
      y = x;
    }

    this.world.staticTree.remove(this);

    this.position.x -= this.offset.x;
    this.position.y -= this.offset.y;

    this.offset.set(x, y);

    this.position.x += this.offset.x;
    this.position.y += this.offset.y;

    this.updateCenter();

    this.world.staticTree.insert(this);

    return this;
  },

  setSize: function(width, height, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = this.offset.x;
    }
    if (offsetY === undefined) {
      offsetY = this.offset.y;
    }

    var gameObject = this.gameObject;

    if (!width && gameObject.frame) {
      width = gameObject.frame.realWidth;
    }

    if (!height && gameObject.frame) {
      height = gameObject.frame.realHeight;
    }

    this.world.staticTree.remove(this);

    this.width = width;
    this.height = height;

    this.halfWidth = Math.floor(width / 2);
    this.halfHeight = Math.floor(height / 2);

    this.offset.set(offsetX, offsetY);

    this.updateCenter();

    this.isCircle = false;
    this.radius = 0;

    this.world.staticTree.insert(this);

    return this;
  },

  setCircle: function(radius, offsetX, offsetY) {
    if (offsetX === undefined) {
      offsetX = this.offset.x;
    }
    if (offsetY === undefined) {
      offsetY = this.offset.y;
    }

    if (radius > 0) {
      this.world.staticTree.remove(this);

      this.isCircle = true;

      this.radius = radius;

      this.width = radius * 2;
      this.height = radius * 2;

      this.halfWidth = Math.floor(this.width / 2);
      this.halfHeight = Math.floor(this.height / 2);

      this.offset.set(offsetX, offsetY);

      this.updateCenter();

      this.world.staticTree.insert(this);
    } else {
      this.isCircle = false;
    }

    return this;
  },

  updateCenter: function() {
    this.center.set(this.position.x + this.halfWidth, this.position.y + this.halfHeight);
  },

  reset: function(x, y) {
    var gameObject = this.gameObject;

    if (x === undefined) {
      x = gameObject.x;
    }
    if (y === undefined) {
      y = gameObject.y;
    }

    this.world.staticTree.remove(this);

    gameObject.getTopLeft(this.position);

    this.updateCenter();

    this.world.staticTree.insert(this);
  },

  stop: function() {
    return this;
  },

  getBounds: function(obj) {
    obj.x = this.x;
    obj.y = this.y;
    obj.right = this.right;
    obj.bottom = this.bottom;

    return obj;
  },

  hitTest: function(x, y) {
    return this.isCircle ? CircleContains(this, x, y) : RectangleContains(this, x, y);
  },

  postUpdate: function() {},

  deltaAbsX: function() {
    return 0;
  },

  deltaAbsY: function() {
    return 0;
  },

  deltaX: function() {
    return 0;
  },

  deltaY: function() {
    return 0;
  },

  deltaZ: function() {
    return 0;
  },

  destroy: function() {
    this.enable = false;

    this.world.pendingDestroy.set(this);
  },

  drawDebug: function(graphic) {
    var pos = this.position;

    if (this.debugShowBody) {
      graphic.lineStyle(1, this.debugBodyColor, 1);
      graphic.strokeRect(pos.x, pos.y, this.width, this.height);
    }
  },

  willDrawDebug: function() {
    return this.debugShowBody;
  },

  setMass: function(value) {
    if (value <= 0) {
      //  Causes havoc otherwise
      value = 0.1;
    }

    this.mass = value;

    return this;
  },

  x: {
    get: function() {
      return this.position.x;
    },

    set: function(value) {
      this.world.staticTree.remove(this);

      this.position.x = value;

      this.world.staticTree.insert(this);
    }
  },

  y: {
    get: function() {
      return this.position.y;
    },

    set: function(value) {
      this.world.staticTree.remove(this);

      this.position.y = value;

      this.world.staticTree.insert(this);
    }
  },

  left: {
    get: function() {
      return this.position.x;
    }
  },

  right: {
    get: function() {
      return this.position.x + this.width;
    }
  },

  top: {
    get: function() {
      return this.position.y;
    }
  },

  bottom: {
    get: function() {
      return this.position.y + this.height;
    }
  }
});

module.exports = StaticBody;
