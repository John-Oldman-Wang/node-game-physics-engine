var Class = require('../utils/Class');

var Set = new Class({
  initialize: function Set(elements) {
    this.entries = [];

    if (Array.isArray(elements)) {
      for (var i = 0; i < elements.length; i++) {
        this.set(elements[i]);
      }
    }
  },

  set: function(value) {
    if (this.entries.indexOf(value) === -1) {
      this.entries.push(value);
    }

    return this;
  },

  get: function(property, value) {
    for (var i = 0; i < this.entries.length; i++) {
      var entry = this.entries[i];

      if (entry[property] === value) {
        return entry;
      }
    }
  },

  getArray: function() {
    return this.entries.slice(0);
  },

  delete: function(value) {
    var index = this.entries.indexOf(value);

    if (index > -1) {
      this.entries.splice(index, 1);
    }

    return this;
  },

  dump: function() {
    // eslint-disable-next-line no-console
    console.group('Set');

    for (var i = 0; i < this.entries.length; i++) {
      var entry = this.entries[i];
      console.log(entry);
    }

    // eslint-disable-next-line no-console
    console.groupEnd();
  },

  each: function(callback, callbackScope) {
    var i;
    var temp = this.entries.slice();
    var len = temp.length;

    if (callbackScope) {
      for (i = 0; i < len; i++) {
        if (callback.call(callbackScope, temp[i], i) === false) {
          break;
        }
      }
    } else {
      for (i = 0; i < len; i++) {
        if (callback(temp[i], i) === false) {
          break;
        }
      }
    }

    return this;
  },

  iterate: function(callback, callbackScope) {
    var i;
    var len = this.entries.length;

    if (callbackScope) {
      for (i = 0; i < len; i++) {
        if (callback.call(callbackScope, this.entries[i], i) === false) {
          break;
        }
      }
    } else {
      for (i = 0; i < len; i++) {
        if (callback(this.entries[i], i) === false) {
          break;
        }
      }
    }

    return this;
  },

  iterateLocal: function(callbackKey) {
    var i;
    var args = [];

    for (i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var len = this.entries.length;

    for (i = 0; i < len; i++) {
      var entry = this.entries[i];

      entry[callbackKey].apply(entry, args);
    }

    return this;
  },

  clear: function() {
    this.entries.length = 0;

    return this;
  },

  contains: function(value) {
    return this.entries.indexOf(value) > -1;
  },

  union: function(set) {
    var newSet = new Set();

    set.entries.forEach(function(value) {
      newSet.set(value);
    });

    this.entries.forEach(function(value) {
      newSet.set(value);
    });

    return newSet;
  },

  intersect: function(set) {
    var newSet = new Set();

    this.entries.forEach(function(value) {
      if (set.contains(value)) {
        newSet.set(value);
      }
    });

    return newSet;
  },

  difference: function(set) {
    var newSet = new Set();

    this.entries.forEach(function(value) {
      if (!set.contains(value)) {
        newSet.set(value);
      }
    });

    return newSet;
  },

  size: {
    get: function() {
      return this.entries.length;
    },

    set: function(value) {
      if (value < this.entries.length) {
        return (this.entries.length = value);
      } else {
        return this.entries.length;
      }
    }
  }
});

module.exports = Set;
