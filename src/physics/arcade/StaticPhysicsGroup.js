var ArcadeSprite = require('./ArcadeSprite');
var Class = require('../../utils/Class');
var CONST = require('./const');
var Group = require('../../gameobjects/group/Group');
var IsPlainObject = require('../../utils/object/IsPlainObject');

var StaticPhysicsGroup = new Class({
  Extends: Group,

  initialize: function StaticPhysicsGroup(world, scene, children, config) {
    if (!children && !config) {
      config = {
        createCallback: this.createCallbackHandler,
        removeCallback: this.removeCallbackHandler,
        createMultipleCallback: this.createMultipleCallbackHandler,
        classType: ArcadeSprite
      };
    } else if (IsPlainObject(children)) {
      //  children is a plain object, so swizzle them:
      config = children;
      children = null;

      config.createCallback = this.createCallbackHandler;
      config.removeCallback = this.removeCallbackHandler;
      config.createMultipleCallback = this.createMultipleCallbackHandler;
      config.classType = ArcadeSprite;
    } else if (Array.isArray(children) && IsPlainObject(children[0])) {
      //  children is an array of plain objects
      config = children;
      children = null;

      config.forEach(function(singleConfig) {
        singleConfig.createCallback = this.createCallbackHandler;
        singleConfig.removeCallback = this.removeCallbackHandler;
        singleConfig.createMultipleCallback = this.createMultipleCallbackHandler;
        singleConfig.classType = ArcadeSprite;
      });
    }

    this.world = world;

    this.physicsType = CONST.STATIC_BODY;

    Group.call(this, scene, children, config);
  },

  createCallbackHandler: function(child) {
    if (!child.body) {
      this.world.enableBody(child, CONST.STATIC_BODY);
    }
  },

  removeCallbackHandler: function(child) {
    if (child.body) {
      this.world.disableBody(child);
    }
  },

  createMultipleCallbackHandler: function() {
    this.refresh();
  },

  refresh: function() {
    var children = this.children.entries;

    for (var i = 0; i < children.length; i++) {
      children[i].body.reset();
    }

    return this;
  }
});

module.exports = StaticPhysicsGroup;
