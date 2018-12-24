var ArcadeSprite = require('./ArcadeSprite');
var Class = require('../../utils/Class');
var CONST = require('./const');
var GetFastValue = require('../../utils/object/GetFastValue');
var Group = require('../../gameobjects/group/Group');
var IsPlainObject = require('../../utils/object/IsPlainObject');

var PhysicsGroup = new Class({
  Extends: Group,

  initialize: function PhysicsGroup(world, scene, children, config) {
    if (!children && !config) {
      config = {
        createCallback: this.createCallbackHandler,
        removeCallback: this.removeCallbackHandler
      };
    } else if (IsPlainObject(children)) {
      //  children is a plain object, so swizzle them:
      config = children;
      children = null;

      config.createCallback = this.createCallbackHandler;
      config.removeCallback = this.removeCallbackHandler;
    } else if (Array.isArray(children) && IsPlainObject(children[0])) {
      //  children is an array of plain objects
      config = children;
      children = null;

      config.forEach(function(singleConfig) {
        singleConfig.createCallback = this.createCallbackHandler;
        singleConfig.removeCallback = this.removeCallbackHandler;
      });
    }

    this.world = world;

    config.classType = GetFastValue(config, 'classType', ArcadeSprite);

    this.physicsType = CONST.DYNAMIC_BODY;

    this.defaults = {
      setCollideWorldBounds: GetFastValue(config, 'collideWorldBounds', false),
      setAccelerationX: GetFastValue(config, 'accelerationX', 0),
      setAccelerationY: GetFastValue(config, 'accelerationY', 0),
      setAllowDrag: GetFastValue(config, 'allowDrag', true),
      setAllowGravity: GetFastValue(config, 'allowGravity', true),
      setAllowRotation: GetFastValue(config, 'allowRotation', true),
      setBounceX: GetFastValue(config, 'bounceX', 0),
      setBounceY: GetFastValue(config, 'bounceY', 0),
      setDragX: GetFastValue(config, 'dragX', 0),
      setDragY: GetFastValue(config, 'dragY', 0),
      setEnable: GetFastValue(config, 'enable', true),
      setGravityX: GetFastValue(config, 'gravityX', 0),
      setGravityY: GetFastValue(config, 'gravityY', 0),
      setFrictionX: GetFastValue(config, 'frictionX', 0),
      setFrictionY: GetFastValue(config, 'frictionY', 0),
      setVelocityX: GetFastValue(config, 'velocityX', 0),
      setVelocityY: GetFastValue(config, 'velocityY', 0),
      setAngularVelocity: GetFastValue(config, 'angularVelocity', 0),
      setAngularAcceleration: GetFastValue(config, 'angularAcceleration', 0),
      setAngularDrag: GetFastValue(config, 'angularDrag', 0),
      setMass: GetFastValue(config, 'mass', 1),
      setImmovable: GetFastValue(config, 'immovable', false)
    };

    Group.call(this, scene, children, config);
  },

  createCallbackHandler: function(child) {
    if (!child.body) {
      this.world.enableBody(child, CONST.DYNAMIC_BODY);
    }

    var body = child.body;

    for (var key in this.defaults) {
      body[key](this.defaults[key]);
    }
  },

  removeCallbackHandler: function(child) {
    if (child.body) {
      this.world.disableBody(child);
    }
  },

  setVelocity: function(x, y, step) {
    if (step === undefined) {
      step = 0;
    }

    var items = this.getChildren();

    for (var i = 0; i < items.length; i++) {
      items[i].body.velocity.set(x + i * step, y + i * step);
    }

    return this;
  },

  setVelocityX: function(value, step) {
    if (step === undefined) {
      step = 0;
    }

    var items = this.getChildren();

    for (var i = 0; i < items.length; i++) {
      items[i].body.velocity.x = value + i * step;
    }

    return this;
  },

  setVelocityY: function(value, step) {
    if (step === undefined) {
      step = 0;
    }

    var items = this.getChildren();

    for (var i = 0; i < items.length; i++) {
      items[i].body.velocity.y = value + i * step;
    }

    return this;
  }
});

module.exports = PhysicsGroup;
