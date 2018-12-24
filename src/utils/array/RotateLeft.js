var RotateLeft = function(array, total) {
  if (total === undefined) {
    total = 1;
  }

  var element = null;

  for (var i = 0; i < total; i++) {
    element = array.shift();
    array.push(element);
  }

  return element;
};

module.exports = RotateLeft;
