var Clone = require('./Clone');

var Merge = function(obj1, obj2) {
  var clone = Clone(obj1);

  for (var key in obj2) {
    if (!clone.hasOwnProperty(key)) {
      clone[key] = obj2[key];
    }
  }

  return clone;
};

module.exports = Merge;
