var Rectangle = require('../../geom/rectangle/Rectangle');
var RotateAround = require('../../math/RotateAround');
var Vector2 = require('../../math/Vector2');

var GetBounds = {
  getCenter: function(output) {
    if (output === undefined) {
      output = new Vector2();
    }

    output.x = this.x - this.displayWidth * this.originX + this.displayWidth / 2;
    output.y = this.y - this.displayHeight * this.originY + this.displayHeight / 2;

    return output;
  },

  getTopLeft: function(output, includeParent) {
    if (!output) {
      output = new Vector2();
    }
    if (includeParent === undefined) {
      includeParent = false;
    }

    output.x = this.x - this.displayWidth * this.originX;
    output.y = this.y - this.displayHeight * this.originY;

    if (this.rotation !== 0) {
      RotateAround(output, this.x, this.y, this.rotation);
    }

    if (includeParent && this.parentContainer) {
      var parentMatrix = this.parentContainer.getBoundsTransformMatrix();

      parentMatrix.transformPoint(output.x, output.y, output);
    }

    return output;
  },

  getTopRight: function(output, includeParent) {
    if (!output) {
      output = new Vector2();
    }
    if (includeParent === undefined) {
      includeParent = false;
    }

    output.x = this.x - this.displayWidth * this.originX + this.displayWidth;
    output.y = this.y - this.displayHeight * this.originY;

    if (this.rotation !== 0) {
      RotateAround(output, this.x, this.y, this.rotation);
    }

    if (includeParent && this.parentContainer) {
      var parentMatrix = this.parentContainer.getBoundsTransformMatrix();

      parentMatrix.transformPoint(output.x, output.y, output);
    }

    return output;
  },

  getBottomLeft: function(output, includeParent) {
    if (!output) {
      output = new Vector2();
    }
    if (includeParent === undefined) {
      includeParent = false;
    }

    output.x = this.x - this.displayWidth * this.originX;
    output.y = this.y - this.displayHeight * this.originY + this.displayHeight;

    if (this.rotation !== 0) {
      RotateAround(output, this.x, this.y, this.rotation);
    }

    if (includeParent && this.parentContainer) {
      var parentMatrix = this.parentContainer.getBoundsTransformMatrix();

      parentMatrix.transformPoint(output.x, output.y, output);
    }

    return output;
  },

  getBottomRight: function(output, includeParent) {
    if (!output) {
      output = new Vector2();
    }
    if (includeParent === undefined) {
      includeParent = false;
    }

    output.x = this.x - this.displayWidth * this.originX + this.displayWidth;
    output.y = this.y - this.displayHeight * this.originY + this.displayHeight;

    if (this.rotation !== 0) {
      RotateAround(output, this.x, this.y, this.rotation);
    }

    if (includeParent && this.parentContainer) {
      var parentMatrix = this.parentContainer.getBoundsTransformMatrix();

      parentMatrix.transformPoint(output.x, output.y, output);
    }

    return output;
  },

  getBounds: function(output) {
    if (output === undefined) {
      output = new Rectangle();
    }

    //  We can use the output object to temporarily store the x/y coords in:

    var TLx, TLy, TRx, TRy, BLx, BLy, BRx, BRy;

    // Instead of doing a check if parent container is
    // defined per corner we only do it once.
    if (this.parentContainer) {
      var parentMatrix = this.parentContainer.getBoundsTransformMatrix();

      this.getTopLeft(output);
      parentMatrix.transformPoint(output.x, output.y, output);

      TLx = output.x;
      TLy = output.y;

      this.getTopRight(output);
      parentMatrix.transformPoint(output.x, output.y, output);

      TRx = output.x;
      TRy = output.y;

      this.getBottomLeft(output);
      parentMatrix.transformPoint(output.x, output.y, output);

      BLx = output.x;
      BLy = output.y;

      this.getBottomRight(output);
      parentMatrix.transformPoint(output.x, output.y, output);

      BRx = output.x;
      BRy = output.y;
    } else {
      this.getTopLeft(output);

      TLx = output.x;
      TLy = output.y;

      this.getTopRight(output);

      TRx = output.x;
      TRy = output.y;

      this.getBottomLeft(output);

      BLx = output.x;
      BLy = output.y;

      this.getBottomRight(output);

      BRx = output.x;
      BRy = output.y;
    }

    output.x = Math.min(TLx, TRx, BLx, BRx);
    output.y = Math.min(TLy, TRy, BLy, BRy);
    output.width = Math.max(TLx, TRx, BLx, BRx) - output.x;
    output.height = Math.max(TLy, TRy, BLy, BRy) - output.y;

    return output;
  }
};

module.exports = GetBounds;
