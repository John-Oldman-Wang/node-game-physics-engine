var CONST = require('./const');
var GetValue = require('../utils/object/GetValue');
var Merge = require('../utils/object/Merge');
var InjectionMap = require('./InjectionMap');

var Settings = {
  create: function(config) {
    if (typeof config === 'string') {
      config = { key: config };
    } else if (config === undefined) {
      //  Pass the 'hasOwnProperty' checks
      config = {};
    }

    return {
      status: CONST.PENDING,

      key: GetValue(config, 'key', ''),
      active: GetValue(config, 'active', false),
      visible: GetValue(config, 'visible', true),

      isBooted: false,

      isTransition: false,
      transitionFrom: null,
      transitionDuration: 0,
      transitionAllowInput: true,

      //  Loader payload array

      data: {},

      pack: GetValue(config, 'pack', false),

      //  Cameras

      cameras: GetValue(config, 'cameras', null),

      //  Scene Property Injection Map

      map: GetValue(config, 'map', Merge(InjectionMap, GetValue(config, 'mapAdd', {}))),

      //  Physics

      physics: GetValue(config, 'physics', {}),

      //  Loader

      loader: GetValue(config, 'loader', {}),

      //  Plugins

      plugins: GetValue(config, 'plugins', false),

      //  Input

      input: GetValue(config, 'input', {})
    };
  }
};

module.exports = Settings;
