var Class = require('../utils/Class');

var DataManager = new Class({
  initialize: function DataManager(parent, eventEmitter) {
    this.parent = parent;

    this.events = eventEmitter;

    if (!eventEmitter) {
      this.events = parent.events ? parent.events : parent;
    }

    this.list = {};

    this.values = {};

    this._frozen = false;

    if (!parent.hasOwnProperty('sys') && this.events) {
      this.events.once('destroy', this.destroy, this);
    }
  },

  get: function(key) {
    var list = this.list;

    if (Array.isArray(key)) {
      var output = [];

      for (var i = 0; i < key.length; i++) {
        output.push(list[key[i]]);
      }

      return output;
    } else {
      return list[key];
    }
  },

  getAll: function() {
    var results = {};

    for (var key in this.list) {
      if (this.list.hasOwnProperty(key)) {
        results[key] = this.list[key];
      }
    }

    return results;
  },

  query: function(search) {
    var results = {};

    for (var key in this.list) {
      if (this.list.hasOwnProperty(key) && key.match(search)) {
        results[key] = this.list[key];
      }
    }

    return results;
  },

  set: function(key, data) {
    if (this._frozen) {
      return this;
    }

    if (typeof key === 'string') {
      return this.setValue(key, data);
    } else {
      for (var entry in key) {
        this.setValue(entry, key[entry]);
      }
    }

    return this;
  },

  setValue: function(key, data) {
    if (this._frozen) {
      return this;
    }

    if (this.has(key)) {
      //  Hit the key getter, which will in turn emit the events.
      this.values[key] = data;
    } else {
      var _this = this;
      var list = this.list;
      var events = this.events;
      var parent = this.parent;

      Object.defineProperty(this.values, key, {
        enumerable: true,

        configurable: true,

        get: function() {
          return list[key];
        },

        set: function(value) {
          if (!_this._frozen) {
            var previousValue = list[key];
            list[key] = value;

            events.emit('changedata', parent, key, value, previousValue);
            events.emit('changedata_' + key, parent, value, previousValue);
          }
        }
      });

      list[key] = data;

      events.emit('setdata', parent, key, data);
    }

    return this;
  },

  each: function(callback, context) {
    var args = [this.parent, null, undefined];

    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    for (var key in this.list) {
      args[1] = key;
      args[2] = this.list[key];

      callback.apply(context, args);
    }

    return this;
  },

  merge: function(data, overwrite) {
    if (overwrite === undefined) {
      overwrite = true;
    }

    //  Merge data from another component into this one
    for (var key in data) {
      if (data.hasOwnProperty(key) && (overwrite || (!overwrite && !this.has(key)))) {
        this.setValue(key, data[key]);
      }
    }

    return this;
  },

  remove: function(key) {
    if (this._frozen) {
      return this;
    }

    if (Array.isArray(key)) {
      for (var i = 0; i < key.length; i++) {
        this.removeValue(key[i]);
      }
    } else {
      return this.removeValue(key);
    }

    return this;
  },

  removeValue: function(key) {
    if (this.has(key)) {
      var data = this.list[key];

      delete this.list[key];
      delete this.values[key];

      this.events.emit('removedata', this.parent, key, data);
    }

    return this;
  },

  pop: function(key) {
    var data = undefined;

    if (!this._frozen && this.has(key)) {
      data = this.list[key];

      delete this.list[key];
      delete this.values[key];

      this.events.emit('removedata', this, key, data);
    }

    return data;
  },

  has: function(key) {
    return this.list.hasOwnProperty(key);
  },

  setFreeze: function(value) {
    this._frozen = value;

    return this;
  },

  reset: function() {
    for (var key in this.list) {
      delete this.list[key];
      delete this.values[key];
    }

    this._frozen = false;

    return this;
  },

  destroy: function() {
    this.reset();

    this.events.off('changedata');
    this.events.off('setdata');
    this.events.off('removedata');

    this.parent = null;
  },

  freeze: {
    get: function() {
      return this._frozen;
    },

    set: function(value) {
      this._frozen = value ? true : false;
    }
  },

  count: {
    get: function() {
      var i = 0;

      for (var key in this.list) {
        if (this.list[key] !== undefined) {
          i++;
        }
      }

      return i;
    }
  }
});

module.exports = DataManager;
