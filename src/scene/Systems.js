var Class = require('../utils/Class');
var CONST = require('./const');
var DefaultPlugins = require('../plugins/DefaultPlugins');
var GetPhysicsPlugins = require('./GetPhysicsPlugins');
var GetScenePlugins = require('./GetScenePlugins');
var NOOP = require('../utils/NOOP');
var Settings = require('./Settings');

var Systems = new Class({
  initialize: function Systems(scene, config) {
    this.scene = scene;

    this.game;

    if (typeof PLUGIN_FBINSTANT) {
      this.facebook;
    }

    this.config = config;

    this.settings = Settings.create(config);

    this.canvas;

    this.context;

    //  Global Systems - these are single-instance global managers that belong to Game

    this.anims;

    this.cache;

    this.plugins;

    this.registry;

    this.sound;

    this.textures;

    //  Core Plugins - these are non-optional Scene plugins, needed by lots of the other systems

    this.add;

    this.cameras;

    this.displayList;

    this.events;

    this.make;

    this.scenePlugin;

    this.updateList;

    this.sceneUpdate = NOOP;
  },

  init: function(game) {
    this.settings.status = CONST.INIT;

    //  This will get replaced by the SceneManager with the actual update function, if it exists, once create is over.
    this.sceneUpdate = NOOP;

    this.game = game;

    this.canvas = game.canvas;
    this.context = game.context;

    var pluginManager = game.plugins;

    this.plugins = pluginManager;

    pluginManager.addToScene(this, DefaultPlugins.Global, [DefaultPlugins.CoreScene, GetScenePlugins(this), GetPhysicsPlugins(this)]);

    this.events.emit('boot', this);

    this.settings.isBooted = true;
  },

  install: function(plugin) {
    if (!Array.isArray(plugin)) {
      plugin = [plugin];
    }

    this.plugins.installLocal(this, plugin);
  },

  step: function(time, delta) {
    this.events.emit('preupdate', time, delta);

    this.events.emit('update', time, delta);

    this.sceneUpdate.call(this.scene, time, delta);

    this.events.emit('postupdate', time, delta);
  },

  render: function(renderer) {
    var displayList = this.displayList;

    displayList.depthSort();

    this.cameras.render(renderer, displayList);

    this.events.emit('render', renderer);
  },

  queueDepthSort: function() {
    this.displayList.queueDepthSort();
  },

  depthSort: function() {
    this.displayList.depthSort();
  },

  pause: function(data) {
    if (this.settings.active) {
      this.settings.status = CONST.PAUSED;

      this.settings.active = false;

      this.events.emit('pause', this, data);
    }

    return this;
  },

  resume: function(data) {
    if (!this.settings.active) {
      this.settings.status = CONST.RUNNING;

      this.settings.active = true;

      this.events.emit('resume', this, data);
    }

    return this;
  },

  sleep: function(data) {
    this.settings.status = CONST.SLEEPING;

    this.settings.active = false;
    this.settings.visible = false;

    this.events.emit('sleep', this, data);

    return this;
  },

  wake: function(data) {
    var settings = this.settings;

    settings.status = CONST.RUNNING;

    settings.active = true;
    settings.visible = true;

    this.events.emit('wake', this, data);

    if (settings.isTransition) {
      this.events.emit('transitionwake', settings.transitionFrom, settings.transitionDuration);
    }

    return this;
  },

  isSleeping: function() {
    return this.settings.status === CONST.SLEEPING;
  },

  isActive: function() {
    return this.settings.status === CONST.RUNNING;
  },

  isPaused: function() {
    return this.settings.status === CONST.PAUSED;
  },

  isTransitioning: function() {
    return this.settings.isTransition || this.scenePlugin._target !== null;
  },

  isTransitionOut: function() {
    return this.scenePlugin._target !== null && this.scenePlugin._duration > 0;
  },

  isTransitionIn: function() {
    return this.settings.isTransition;
  },

  isVisible: function() {
    return this.settings.visible;
  },

  setVisible: function(value) {
    this.settings.visible = value;

    return this;
  },

  setActive: function(value, data) {
    if (value) {
      return this.resume(data);
    } else {
      return this.pause(data);
    }
  },

  start: function(data) {
    if (data) {
      this.settings.data = data;
    }

    this.settings.status = CONST.START;

    this.settings.active = true;
    this.settings.visible = true;

    //  For plugins to listen out for
    this.events.emit('start', this);

    //  For user-land code to listen out for
    this.events.emit('ready', this, data);
  },

  resize: function(width, height) {
    this.events.emit('resize', width, height);
  },

  shutdown: function(data) {
    this.events.off('transitioninit');
    this.events.off('transitionstart');
    this.events.off('transitioncomplete');
    this.events.off('transitionout');

    this.settings.status = CONST.SHUTDOWN;

    this.settings.active = false;
    this.settings.visible = false;

    this.events.emit('shutdown', this, data);
  },

  destroy: function() {
    this.settings.status = CONST.DESTROYED;

    this.settings.active = false;
    this.settings.visible = false;

    this.events.emit('destroy', this);

    this.events.removeAllListeners();

    var props = [
      'scene',
      'game',
      'anims',
      'cache',
      'plugins',
      'registry',
      'sound',
      'textures',
      'add',
      'camera',
      'displayList',
      'events',
      'make',
      'scenePlugin',
      'updateList'
    ];

    for (var i = 0; i < props.length; i++) {
      this[props[i]] = null;
    }
  }
});

module.exports = Systems;
