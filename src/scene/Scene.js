var Class = require('../utils/Class');
var Systems = require('./Systems');

var Scene = new Class({
  initialize: function Scene(config) {
    this.sys = new Systems(this, config);

    this.game;

    this.anims;

    this.cache;

    this.registry;

    this.sound;

    this.textures;

    this.events;

    this.cameras;

    this.add;

    this.make;

    this.scene;

    this.children;

    this.lights;

    this.data;

    this.input;

    this.load;

    this.time;

    this.tweens;

    this.physics;

    this.impact;

    this.matter;
  },

  update: function() {}
});

module.exports = Scene;
