var MATH_CONST = require('../../math/const');
var TransformMatrix = require('./TransformMatrix');
var WrapAngle = require('../../math/angle/Wrap');
var WrapAngleDegrees = require('../../math/angle/WrapDegrees');

var _FLAG = 4; // 0100

var Transform = {
  _scaleX: 1,

  _scaleY: 1,

  _rotation: 0,

  x: 0,

  y: 0,

  z: 0,

  w: 0,

  scaleX: {
    get: function() {
      return this._scaleX;
    },

    set: function(value) {
      this._scaleX = value;

      if (this._scaleX === 0) {
        this.renderFlags &= ~_FLAG;
      } else {
        this.renderFlags |= _FLAG;
      }
    }
  },

  scaleY: {
    get: function() {
      return this._scaleY;
    },

    set: function(value) {
      this._scaleY = value;

      if (this._scaleY === 0) {
        this.renderFlags &= ~_FLAG;
      } else {
        this.renderFlags |= _FLAG;
      }
    }
  },

  angle: {
    get: function() {
      return WrapAngleDegrees(this._rotation * MATH_CONST.RAD_TO_DEG);
    },

    set: function(value) {
      //  value is in degrees
      this.rotation = WrapAngleDegrees(value) * MATH_CONST.DEG_TO_RAD;
    }
  },

  rotation: {
    get: function() {
      return this._rotation;
    },

    set: function(value) {
      //  value is in radians
      this._rotation = WrapAngle(value);
    }
  },

  setPosition: function(x, y, z, w) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = x;
    }
    if (z === undefined) {
      z = 0;
    }
    if (w === undefined) {
      w = 0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    return this;
  },

  setRandomPosition: function(x, y, width, height) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (width === undefined) {
      width = this.scene.sys.game.config.width;
    }
    if (height === undefined) {
      height = this.scene.sys.game.config.height;
    }

    this.x = x + Math.random() * width;
    this.y = y + Math.random() * height;

    return this;
  },

  setRotation: function(radians) {
    if (radians === undefined) {
      radians = 0;
    }

    this.rotation = radians;

    return this;
  },

  setAngle: function(degrees) {
    if (degrees === undefined) {
      degrees = 0;
    }

    this.angle = degrees;

    return this;
  },

  setScale: function(x, y) {
    if (x === undefined) {
      x = 1;
    }
    if (y === undefined) {
      y = x;
    }

    this.scaleX = x;
    this.scaleY = y;

    return this;
  },

  setX: function(value) {
    if (value === undefined) {
      value = 0;
    }

    this.x = value;

    return this;
  },

  setY: function(value) {
    if (value === undefined) {
      value = 0;
    }

    this.y = value;

    return this;
  },

  setZ: function(value) {
    if (value === undefined) {
      value = 0;
    }

    this.z = value;

    return this;
  },

  setW: function(value) {
    if (value === undefined) {
      value = 0;
    }

    this.w = value;

    return this;
  },

  getLocalTransformMatrix: function(tempMatrix) {
    if (tempMatrix === undefined) {
      tempMatrix = new TransformMatrix();
    }

    return tempMatrix.applyITRS(this.x, this.y, this._rotation, this._scaleX, this._scaleY);
  },

  getWorldTransformMatrix: function(tempMatrix, parentMatrix) {
    if (tempMatrix === undefined) {
      tempMatrix = new TransformMatrix();
    }
    if (parentMatrix === undefined) {
      parentMatrix = new TransformMatrix();
    }

    var parent = this.parentContainer;

    if (!parent) {
      return this.getLocalTransformMatrix(tempMatrix);
    }

    tempMatrix.applyITRS(this.x, this.y, this._rotation, this._scaleX, this._scaleY);

    while (parent) {
      parentMatrix.applyITRS(parent.x, parent.y, parent._rotation, parent._scaleX, parent._scaleY);

      parentMatrix.multiply(tempMatrix, tempMatrix);

      parent = parent.parentContainer;
    }

    return tempMatrix;
  }
};

module.exports = Transform;
