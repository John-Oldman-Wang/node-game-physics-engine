var Actions = require('../../actions/');
var Class = require('../../utils/Class');
var GetFastValue = require('../../utils/object/GetFastValue');
var GetValue = require('../../utils/object/GetValue');
var IsPlainObject = require('../../utils/object/IsPlainObject');
var Range = require('../../utils/array/Range');
var Set = require('../../structs/Set');
var Sprite = require('../sprite/Sprite');

var Group = new Class({
  initialize: function Group(scene, children, config) {
    //  They can pass in any of the following as the first argument:

    //  1) A single child
    //  2) An array of children
    //  3) A config object
    //  4) An array of config objects

    //  Or they can pass in a child, or array of children AND a config object

    if (config) {
      //  config has been set, are the children an array?

      if (children && !Array.isArray(children)) {
        children = [children];
      }
    } else if (Array.isArray(children)) {
      //  No config, so let's check the children argument

      if (IsPlainObject(children[0])) {
        //  It's an array of plain config objects
        config = children;
        children = null;
      }
    } else if (IsPlainObject(children)) {
      //  Children isn't an array. Is it a config object though?
      config = children;
      children = null;
    }

    this.scene = scene;

    this.children = new Set(children);

    this.isParent = true;

    this.classType = GetFastValue(config, 'classType', Sprite);

    this.active = GetFastValue(config, 'active', true);

    this.maxSize = GetFastValue(config, 'maxSize', -1);

    this.defaultKey = GetFastValue(config, 'defaultKey', null);

    this.defaultFrame = GetFastValue(config, 'defaultFrame', null);

    this.runChildUpdate = GetFastValue(config, 'runChildUpdate', false);

    this.createCallback = GetFastValue(config, 'createCallback', null);

    this.removeCallback = GetFastValue(config, 'removeCallback', null);

    this.createMultipleCallback = GetFastValue(config, 'createMultipleCallback', null);

    if (config) {
      this.createMultiple(config);
    }
  },

  create: function(x, y, key, frame, visible, active) {
    if (x === undefined) {
      x = 0;
    }
    if (y === undefined) {
      y = 0;
    }
    if (key === undefined) {
      key = this.defaultKey;
    }
    if (frame === undefined) {
      frame = this.defaultFrame;
    }
    if (visible === undefined) {
      visible = true;
    }
    if (active === undefined) {
      active = true;
    }

    //  Pool?
    if (this.isFull()) {
      return null;
    }

    var child = new this.classType(this.scene, x, y, key, frame);

    this.scene.sys.displayList.add(child);

    if (child.preUpdate) {
      this.scene.sys.updateList.add(child);
    }

    child.visible = visible;
    child.setActive(active);

    this.add(child);

    return child;
  },

  createMultiple: function(config) {
    if (this.isFull()) {
      return [];
    }

    if (!Array.isArray(config)) {
      config = [config];
    }

    var output = [];

    if (config[0].key) {
      for (var i = 0; i < config.length; i++) {
        var entries = this.createFromConfig(config[i]);

        output = output.concat(entries);
      }
    }

    return output;
  },

  createFromConfig: function(options) {
    if (this.isFull()) {
      return [];
    }

    this.classType = GetFastValue(options, 'classType', this.classType);

    var key = GetFastValue(options, 'key', undefined);
    var frame = GetFastValue(options, 'frame', null);
    var visible = GetFastValue(options, 'visible', true);
    var active = GetFastValue(options, 'active', true);

    var entries = [];

    //  Can't do anything without at least a key
    if (key === undefined) {
      return entries;
    } else {
      if (!Array.isArray(key)) {
        key = [key];
      }

      if (!Array.isArray(frame)) {
        frame = [frame];
      }
    }

    //  Build an array of key frame pairs to loop through

    var repeat = GetFastValue(options, 'repeat', 0);
    var randomKey = GetFastValue(options, 'randomKey', false);
    var randomFrame = GetFastValue(options, 'randomFrame', false);
    var yoyo = GetFastValue(options, 'yoyo', false);
    var quantity = GetFastValue(options, 'frameQuantity', 1);
    var max = GetFastValue(options, 'max', 0);

    //  If a grid is set we use that to override the quantity?

    var range = Range(key, frame, {
      max: max,
      qty: quantity,
      random: randomKey,
      randomB: randomFrame,
      repeat: repeat,
      yoyo: yoyo
    });

    for (var c = 0; c < range.length; c++) {
      var created = this.create(0, 0, range[c].a, range[c].b, visible, active);

      if (!created) {
        break;
      }

      entries.push(created);
    }

    //  Post-creation options (applied only to those items created in this call):

    var x = GetValue(options, 'setXY.x', 0);
    var y = GetValue(options, 'setXY.y', 0);
    var stepX = GetValue(options, 'setXY.stepX', 0);
    var stepY = GetValue(options, 'setXY.stepY', 0);

    Actions.SetXY(entries, x, y, stepX, stepY);

    var rotation = GetValue(options, 'setRotation.value', 0);
    var stepRotation = GetValue(options, 'setRotation.step', 0);

    Actions.SetRotation(entries, rotation, stepRotation);

    var scaleX = GetValue(options, 'setScale.x', 1);
    var scaleY = GetValue(options, 'setScale.y', scaleX);
    var stepScaleX = GetValue(options, 'setScale.stepX', 0);
    var stepScaleY = GetValue(options, 'setScale.stepY', 0);

    Actions.SetScale(entries, scaleX, scaleY, stepScaleX, stepScaleY);

    var alpha = GetValue(options, 'setAlpha.value', 1);
    var stepAlpha = GetValue(options, 'setAlpha.step', 0);

    Actions.SetAlpha(entries, alpha, stepAlpha);

    var hitArea = GetFastValue(options, 'hitArea', null);
    var hitAreaCallback = GetFastValue(options, 'hitAreaCallback', null);

    if (hitArea) {
      Actions.SetHitArea(entries, hitArea, hitAreaCallback);
    }

    var grid = GetFastValue(options, 'gridAlign', false);

    if (grid) {
      Actions.GridAlign(entries, grid);
    }

    if (this.createMultipleCallback) {
      this.createMultipleCallback.call(this, entries);
    }

    return entries;
  },

  preUpdate: function(time, delta) {
    if (!this.runChildUpdate || this.children.size === 0) {
      return;
    }

    //  Because a Group child may mess with the length of the Group during its update
    var temp = this.children.entries.slice();

    for (var i = 0; i < temp.length; i++) {
      var item = temp[i];

      if (item.active) {
        item.update(time, delta);
      }
    }
  },

  add: function(child, addToScene) {
    if (addToScene === undefined) {
      addToScene = false;
    }

    if (this.isFull()) {
      return this;
    }

    this.children.set(child);

    if (this.createCallback) {
      this.createCallback.call(this, child);
    }

    if (addToScene) {
      this.scene.sys.displayList.add(child);

      if (child.preUpdate) {
        this.scene.sys.updateList.add(child);
      }
    }

    child.on('destroy', this.remove, this);

    return this;
  },

  addMultiple: function(children, addToScene) {
    if (addToScene === undefined) {
      addToScene = false;
    }

    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        this.add(children[i], addToScene);
      }
    }

    return this;
  },

  remove: function(child, removeFromScene, destroyChild) {
    if (removeFromScene === undefined) {
      removeFromScene = false;
    }
    if (destroyChild === undefined) {
      destroyChild = false;
    }

    if (!this.children.contains(child)) {
      return this;
    }

    this.children.delete(child);

    if (this.removeCallback) {
      this.removeCallback.call(this, child);
    }

    child.off('destroy', this.remove, this);

    if (destroyChild) {
      child.destroy();
    } else if (removeFromScene) {
      child.scene.sys.displayList.remove(child);

      if (child.preUpdate) {
        child.scene.sys.updateList.remove(child);
      }
    }

    return this;
  },

  clear: function(removeFromScene, destroyChild) {
    if (removeFromScene === undefined) {
      removeFromScene = false;
    }
    if (destroyChild === undefined) {
      destroyChild = false;
    }

    var children = this.children;

    for (var i = 0; i < children.size; i++) {
      var gameObject = children.entries[i];

      gameObject.off('destroy', this.remove, this);

      if (destroyChild) {
        gameObject.destroy();
      } else if (removeFromScene) {
        gameObject.scene.sys.displayList.remove(gameObject);

        if (gameObject.preUpdate) {
          gameObject.scene.sys.updateList.remove(gameObject);
        }
      }
    }

    this.children.clear();

    return this;
  },

  contains: function(child) {
    return this.children.contains(child);
  },

  getChildren: function() {
    return this.children.entries;
  },

  getLength: function() {
    return this.children.size;
  },

  getFirst: function(state, createIfNull, x, y, key, frame, visible) {
    return this.getHandler(true, 1, state, createIfNull, x, y, key, frame, visible);
  },

  getFirstNth: function(nth, state, createIfNull, x, y, key, frame, visible) {
    return this.getHandler(true, nth, state, createIfNull, x, y, key, frame, visible);
  },

  getLast: function(state, createIfNull, x, y, key, frame, visible) {
    return this.getHandler(false, 1, state, createIfNull, x, y, key, frame, visible);
  },

  getLastNth: function(nth, state, createIfNull, x, y, key, frame, visible) {
    return this.getHandler(false, nth, state, createIfNull, x, y, key, frame, visible);
  },

  getHandler: function(forwards, nth, state, createIfNull, x, y, key, frame, visible) {
    if (state === undefined) {
      state = false;
    }
    if (createIfNull === undefined) {
      createIfNull = false;
    }

    var gameObject;

    var i;
    var total = 0;
    var children = this.children.entries;

    if (forwards) {
      for (i = 0; i < children.length; i++) {
        gameObject = children[i];

        if (gameObject.active === state) {
          total++;

          if (total === nth) {
            break;
          }
        } else {
          gameObject = null;
        }
      }
    } else {
      for (i = children.length - 1; i >= 0; i--) {
        gameObject = children[i];

        if (gameObject.active === state) {
          total++;

          if (total === nth) {
            break;
          }
        } else {
          gameObject = null;
        }
      }
    }

    if (gameObject) {
      if (typeof x === 'number') {
        gameObject.x = x;
      }

      if (typeof y === 'number') {
        gameObject.y = y;
      }

      return gameObject;
    }

    //  Got this far? We need to create or bail
    if (createIfNull) {
      return this.create(x, y, key, frame, visible);
    } else {
      return null;
    }
  },

  get: function(x, y, key, frame, visible) {
    return this.getFirst(false, true, x, y, key, frame, visible);
  },

  getFirstAlive: function(createIfNull, x, y, key, frame, visible) {
    return this.getFirst(true, createIfNull, x, y, key, frame, visible);
  },

  getFirstDead: function(createIfNull, x, y, key, frame, visible) {
    return this.getFirst(false, createIfNull, x, y, key, frame, visible);
  },

  playAnimation: function(key, startFrame) {
    Actions.PlayAnimation(this.children.entries, key, startFrame);

    return this;
  },

  isFull: function() {
    if (this.maxSize === -1) {
      return false;
    } else {
      return this.children.size >= this.maxSize;
    }
  },

  countActive: function(value) {
    if (value === undefined) {
      value = true;
    }

    var total = 0;

    for (var i = 0; i < this.children.size; i++) {
      if (this.children.entries[i].active === value) {
        total++;
      }
    }

    return total;
  },

  getTotalUsed: function() {
    return this.countActive();
  },

  getTotalFree: function() {
    var used = this.getTotalUsed();
    var capacity = this.maxSize === -1 ? 999999999999 : this.maxSize;

    return capacity - used;
  },

  setDepth: function(value, step) {
    Actions.SetDepth(this.children.entries, value, step);

    return this;
  },

  kill: function(gameObject) {
    if (this.children.contains(gameObject)) {
      gameObject.setActive(false);
    }
  },

  killAndHide: function(gameObject) {
    if (this.children.contains(gameObject)) {
      gameObject.setActive(false);
      gameObject.setVisible(false);
    }
  },

  toggleVisible: function() {
    Actions.ToggleVisible(this.children.entries);

    return this;
  },

  destroy: function(destroyChildren) {
    if (destroyChildren === undefined) {
      destroyChildren = false;
    }

    //  This Game Object had already been destroyed
    if (!this.scene || this.ignoreDestroy) {
      return;
    }

    if (destroyChildren) {
      var children = this.children;

      for (var i = 0; i < children.size; i++) {
        var gameObject = children.entries[i];

        //  Remove the event hook first or it'll go all recursive hell on us
        gameObject.off('destroy', this.remove, this);

        gameObject.destroy();
      }
    }

    this.children.clear();

    this.scene = undefined;
    this.children = undefined;
  }
});

module.exports = Group;
