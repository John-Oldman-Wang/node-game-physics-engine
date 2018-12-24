var RotateRight = function(array, total) {
  if (total === undefined) {
    total = 1;
  }

  var element = null;

  for (var i = 0; i < total; i++) {
    element = array.pop();
    array.unshift(element);
  }

  return element;
};

module.exports = RotateRight;
