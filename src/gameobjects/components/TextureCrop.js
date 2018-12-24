var _FLAG = 8; // 1000

var TextureCrop = {
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

  setTexture: function(key, frame) {
    return this;
    this.texture = this.scene.sys.textures.get(key);

    return this.setFrame(frame);
  },

  setFrame: function(frame, updateSize, updateOrigin) {
    if (updateSize === undefined) {
      updateSize = true;
    }
    if (updateOrigin === undefined) {
      updateOrigin = true;
    }

    this.frame = this.texture.get(frame);

    if (!this.frame.cutWidth || !this.frame.cutHeight) {
      this.renderFlags &= ~_FLAG;
    } else {
      this.renderFlags |= _FLAG;
    }

    if (this._sizeComponent && updateSize) {
      this.setSizeToFrame();
    }

    if (this._originComponent && updateOrigin) {
      if (this.frame.customPivot) {
        this.setOrigin(this.frame.pivotX, this.frame.pivotY);
      } else {
        this.updateDisplayOrigin();
      }
    }

    if (this.isCropped) {
      this.frame.updateCropUVs(this._crop, this.flipX, this.flipY);
    }

    return this;
  },

  resetCropObject: function() {
    return {
      u0: 0,
      v0: 0,
      u1: 0,
      v1: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      cx: 0,
      cy: 0,
      cw: 0,
      ch: 0
    };
  }
};

module.exports = TextureCrop;
