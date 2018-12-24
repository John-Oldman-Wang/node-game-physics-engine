var Velocity = {
  setVelocity: function(x, y) {
    this.body.setVelocity(x, y);

    return this;
  },

  setVelocityX: function(x) {
    this.body.setVelocityX(x);

    return this;
  },

  setVelocityY: function(y) {
    this.body.setVelocityY(y);

    return this;
  },

  setMaxVelocity: function(x, y) {
    this.body.maxVelocity.set(x, y);

    return this;
  }
};

module.exports = Velocity;
