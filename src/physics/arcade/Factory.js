var ArcadeImage = require('./ArcadeImage');
var ArcadeSprite = require('./ArcadeSprite');
var Class = require('../../utils/Class');
var CONST = require('./const');
var PhysicsGroup = require('./PhysicsGroup');
var StaticPhysicsGroup = require('./StaticPhysicsGroup');

var Factory = new Class({
  initialize: function Factory(world) {
    this.world = world;

    // this.scene = world.scene;

    // this.sys = world.scene.sys;
  },

  collider: function(object1, object2, collideCallback, processCallback, callbackContext) {
    return this.world.addCollider(object1, object2, collideCallback, processCallback, callbackContext);
  },

  overlap: function(object1, object2, collideCallback, processCallback, callbackContext) {
    return this.world.addOverlap(object1, object2, collideCallback, processCallback, callbackContext);
  },

  existing: function(gameObject, isStatic) {
    var type = isStatic ? CONST.STATIC_BODY : CONST.DYNAMIC_BODY;

    this.world.enableBody(gameObject, type);

    return gameObject;
  },

  staticImage: function(x, y, key, frame) {
    var image = new ArcadeImage(this.scene, x, y, key, frame);

    // this.sys.displayList.add(image);

    this.world.enableBody(image, CONST.STATIC_BODY);

    return image;
  },

  image: function(x, y, width, height) {
    var image = new ArcadeImage(this.scene, x, y, width, height);
    // console.log({
    //   x,
    //   y,
    //   width,
    //   height
    // });
    // if (true) {
    //   const { x, y, width, height, angle, scaleX, scaleY, frame, parentContainer, displayOriginX, displayOriginY } = image;
    //   console.log({ x, y, width, height, angle, scaleX, scaleY, frame, parentContainer, displayOriginX, displayOriginY });
    // }
    // console.log();
    // const getSet = new Set();
    // const setSet = new Set();
    // const getObj = {};
    // const setObj = {};
    // setTimeout(() => {
    //   console.log({ getObj, setObj });
    // }, 3000);

    // const iProxy = new Proxy(image, {
    //   get: function(target, key) {
    //     if (!getSet.has(key)) {
    //       console.log(`get ${key}`);
    //       getSet.add(key);
    //       getObj[key] = 1;
    //     } else {
    //       getObj[key] += 1;
    //     }

    //     return target[key];
    //   },
    //   set: function(target, key, value) {
    //     if (!setSet.has(key)) {
    //       console.log(`set ${key} ${value}`);
    //       setSet.add(key);
    //       setObj[key] = 1;
    //     } else {
    //       setObj[key] += 1;
    //     }
    //     return (target[key] = value);
    //   }
    // });

    this.world.enableBody(image, CONST.DYNAMIC_BODY);

    return image;
  },

  staticSprite: function(x, y, key, frame) {
    var sprite = new ArcadeSprite(this.scene, x, y, key, frame);

    // this.sys.displayList.add(sprite);
    // this.sys.updateList.add(sprite);

    this.world.enableBody(sprite, CONST.STATIC_BODY);

    return sprite;
  },

  sprite: function(x, y, key, frame) {
    var sprite = new ArcadeSprite(this.scene, x, y, key, frame);

    // this.sys.displayList.add(sprite);
    // this.sys.updateList.add(sprite);

    this.world.enableBody(sprite, CONST.DYNAMIC_BODY);

    return sprite;
  },

  // staticGroup: function(children, config) {
  //   return this.sys.updateList.add(new StaticPhysicsGroup(this.world, this.world.scene, children, config));
  // },

  // group: function(children, config) {
  //   return this.sys.updateList.add(new PhysicsGroup(this.world, this.world.scene, children, config));
  // },

  destroy: function() {
    this.world = null;
    this.scene = null;
    this.sys = null;
  }
});

module.exports = Factory;
