var Origin = {
  _originComponent: true,

  originX: 0.5,

  originY: 0.5,

  //  private + read only
  _displayOriginX: 0,
  _displayOriginY: 0,

  displayOriginX: {
    get: function() {
      return this._displayOriginX;
    },

    set: function(value) {
      this._displayOriginX = value;
      this.originX = value / this.width;
    }
  },

  displayOriginY: {
    get: function() {
      return this._displayOriginY;
    },

    set: function(value) {
      this._displayOriginY = value;
      this.originY = value / this.height;
    }
  },

  setOrigin: function(x, y) {
    if (x === undefined) {
      x = 0.5;
    }
    if (y === undefined) {
      y = x;
    }

    this.originX = x;
    this.originY = y;

    return this.updateDisplayOrigin();
  },

  setOriginFromFrame: function() {
    if (!this.frame || !this.frame.customPivot) {
      return this.setOrigin();
    } else {
      this.originX = this.frame.pivotX;
      this.originY = this.frame.pivotY;
    }

    return this.updateDisplayOrigin();
  },

  setDisplayOrigin: function(x, y) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = x;
    }

    this.displayOriginX = x;
    this.displayOriginY = y;

    return this;
  },

  updateDisplayOrigin: function() {
    this._displayOriginX = Math.round(this.originX * this.width);
    this._displayOriginY = Math.round(this.originY * this.height);

    return this;
  }
};

module.exports = Origin;
