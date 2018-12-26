var Class = require('../../utils/Class');
var DegToRad = require('../../math/DegToRad');
var DistanceBetween = require('../../math/distance/DistanceBetween');
var DistanceSquared = require('../../math/distance/DistanceSquared');
var Factory = require('./Factory');
var GetFastValue = require('../../utils/object/GetFastValue');
var Merge = require('../../utils/object/Merge');
// var PluginCache = require('../../plugins/PluginCache');
var Vector2 = require('../../math/Vector2');
var World = require('./World');

var ArcadePhysics = new Class({
  initialize: function ArcadePhysics(config) {
    this.config = config; //  || this.getConfig();
    this.world;

    this.add;
    this.boot();
  },

  boot: function() {
    this.world = new World(this.scene, this.config);
    this.add = new Factory(this.world);

    // this.systems.events.once('destroy', this.destroy, this);
  },

  start: function() {
    if (!this.world) {
      this.world = new World(this.scene, this.config);
      this.add = new Factory(this.world);
    }

    // var eventEmitter = this.systems.events;

    // eventEmitter.on('update', this.world.update, this.world);
    // eventEmitter.on('postupdate', this.world.postUpdate, this.world);
    // eventEmitter.once('shutdown', this.shutdown, this);
  },

  getConfig: function() {
    var gameConfig = this.systems.game.config.physics;
    var sceneConfig = this.systems.settings.physics;

    var config = Merge(GetFastValue(sceneConfig, 'arcade', {}), GetFastValue(gameConfig, 'arcade', {}));

    return config;
  },

  overlap: function(object1, object2, overlapCallback, processCallback, callbackContext) {
    if (overlapCallback === undefined) {
      overlapCallback = null;
    }
    if (processCallback === undefined) {
      processCallback = null;
    }
    if (callbackContext === undefined) {
      callbackContext = overlapCallback;
    }

    return this.world.collideObjects(object1, object2, overlapCallback, processCallback, callbackContext, true);
  },

  collide: function(object1, object2, collideCallback, processCallback, callbackContext) {
    if (collideCallback === undefined) {
      collideCallback = null;
    }
    if (processCallback === undefined) {
      processCallback = null;
    }
    if (callbackContext === undefined) {
      callbackContext = collideCallback;
    }

    return this.world.collideObjects(object1, object2, collideCallback, processCallback, callbackContext, false);
  },

  pause: function() {
    return this.world.pause();
  },

  resume: function() {
    return this.world.resume();
  },

  accelerateTo: function(gameObject, x, y, speed, xSpeedMax, ySpeedMax) {
    if (speed === undefined) {
      speed = 60;
    }

    var angle = Math.atan2(y - gameObject.y, x - gameObject.x);

    gameObject.body.acceleration.setToPolar(angle, speed);

    if (xSpeedMax !== undefined && ySpeedMax !== undefined) {
      gameObject.body.maxVelocity.set(xSpeedMax, ySpeedMax);
    }

    return angle;
  },

  accelerateToObject: function(gameObject, destination, speed, xSpeedMax, ySpeedMax) {
    return this.accelerateTo(gameObject, destination.x, destination.y, speed, xSpeedMax, ySpeedMax);
  },

  closest: function(source) {
    var bodies = this.world.tree.all();

    var min = Number.MAX_VALUE;
    var closest = null;
    var x = source.x;
    var y = source.y;

    for (var i = bodies.length - 1; i >= 0; i--) {
      var target = bodies[i];
      var distance = DistanceSquared(x, y, target.x, target.y);

      if (distance < min) {
        closest = target;
        min = distance;
      }
    }

    return closest;
  },

  furthest: function(source) {
    var bodies = this.world.tree.all();

    var max = -1;
    var farthest = null;
    var x = source.x;
    var y = source.y;

    for (var i = bodies.length - 1; i >= 0; i--) {
      var target = bodies[i];
      var distance = DistanceSquared(x, y, target.x, target.y);

      if (distance > max) {
        farthest = target;
        max = distance;
      }
    }

    return farthest;
  },

  moveTo: function(gameObject, x, y, speed, maxTime) {
    if (speed === undefined) {
      speed = 60;
    }
    if (maxTime === undefined) {
      maxTime = 0;
    }

    var angle = Math.atan2(y - gameObject.y, x - gameObject.x);

    if (maxTime > 0) {
      //  We know how many pixels we need to move, but how fast?
      speed = DistanceBetween(gameObject.x, gameObject.y, x, y) / (maxTime / 1000);
    }

    gameObject.body.velocity.setToPolar(angle, speed);

    return angle;
  },

  moveToObject: function(gameObject, destination, speed, maxTime) {
    return this.moveTo(gameObject, destination.x, destination.y, speed, maxTime);
  },

  velocityFromAngle: function(angle, speed, vec2) {
    if (speed === undefined) {
      speed = 60;
    }
    if (vec2 === undefined) {
      vec2 = new Vector2();
    }

    return vec2.setToPolar(DegToRad(angle), speed);
  },

  velocityFromRotation: function(rotation, speed, vec2) {
    if (speed === undefined) {
      speed = 60;
    }
    if (vec2 === undefined) {
      vec2 = new Vector2();
    }

    return vec2.setToPolar(rotation, speed);
  },

  shutdown: function() {
    if (!this.world) {
      //  Already destroyed
      return;
    }

    // var eventEmitter = this.systems.events;

    // eventEmitter.off('update', this.world.update, this.world);
    // eventEmitter.off('postupdate', this.world.postUpdate, this.world);
    // eventEmitter.off('shutdown', this.shutdown, this);

    this.add.destroy();
    this.world.destroy();

    this.add = null;
    this.world = null;
  },

  destroy: function() {
    this.shutdown();

    this.scene.sys.events.off('start', this.start, this);

    this.scene = null;
    this.systems = null;
  }
});

// PluginCache.register('ArcadePhysics', ArcadePhysics, 'arcadePhysics');

module.exports = ArcadePhysics;
