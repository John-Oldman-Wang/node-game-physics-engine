//  Contains the plugins that Phaser uses globally and locally.
//  These are the source objects, not instantiated.
var corePlugins = {};

//  Contains the plugins that the dev has loaded into their game
//  These are the source objects, not instantiated.
var customPlugins = {};

var PluginCache = {};

PluginCache.register = function(key, plugin, mapping, custom) {
  if (custom === undefined) {
    custom = false;
  }

  corePlugins[key] = { plugin: plugin, mapping: mapping, custom: custom };
};

PluginCache.registerCustom = function(key, plugin, mapping, data) {
  customPlugins[key] = { plugin: plugin, mapping: mapping, data: data };
};

PluginCache.hasCore = function(key) {
  return corePlugins.hasOwnProperty(key);
};

PluginCache.hasCustom = function(key) {
  return customPlugins.hasOwnProperty(key);
};

PluginCache.getCore = function(key) {
  return corePlugins[key];
};

PluginCache.getCustom = function(key) {
  return customPlugins[key];
};

PluginCache.getCustomClass = function(key) {
  return customPlugins.hasOwnProperty(key) ? customPlugins[key].plugin : null;
};

PluginCache.remove = function(key) {
  if (corePlugins.hasOwnProperty(key)) {
    delete corePlugins[key];
  }
};

PluginCache.removeCustom = function(key) {
  if (customPlugins.hasOwnProperty(key)) {
    delete customPlugins[key];
  }
};

PluginCache.destroyCorePlugins = function() {
  for (var key in corePlugins) {
    if (corePlugins.hasOwnProperty(key)) {
      delete corePlugins[key];
    }
  }
};

PluginCache.destroyCustomPlugins = function() {
  for (var key in customPlugins) {
    if (customPlugins.hasOwnProperty(key)) {
      delete customPlugins[key];
    }
  }
};

module.exports = PluginCache;
