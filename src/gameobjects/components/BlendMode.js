var BlendModes = require('../../renderer/BlendModes');

var BlendMode = {
  _blendMode: BlendModes.NORMAL,

  blendMode: {
    get: function() {
      return this._blendMode;
    },

    set: function(value) {
      if (typeof value === 'string') {
        value = BlendModes[value];
      }

      value |= 0;

      if (value >= -1) {
        this._blendMode = value;
      }
    }
  },

  setBlendMode: function(value) {
    this.blendMode = value;

    return this;
  }
};

module.exports = BlendMode;
