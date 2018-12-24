var Class = require('../../utils/Class');
var Contains = require('./Contains');
var GetPoint = require('./GetPoint');
var GetPoints = require('./GetPoints');
var Random = require('./Random');

var Circle = new Class({
  initialize: function Circle(x, y, radius) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (radius === undefined) {
      radius = 0;
    }

    this.x = x;

    this.y = y;

    this._radius = radius;

    this._diameter = radius * 2;
  },

  contains: function(x, y) {
    return Contains(this, x, y);
  },

  getPoint: function(position, point) {
    return GetPoint(this, position, point);
  },

  getPoints: function(quantity, stepRate, output) {
    return GetPoints(this, quantity, stepRate, output);
  },

  getRandomPoint: function(point) {
    return Random(this, point);
  },

  setTo: function(x, y, radius) {
    this.x = x;
    this.y = y;
    this._radius = radius;
    this._diameter = radius * 2;

    return this;
  },

  setEmpty: function() {
    this._radius = 0;
    this._diameter = 0;

    return this;
  },

  setPosition: function(x, y) {
    if (y === undefined) {
      y = x;
    }

    this.x = x;
    this.y = y;

    return this;
  },

  isEmpty: function() {
    return this._radius <= 0;
  },

  radius: {
    get: function() {
      return this._radius;
    },

    set: function(value) {
      this._radius = value;
      this._diameter = value * 2;
    }
  },

  diameter: {
    get: function() {
      return this._diameter;
    },

    set: function(value) {
      this._diameter = value;
      this._radius = value * 0.5;
    }
  },

  left: {
    get: function() {
      return this.x - this._radius;
    },

    set: function(value) {
      this.x = value + this._radius;
    }
  },

  right: {
    get: function() {
      return this.x + this._radius;
    },

    set: function(value) {
      this.x = value - this._radius;
    }
  },

  top: {
    get: function() {
      return this.y - this._radius;
    },

    set: function(value) {
      this.y = value + this._radius;
    }
  },

  bottom: {
    get: function() {
      return this.y + this._radius;
    },

    set: function(value) {
      this.y = value - this._radius;
    }
  }
});

module.exports = Circle;
