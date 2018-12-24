var Class = require('../../utils/Class');
var GetPoint = require('./GetPoint');
var GetPoints = require('./GetPoints');
var Random = require('./Random');
var Vector2 = require('../../math/Vector2');

var Line = new Class({
  initialize: function Line(x1, y1, x2, y2) {
    if (x1 === undefined) {
      x1 = 0;
    }
    if (y1 === undefined) {
      y1 = 0;
    }
    if (x2 === undefined) {
      x2 = 0;
    }
    if (y2 === undefined) {
      y2 = 0;
    }

    this.x1 = x1;

    this.y1 = y1;

    this.x2 = x2;

    this.y2 = y2;
  },

  getPoint: function(position, output) {
    return GetPoint(this, position, output);
  },

  getPoints: function(quantity, stepRate, output) {
    return GetPoints(this, quantity, stepRate, output);
  },

  getRandomPoint: function(point) {
    return Random(this, point);
  },

  setTo: function(x1, y1, x2, y2) {
    if (x1 === undefined) {
      x1 = 0;
    }
    if (y1 === undefined) {
      y1 = 0;
    }
    if (x2 === undefined) {
      x2 = 0;
    }
    if (y2 === undefined) {
      y2 = 0;
    }

    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;

    return this;
  },

  getPointA: function(vec2) {
    if (vec2 === undefined) {
      vec2 = new Vector2();
    }

    vec2.set(this.x1, this.y1);

    return vec2;
  },

  getPointB: function(vec2) {
    if (vec2 === undefined) {
      vec2 = new Vector2();
    }

    vec2.set(this.x2, this.y2);

    return vec2;
  },

  left: {
    get: function() {
      return Math.min(this.x1, this.x2);
    },

    set: function(value) {
      if (this.x1 <= this.x2) {
        this.x1 = value;
      } else {
        this.x2 = value;
      }
    }
  },

  right: {
    get: function() {
      return Math.max(this.x1, this.x2);
    },

    set: function(value) {
      if (this.x1 > this.x2) {
        this.x1 = value;
      } else {
        this.x2 = value;
      }
    }
  },

  top: {
    get: function() {
      return Math.min(this.y1, this.y2);
    },

    set: function(value) {
      if (this.y1 <= this.y2) {
        this.y1 = value;
      } else {
        this.y2 = value;
      }
    }
  },

  bottom: {
    get: function() {
      return Math.max(this.y1, this.y2);
    },

    set: function(value) {
      if (this.y1 > this.y2) {
        this.y1 = value;
      } else {
        this.y2 = value;
      }
    }
  }
});

module.exports = Line;
