var CircleContains = require('../../geom/circle/Contains');
var Class = require('../../utils/Class');
var CONST = require('./const');
var RadToDeg = require('../../math/RadToDeg');
var Rectangle = require('../../geom/rectangle/Rectangle');
var RectangleContains = require('../../geom/rectangle/Contains');
var Vector2 = require('../../math/Vector2');

var Body = new Class({
  initialize: function Body(world, gameObject) {
    var width = gameObject.width ? gameObject.width : 64;
    var height = gameObject.height ? gameObject.height : 64;

    this.world = world;

    this.gameObject = gameObject;

    this.transform = {
      x: gameObject.x,
      y: gameObject.y,
      rotation: gameObject.angle,
      scaleX: gameObject.scaleX,
      scaleY: gameObject.scaleY,
      displayOriginX: gameObject.displayOriginX,
      displayOriginY: gameObject.displayOriginY
    };

    this.debugShowBody = world.defaults.debugShowBody;

    this.debugShowVelocity = world.defaults.debugShowVelocity;

    this.debugBodyColor = world.defaults.bodyDebugColor;

    this.enable = true;

    this.isCircle = false;

    this.radius = 0;

    this.offset = new Vector2();

    this.position = new Vector2(gameObject.x, gameObject.y);

    this.prev = new Vector2(gameObject.x, gameObject.y);

    this.allowRotation = true;

    this.rotation = gameObject.angle;

    this.preRotation = gameObject.angle;

    this.width = width;

    this.height = height;

    this.sourceWidth = width;

    this.sourceHeight = height;

    if (gameObject.frame) {
      this.sourceWidth = gameObject.frame.realWidth;
      this.sourceHeight = gameObject.frame.realHeight;
    }

    this.halfWidth = Math.abs(width / 2);

    this.halfHeight = Math.abs(height / 2);

    this.center = new Vector2(gameObject.x + this.halfWidth, gameObject.y + this.halfHeight);

    this.velocity = new Vector2();

    this.newVelocity = new Vector2();

    this.deltaMax = new Vector2();

    this.acceleration = new Vector2();

    this.allowDrag = true;

    this.drag = new Vector2();

    this.allowGravity = true;

    this.gravity = new Vector2();

    this.bounce = new Vector2();

    this.worldBounce = null;

    //  If true this Body will dispatch events

    this.onWorldBounds = false;

    this.onCollide = false;

    this.onOverlap = false;

    this.maxVelocity = new Vector2(10000, 10000);

    this.friction = new Vector2(1, 0);

    this.useDamping = false;

    this.angularVelocity = 0;

    this.angularAcceleration = 0;

    this.angularDrag = 0;

    this.maxAngular = 1000;

    this.mass = 1;

    this.angle = 0;

    this.speed = 0;

    this.facing = CONST.FACING_NONE;

    this.immovable = false;

    this.moves = true;

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

    this.syncBounds = false;

    this.isMoving = false;

    this.stopVelocityOnCollide = true;

    //  read-only

    this.physicsType = CONST.DYNAMIC_BODY;

    this._reset = true;

    this._sx = gameObject.scaleX;

    this._sy = gameObject.scaleY;

    this._dx = 0;

    this._dy = 0;

    this._bounds = new Rectangle();
  },

  updateBounds: function() {
    var sprite = this.gameObject;

    //  Container?

    var transform = this.transform;

    if (sprite.parentContainer) {
      var matrix = sprite.getWorldTransformMatrix(this.world._tempMatrix, this.world._tempMatrix2);

      transform.x = matrix.tx;
      transform.y = matrix.ty;
      transform.rotation = RadToDeg(matrix.rotation);
      transform.scaleX = matrix.scaleX;
      transform.scaleY = matrix.scaleY;
      transform.displayOriginX = sprite.displayOriginX;
      transform.displayOriginY = sprite.displayOriginY;
    } else {
      transform.x = sprite.x;
      transform.y = sprite.y;
      transform.rotation = sprite.angle;
      transform.scaleX = sprite.scaleX;
      transform.scaleY = sprite.scaleY;
      transform.displayOriginX = sprite.displayOriginX;
      transform.displayOriginY = sprite.displayOriginY;
    }

    var recalc = false;

    if (this.syncBounds) {
      var b = sprite.getBounds(this._bounds);

      this.width = b.width;
      this.height = b.height;
      recalc = true;
    } else {
      var asx = Math.abs(transform.scaleX);
      var asy = Math.abs(transform.scaleY);

      if (this._sx !== asx || this._sy !== asy) {
        this.width = this.sourceWidth * asx;
        this.height = this.sourceHeight * asy;
        this._sx = asx;
        this._sy = asy;
        recalc = true;
      }
    }

    if (recalc) {
      this.halfWidth = Math.floor(this.width / 2);
      this.halfHeight = Math.floor(this.height / 2);
      this.updateCenter();
    }
  },

  updateCenter: function() {
    this.center.set(this.position.x + this.halfWidth, this.position.y + this.halfHeight);
  },

  update: function(delta) {
    //  Store and reset collision flags
    this.wasTouching.none = this.touching.none;
    this.wasTouching.up = this.touching.up;
    this.wasTouching.down = this.touching.down;
    this.wasTouching.left = this.touching.left;
    this.wasTouching.right = this.touching.right;

    this.touching.none = true;
    this.touching.up = false;
    this.touching.down = false;
    this.touching.left = false;
    this.touching.right = false;

    this.blocked.none = true;
    this.blocked.up = false;
    this.blocked.down = false;
    this.blocked.left = false;
    this.blocked.right = false;

    this.overlapR = 0;
    this.overlapX = 0;
    this.overlapY = 0;

    this.embedded = false;

    //  Updates the transform values
    this.updateBounds();

    var sprite = this.transform;

    this.position.x = sprite.x + sprite.scaleX * (this.offset.x - sprite.displayOriginX);
    this.position.y = sprite.y + sprite.scaleY * (this.offset.y - sprite.displayOriginY);

    this.updateCenter();

    this.rotation = sprite.rotation;

    this.preRotation = this.rotation;

    if (this._reset) {
      this.prev.x = this.position.x;
      this.prev.y = this.position.y;
    }

    if (this.moves) {
      this.world.updateMotion(this, delta);

      var vx = this.velocity.x;
      var vy = this.velocity.y;

      this.newVelocity.set(vx * delta, vy * delta);

      this.position.add(this.newVelocity);

      this.updateCenter();

      this.angle = Math.atan2(vy, vx);
      this.speed = Math.sqrt(vx * vx + vy * vy);

      //  Now the State update will throw collision checks at the Body
      //  And finally we'll integrate the new position back to the Sprite in postUpdate

      if (this.collideWorldBounds && this.checkWorldBounds() && this.onWorldBounds) {
        this.world.emit('worldbounds', this, this.blocked.up, this.blocked.down, this.blocked.left, this.blocked.right);
      }
    }

    this._dx = this.position.x - this.prev.x;
    this._dy = this.position.y - this.prev.y;
  },

  postUpdate: function() {
    this._dx = this.position.x - this.prev.x;
    this._dy = this.position.y - this.prev.y;

    if (this.moves) {
      if (this.deltaMax.x !== 0 && this._dx !== 0) {
        if (this._dx < 0 && this._dx < -this.deltaMax.x) {
          this._dx = -this.deltaMax.x;
        } else if (this._dx > 0 && this._dx > this.deltaMax.x) {
          this._dx = this.deltaMax.x;
        }
      }

      if (this.deltaMax.y !== 0 && this._dy !== 0) {
        if (this._dy < 0 && this._dy < -this.deltaMax.y) {
          this._dy = -this.deltaMax.y;
        } else if (this._dy > 0 && this._dy > this.deltaMax.y) {
          this._dy = this.deltaMax.y;
        }
      }

      this.gameObject.x += this._dx;
      this.gameObject.y += this._dy;

      this._reset = true;
    }

    if (this._dx < 0) {
      this.facing = CONST.FACING_LEFT;
    } else if (this._dx > 0) {
      this.facing = CONST.FACING_RIGHT;
    }

    if (this._dy < 0) {
      this.facing = CONST.FACING_UP;
    } else if (this._dy > 0) {
      this.facing = CONST.FACING_DOWN;
    }

    if (this.allowRotation) {
      this.gameObject.angle += this.deltaZ();
    }

    this.prev.x = this.position.x;
    this.prev.y = this.position.y;
  },

  checkWorldBounds: function() {
    var pos = this.position;
    var bounds = this.world.bounds;
    var check = this.world.checkCollision;

    var bx = this.worldBounce ? -this.worldBounce.x : -this.bounce.x;
    var by = this.worldBounce ? -this.worldBounce.y : -this.bounce.y;

    if (pos.x < bounds.x && check.left) {
      pos.x = bounds.x;
      this.velocity.x *= bx;
      this.blocked.left = true;
      this.blocked.none = false;
    } else if (this.right > bounds.right && check.right) {
      pos.x = bounds.right - this.width;
      this.velocity.x *= bx;
      this.blocked.right = true;
      this.blocked.none = false;
    }

    if (pos.y < bounds.y && check.up) {
      pos.y = bounds.y;
      this.velocity.y *= by;
      this.blocked.up = true;
      this.blocked.none = false;
    } else if (this.bottom > bounds.bottom && check.down) {
      pos.y = bounds.bottom - this.height;
      this.velocity.y *= by;
      this.blocked.down = true;
      this.blocked.none = false;
    }

    return !this.blocked.none;
  },

  setOffset: function(x, y) {
    if (y === undefined) {
      y = x;
    }

    this.offset.set(x, y);

    return this;
  },

  setSize: function(width, height, center) {
    if (center === undefined) {
      center = true;
    }

    var gameObject = this.gameObject;

    if (!width && gameObject.frame) {
      width = gameObject.frame.realWidth;
    }

    if (!height && gameObject.frame) {
      height = gameObject.frame.realHeight;
    }

    this.sourceWidth = width;
    this.sourceHeight = height;

    this.width = this.sourceWidth * this._sx;
    this.height = this.sourceHeight * this._sy;

    this.halfWidth = Math.floor(this.width / 2);
    this.halfHeight = Math.floor(this.height / 2);

    this.updateCenter();

    if (center && gameObject.getCenter) {
      var ox = gameObject.displayWidth / 2;
      var oy = gameObject.displayHeight / 2;

      this.offset.set(ox - this.halfWidth, oy - this.halfHeight);
    }

    this.isCircle = false;
    this.radius = 0;

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
      this.isCircle = true;
      this.radius = radius;

      this.sourceWidth = radius * 2;
      this.sourceHeight = radius * 2;

      this.width = this.sourceWidth * this._sx;
      this.height = this.sourceHeight * this._sy;

      this.halfWidth = Math.floor(this.width / 2);
      this.halfHeight = Math.floor(this.height / 2);

      this.offset.set(offsetX, offsetY);

      this.updateCenter();
    } else {
      this.isCircle = false;
    }

    return this;
  },

  reset: function(x, y) {
    this.stop();

    var gameObject = this.gameObject;

    gameObject.setPosition(x, y);

    gameObject.getTopLeft(this.position);

    this.prev.copy(this.position);

    this.rotation = gameObject.angle;
    this.preRotation = gameObject.angle;

    this.updateBounds();
    this.updateCenter();
  },

  stop: function() {
    this.velocity.set(0);
    this.acceleration.set(0);
    this.speed = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;

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

  onFloor: function() {
    return this.blocked.down;
  },

  onCeiling: function() {
    return this.blocked.up;
  },

  onWall: function() {
    return this.blocked.left || this.blocked.right;
  },

  deltaAbsX: function() {
    return this._dx > 0 ? this._dx : -this._dx;
  },

  deltaAbsY: function() {
    return this._dy > 0 ? this._dy : -this._dy;
  },

  deltaX: function() {
    return this._dx;
  },

  deltaY: function() {
    return this._dy;
  },

  deltaZ: function() {
    return this.rotation - this.preRotation;
  },

  destroy: function() {
    this.enable = false;

    this.world.pendingDestroy.set(this);
  },

  drawDebug: function(graphic) {
    var pos = this.position;

    var x = pos.x + this.halfWidth;
    var y = pos.y + this.halfHeight;

    if (this.debugShowBody) {
      graphic.lineStyle(1, this.debugBodyColor);

      if (this.isCircle) {
        graphic.strokeCircle(x, y, this.width / 2);
      } else {
        graphic.strokeRect(pos.x, pos.y, this.width, this.height);
      }
    }

    if (this.debugShowVelocity) {
      graphic.lineStyle(1, this.world.defaults.velocityDebugColor, 1);
      graphic.lineBetween(x, y, x + this.velocity.x / 2, y + this.velocity.y / 2);
    }
  },

  willDrawDebug: function() {
    return this.debugShowBody || this.debugShowVelocity;
  },

  setCollideWorldBounds: function(value) {
    if (value === undefined) {
      value = true;
    }

    this.collideWorldBounds = value;

    return this;
  },

  setVelocity: function(x, y) {
    this.velocity.set(x, y);

    this.speed = Math.sqrt(x * x + y * y);

    return this;
  },

  setVelocityX: function(value) {
    this.velocity.x = value;

    var vx = value;
    var vy = this.velocity.y;

    this.speed = Math.sqrt(vx * vx + vy * vy);

    return this;
  },

  setVelocityY: function(value) {
    this.velocity.y = value;

    var vx = this.velocity.x;
    var vy = value;

    this.speed = Math.sqrt(vx * vx + vy * vy);

    return this;
  },

  setMaxVelocity: function(x, y) {
    this.maxVelocity.set(x, y);

    return this;
  },

  setBounce: function(x, y) {
    this.bounce.set(x, y);

    return this;
  },

  setBounceX: function(value) {
    this.bounce.x = value;

    return this;
  },

  setBounceY: function(value) {
    this.bounce.y = value;

    return this;
  },

  setAcceleration: function(x, y) {
    this.acceleration.set(x, y);

    return this;
  },

  setAccelerationX: function(value) {
    this.acceleration.x = value;

    return this;
  },

  setAccelerationY: function(value) {
    this.acceleration.y = value;

    return this;
  },

  setAllowDrag: function(value) {
    if (value === undefined) {
      value = true;
    }

    this.allowDrag = value;

    return this;
  },

  setAllowGravity: function(value) {
    if (value === undefined) {
      value = true;
    }

    this.allowGravity = value;

    return this;
  },

  setAllowRotation: function(value) {
    if (value === undefined) {
      value = true;
    }

    this.allowRotation = value;

    return this;
  },

  setDrag: function(x, y) {
    this.drag.set(x, y);

    return this;
  },

  setDragX: function(value) {
    this.drag.x = value;

    return this;
  },

  setDragY: function(value) {
    this.drag.y = value;

    return this;
  },

  setGravity: function(x, y) {
    this.gravity.set(x, y);

    return this;
  },

  setGravityX: function(value) {
    this.gravity.x = value;

    return this;
  },

  setGravityY: function(value) {
    this.gravity.y = value;

    return this;
  },

  setFriction: function(x, y) {
    this.friction.set(x, y);

    return this;
  },

  setFrictionX: function(value) {
    this.friction.x = value;

    return this;
  },

  setFrictionY: function(value) {
    this.friction.y = value;

    return this;
  },

  setAngularVelocity: function(value) {
    this.angularVelocity = value;

    return this;
  },

  setAngularAcceleration: function(value) {
    this.angularAcceleration = value;

    return this;
  },

  setAngularDrag: function(value) {
    this.angularDrag = value;

    return this;
  },

  setMass: function(value) {
    this.mass = value;

    return this;
  },

  setImmovable: function(value) {
    if (value === undefined) {
      value = true;
    }

    this.immovable = value;

    return this;
  },

  setEnable: function(value) {
    if (value === undefined) {
      value = true;
    }

    this.enable = value;

    return this;
  },

  x: {
    get: function() {
      return this.position.x;
    },

    set: function(value) {
      this.position.x = value;
    }
  },

  y: {
    get: function() {
      return this.position.y;
    },

    set: function(value) {
      this.position.y = value;
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

module.exports = Body;
