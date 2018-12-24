var DefaultPlugins = {
  Global: ['game', 'anims', 'cache', 'plugins', 'registry', 'scale', 'sound', 'textures'],

  CoreScene: ['EventEmitter', 'CameraManager', 'GameObjectCreator', 'GameObjectFactory', 'ScenePlugin', 'DisplayList', 'UpdateList'],

  DefaultScene: ['Clock', 'DataManagerPlugin', 'InputPlugin', 'Loader', 'TweenManager', 'LightsPlugin']
};

if (typeof PLUGIN_CAMERA3D) {
  DefaultPlugins.DefaultScene.push('CameraManager3D');
}

if (typeof PLUGIN_FBINSTANT) {
  DefaultPlugins.Global.push('facebook');
}

module.exports = DefaultPlugins;
