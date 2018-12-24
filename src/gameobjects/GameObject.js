var Class = require('../utils/Class');
var ComponentsToJSON = require('./components/ToJSON');
var DataManager = require('../data/DataManager');
var EventEmitter = require('eventemitter3');

var GameObject = new Class({
  Extends: EventEmitter,

  initialize: function GameObject(scene, type) {
    EventEmitter.call(this);

    this.scene = scene;

    this.type = type;

    this.parentContainer = null;

    this.name = '';

    this.active = true;

    this.tabIndex = -1;

    this.data = null;

    this.renderFlags = 15;

    this.cameraFilter = 0;

    this.input = null;

    this.body = null;

    this.ignoreDestroy = false;

    //  Tell the Scene to re-sort the children
    // scene.sys.queueDepthSort();
  },

  setActive: function(value) {
    this.active = value;

    return this;
  },

  setName: function(value) {
    this.name = value;

    return this;
  },

  setDataEnabled: function() {
    if (!this.data) {
      this.data = new DataManager(this);
    }

    return this;
  },

  setData: function(key, value) {
    if (!this.data) {
      this.data = new DataManager(this);
    }

    this.data.set(key, value);

    return this;
  },

  getData: function(key) {
    if (!this.data) {
      this.data = new DataManager(this);
    }

    return this.data.get(key);
  },

  setInteractive: function(shape, callback, dropZone) {
    this.scene.sys.input.enable(this, shape, callback, dropZone);

    return this;
  },

  disableInteractive: function() {
    if (this.input) {
      this.input.enabled = false;
    }

    return this;
  },

  removeInteractive: function() {
    this.scene.sys.input.clear(this);

    this.input = undefined;

    return this;
  },

  update: function() {},

  toJSON: function() {
    return ComponentsToJSON(this);
  },

  willRender: function(camera) {
    return !(GameObject.RENDER_MASK !== this.renderFlags || (this.cameraFilter > 0 && this.cameraFilter & camera.id));
  },

  getIndexList: function() {
    // eslint-disable-next-line consistent-this
    var child = this;
    var parent = this.parentContainer;

    var indexes = [];

    while (parent) {
      // indexes.unshift([parent.getIndex(child), parent.name]);
      indexes.unshift(parent.getIndex(child));

      child = parent;

      if (!parent.parentContainer) {
        break;
      } else {
        parent = parent.parentContainer;
      }
    }

    // indexes.unshift([this.scene.sys.displayList.getIndex(child), 'root']);
    indexes.unshift(this.scene.sys.displayList.getIndex(child));

    return indexes;
  },

  destroy: function(fromScene) {
    if (fromScene === undefined) {
      fromScene = false;
    }

    //  This Game Object has already been destroyed
    if (!this.scene || this.ignoreDestroy) {
      return;
    }

    if (this.preDestroy) {
      this.preDestroy.call(this);
    }

    this.emit('destroy', this);

    var sys = this.scene.sys;

    if (!fromScene) {
      sys.displayList.remove(this);
      sys.updateList.remove(this);
    }

    if (this.input) {
      sys.input.clear(this);
      this.input = undefined;
    }

    if (this.data) {
      this.data.destroy();

      this.data = undefined;
    }

    if (this.body) {
      this.body.destroy();
      this.body = undefined;
    }

    //  Tell the Scene to re-sort the children
    if (!fromScene) {
      sys.queueDepthSort();
    }

    this.active = false;
    this.visible = false;

    this.scene = undefined;

    this.parentContainer = undefined;

    this.removeAllListeners();
  }
});

GameObject.RENDER_MASK = 15;

module.exports = GameObject;
