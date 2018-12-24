var Size = {
  _sizeComponent: true,

  width: 0,

  height: 0,

  displayWidth: {
    get: function() {
      return this.scaleX * this.frame.realWidth;
    },

    set: function(value) {
      this.scaleX = value / this.frame.realWidth;
    }
  },

  displayHeight: {
    get: function() {
      return this.scaleY * this.frame.realHeight;
    },

    set: function(value) {
      this.scaleY = value / this.frame.realHeight;
    }
  },

  setSizeToFrame: function(frame) {
    if (frame === undefined) {
      frame = this.frame;
    }

    this.width = frame.realWidth;
    this.height = frame.realHeight;

    return this;
  },

  setSize: function(width, height) {
    this.width = width;
    this.height = height;

    return this;
  },

  setDisplaySize: function(width, height) {
    this.displayWidth = width;
    this.displayHeight = height;

    return this;
  }
};

module.exports = Size;
