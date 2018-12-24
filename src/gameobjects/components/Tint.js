var GetColor = function(value) {
  return (value >> 16) + (value & 0xff00) + ((value & 0xff) << 16);
};

var Tint = {
  _tintTL: 16777215,

  _tintTR: 16777215,

  _tintBL: 16777215,

  _tintBR: 16777215,

  _isTinted: false,

  tintFill: false,

  clearTint: function() {
    this.setTint(0xffffff);

    this._isTinted = false;

    return this;
  },

  setTint: function(topLeft, topRight, bottomLeft, bottomRight) {
    if (topLeft === undefined) {
      topLeft = 0xffffff;
    }

    if (topRight === undefined) {
      topRight = topLeft;
      bottomLeft = topLeft;
      bottomRight = topLeft;
    }

    this._tintTL = GetColor(topLeft);
    this._tintTR = GetColor(topRight);
    this._tintBL = GetColor(bottomLeft);
    this._tintBR = GetColor(bottomRight);

    this._isTinted = true;

    this.tintFill = false;

    return this;
  },

  setTintFill: function(topLeft, topRight, bottomLeft, bottomRight) {
    this.setTint(topLeft, topRight, bottomLeft, bottomRight);

    this.tintFill = true;

    return this;
  },

  tintTopLeft: {
    get: function() {
      return this._tintTL;
    },

    set: function(value) {
      this._tintTL = GetColor(value);
      this._isTinted = true;
    }
  },

  tintTopRight: {
    get: function() {
      return this._tintTR;
    },

    set: function(value) {
      this._tintTR = GetColor(value);
      this._isTinted = true;
    }
  },

  tintBottomLeft: {
    get: function() {
      return this._tintBL;
    },

    set: function(value) {
      this._tintBL = GetColor(value);
      this._isTinted = true;
    }
  },

  tintBottomRight: {
    get: function() {
      return this._tintBR;
    },

    set: function(value) {
      this._tintBR = GetColor(value);
      this._isTinted = true;
    }
  },

  tint: {
    set: function(value) {
      this.setTint(value, value, value, value);
    }
  },

  isTinted: {
    get: function() {
      return this._isTinted;
    }
  }
};

module.exports = Tint;
