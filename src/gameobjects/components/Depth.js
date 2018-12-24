var Depth = {
  _depth: 0,

  depth: {
    get: function() {
      return this._depth;
    },

    set: function(value) {
      this.scene.sys.queueDepthSort();
      this._depth = value;
    }
  },
  setDepth: function(value) {
    if (value === undefined) {
      value = 0;
    }

    this.depth = value;

    return this;
  }
};

module.exports = Depth;
