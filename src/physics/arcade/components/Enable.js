var Enable = {
  enableBody: function(reset, x, y, enableGameObject, showGameObject) {
    if (reset) {
      this.body.reset(x, y);
    }

    if (enableGameObject) {
      this.body.gameObject.active = true;
    }

    if (showGameObject) {
      this.body.gameObject.visible = true;
    }

    this.body.enable = true;

    return this;
  },

  disableBody: function(disableGameObject, hideGameObject) {
    if (disableGameObject === undefined) {
      disableGameObject = false;
    }
    if (hideGameObject === undefined) {
      hideGameObject = false;
    }

    this.body.stop();

    this.body.enable = false;

    if (disableGameObject) {
      this.body.gameObject.active = false;
    }

    if (hideGameObject) {
      this.body.gameObject.visible = false;
    }

    return this;
  },

  refreshBody: function() {
    this.body.updateFromGameObject();

    return this;
  }
};

module.exports = Enable;
