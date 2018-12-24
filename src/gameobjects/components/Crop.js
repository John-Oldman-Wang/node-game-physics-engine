var Crop = {
  texture: null,

  frame: null,

  isCropped: false,

  setCrop: function(x, y, width, height) {
    if (x === undefined) {
      this.isCropped = false;
    } else if (this.frame) {
      if (typeof x === 'number') {
        this.frame.setCropUVs(this._crop, x, y, width, height, this.flipX, this.flipY);
      } else {
        var rect = x;

        this.frame.setCropUVs(this._crop, rect.x, rect.y, rect.width, rect.height, this.flipX, this.flipY);
      }

      this.isCropped = true;
    }

    return this;
  },

  resetCropObject: function() {
    return { u0: 0, v0: 0, u1: 0, v1: 0, width: 0, height: 0, x: 0, y: 0, flipX: false, flipY: false, cx: 0, cy: 0, cw: 0, ch: 0 };
  }
};

module.exports = Crop;
