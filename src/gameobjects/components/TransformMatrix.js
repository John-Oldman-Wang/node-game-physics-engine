var Class = require('../../utils/Class');
var Vector2 = require('../../math/Vector2');

var TransformMatrix = new Class({
  initialize: function TransformMatrix(a, b, c, d, tx, ty) {
    if (a === undefined) {
      a = 1;
    }
    if (b === undefined) {
      b = 0;
    }
    if (c === undefined) {
      c = 0;
    }
    if (d === undefined) {
      d = 1;
    }
    if (tx === undefined) {
      tx = 0;
    }
    if (ty === undefined) {
      ty = 0;
    }

    this.matrix = new Float32Array([a, b, c, d, tx, ty, 0, 0, 1]);

    this.decomposedMatrix = {
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0
    };
  },

  a: {
    get: function() {
      return this.matrix[0];
    },

    set: function(value) {
      this.matrix[0] = value;
    }
  },

  b: {
    get: function() {
      return this.matrix[1];
    },

    set: function(value) {
      this.matrix[1] = value;
    }
  },

  c: {
    get: function() {
      return this.matrix[2];
    },

    set: function(value) {
      this.matrix[2] = value;
    }
  },

  d: {
    get: function() {
      return this.matrix[3];
    },

    set: function(value) {
      this.matrix[3] = value;
    }
  },

  e: {
    get: function() {
      return this.matrix[4];
    },

    set: function(value) {
      this.matrix[4] = value;
    }
  },

  f: {
    get: function() {
      return this.matrix[5];
    },

    set: function(value) {
      this.matrix[5] = value;
    }
  },

  tx: {
    get: function() {
      return this.matrix[4];
    },

    set: function(value) {
      this.matrix[4] = value;
    }
  },

  ty: {
    get: function() {
      return this.matrix[5];
    },

    set: function(value) {
      this.matrix[5] = value;
    }
  },

  rotation: {
    get: function() {
      return Math.acos(this.a / this.scaleX) * (Math.atan(-this.c / this.a) < 0 ? -1 : 1);
    }
  },

  scaleX: {
    get: function() {
      return Math.sqrt(this.a * this.a + this.c * this.c);
    }
  },

  scaleY: {
    get: function() {
      return Math.sqrt(this.b * this.b + this.d * this.d);
    }
  },

  loadIdentity: function() {
    var matrix = this.matrix;

    matrix[0] = 1;
    matrix[1] = 0;
    matrix[2] = 0;
    matrix[3] = 1;
    matrix[4] = 0;
    matrix[5] = 0;

    return this;
  },

  translate: function(x, y) {
    var matrix = this.matrix;

    matrix[4] = matrix[0] * x + matrix[2] * y + matrix[4];
    matrix[5] = matrix[1] * x + matrix[3] * y + matrix[5];

    return this;
  },

  scale: function(x, y) {
    var matrix = this.matrix;

    matrix[0] *= x;
    matrix[1] *= x;
    matrix[2] *= y;
    matrix[3] *= y;

    return this;
  },

  rotate: function(angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    var matrix = this.matrix;

    var a = matrix[0];
    var b = matrix[1];
    var c = matrix[2];
    var d = matrix[3];

    matrix[0] = a * cos + c * sin;
    matrix[1] = b * cos + d * sin;
    matrix[2] = a * -sin + c * cos;
    matrix[3] = b * -sin + d * cos;

    return this;
  },

  multiply: function(rhs, out) {
    var matrix = this.matrix;
    var source = rhs.matrix;

    var localA = matrix[0];
    var localB = matrix[1];
    var localC = matrix[2];
    var localD = matrix[3];
    var localE = matrix[4];
    var localF = matrix[5];

    var sourceA = source[0];
    var sourceB = source[1];
    var sourceC = source[2];
    var sourceD = source[3];
    var sourceE = source[4];
    var sourceF = source[5];

    var destinationMatrix = out === undefined ? this : out;

    destinationMatrix.a = sourceA * localA + sourceB * localC;
    destinationMatrix.b = sourceA * localB + sourceB * localD;
    destinationMatrix.c = sourceC * localA + sourceD * localC;
    destinationMatrix.d = sourceC * localB + sourceD * localD;
    destinationMatrix.e = sourceE * localA + sourceF * localC + localE;
    destinationMatrix.f = sourceE * localB + sourceF * localD + localF;

    return destinationMatrix;
  },

  multiplyWithOffset: function(src, offsetX, offsetY) {
    var matrix = this.matrix;
    var otherMatrix = src.matrix;

    var a0 = matrix[0];
    var b0 = matrix[1];
    var c0 = matrix[2];
    var d0 = matrix[3];
    var tx0 = matrix[4];
    var ty0 = matrix[5];

    var pse = offsetX * a0 + offsetY * c0 + tx0;
    var psf = offsetX * b0 + offsetY * d0 + ty0;

    var a1 = otherMatrix[0];
    var b1 = otherMatrix[1];
    var c1 = otherMatrix[2];
    var d1 = otherMatrix[3];
    var tx1 = otherMatrix[4];
    var ty1 = otherMatrix[5];

    matrix[0] = a1 * a0 + b1 * c0;
    matrix[1] = a1 * b0 + b1 * d0;
    matrix[2] = c1 * a0 + d1 * c0;
    matrix[3] = c1 * b0 + d1 * d0;
    matrix[4] = tx1 * a0 + ty1 * c0 + pse;
    matrix[5] = tx1 * b0 + ty1 * d0 + psf;

    return this;
  },

  transform: function(a, b, c, d, tx, ty) {
    var matrix = this.matrix;

    var a0 = matrix[0];
    var b0 = matrix[1];
    var c0 = matrix[2];
    var d0 = matrix[3];
    var tx0 = matrix[4];
    var ty0 = matrix[5];

    matrix[0] = a * a0 + b * c0;
    matrix[1] = a * b0 + b * d0;
    matrix[2] = c * a0 + d * c0;
    matrix[3] = c * b0 + d * d0;
    matrix[4] = tx * a0 + ty * c0 + tx0;
    matrix[5] = tx * b0 + ty * d0 + ty0;

    return this;
  },

  transformPoint: function(x, y, point) {
    if (point === undefined) {
      point = { x: 0, y: 0 };
    }

    var matrix = this.matrix;

    var a = matrix[0];
    var b = matrix[1];
    var c = matrix[2];
    var d = matrix[3];
    var tx = matrix[4];
    var ty = matrix[5];

    point.x = x * a + y * c + tx;
    point.y = x * b + y * d + ty;

    return point;
  },

  invert: function() {
    var matrix = this.matrix;

    var a = matrix[0];
    var b = matrix[1];
    var c = matrix[2];
    var d = matrix[3];
    var tx = matrix[4];
    var ty = matrix[5];

    var n = a * d - b * c;

    matrix[0] = d / n;
    matrix[1] = -b / n;
    matrix[2] = -c / n;
    matrix[3] = a / n;
    matrix[4] = (c * ty - d * tx) / n;
    matrix[5] = -(a * ty - b * tx) / n;

    return this;
  },

  copyFrom: function(src) {
    var matrix = this.matrix;

    matrix[0] = src.a;
    matrix[1] = src.b;
    matrix[2] = src.c;
    matrix[3] = src.d;
    matrix[4] = src.e;
    matrix[5] = src.f;

    return this;
  },

  copyFromArray: function(src) {
    var matrix = this.matrix;

    matrix[0] = src[0];
    matrix[1] = src[1];
    matrix[2] = src[2];
    matrix[3] = src[3];
    matrix[4] = src[4];
    matrix[5] = src[5];

    return this;
  },

  copyToContext: function(ctx) {
    var matrix = this.matrix;

    ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

    return ctx;
  },

  setToContext: function(ctx) {
    var matrix = this.matrix;

    ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);

    return ctx;
  },

  copyToArray: function(out) {
    var matrix = this.matrix;

    if (out === undefined) {
      out = [matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]];
    } else {
      out[0] = matrix[0];
      out[1] = matrix[1];
      out[2] = matrix[2];
      out[3] = matrix[3];
      out[4] = matrix[4];
      out[5] = matrix[5];
    }

    return out;
  },

  setTransform: function(a, b, c, d, tx, ty) {
    var matrix = this.matrix;

    matrix[0] = a;
    matrix[1] = b;
    matrix[2] = c;
    matrix[3] = d;
    matrix[4] = tx;
    matrix[5] = ty;

    return this;
  },

  decomposeMatrix: function() {
    var decomposedMatrix = this.decomposedMatrix;

    var matrix = this.matrix;

    //  a = scale X (1)
    //  b = shear Y (0)
    //  c = shear X (0)
    //  d = scale Y (1)

    var a = matrix[0];
    var b = matrix[1];
    var c = matrix[2];
    var d = matrix[3];

    var a2 = a * a;
    var b2 = b * b;
    var c2 = c * c;
    var d2 = d * d;

    var sx = Math.sqrt(a2 + c2);
    var sy = Math.sqrt(b2 + d2);

    decomposedMatrix.translateX = matrix[4];
    decomposedMatrix.translateY = matrix[5];

    decomposedMatrix.scaleX = sx;
    decomposedMatrix.scaleY = sy;

    decomposedMatrix.rotation = Math.acos(a / sx) * (Math.atan(-c / a) < 0 ? -1 : 1);

    return decomposedMatrix;
  },

  applyITRS: function(x, y, rotation, scaleX, scaleY) {
    var matrix = this.matrix;

    var radianSin = Math.sin(rotation);
    var radianCos = Math.cos(rotation);

    // Translate
    matrix[4] = x;
    matrix[5] = y;

    // Rotate and Scale
    matrix[0] = radianCos * scaleX;
    matrix[1] = radianSin * scaleX;
    matrix[2] = -radianSin * scaleY;
    matrix[3] = radianCos * scaleY;

    return this;
  },

  applyInverse: function(x, y, output) {
    if (output === undefined) {
      output = new Vector2();
    }

    var matrix = this.matrix;

    var a = matrix[0];
    var b = matrix[1];
    var c = matrix[2];
    var d = matrix[3];
    var tx = matrix[4];
    var ty = matrix[5];

    var id = 1 / (a * d + c * -b);

    output.x = d * id * x + -c * id * y + (ty * c - tx * d) * id;
    output.y = a * id * y + -b * id * x + (-ty * a + tx * b) * id;

    return output;
  },

  getX: function(x, y) {
    return x * this.a + y * this.c + this.e;
  },

  getY: function(x, y) {
    return x * this.b + y * this.d + this.f;
  },

  getCSSMatrix: function() {
    var m = this.matrix;

    return 'matrix(' + m[0] + ',' + m[1] + ',' + m[2] + ',' + m[3] + ',' + m[4] + ',' + m[5] + ')';
  },

  destroy: function() {
    this.matrix = null;
    this.decomposedMatrix = null;
  }
});

module.exports = TransformMatrix;
