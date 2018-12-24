var SetTint = function(items, topLeft, topRight, bottomLeft, bottomRight) {
  for (var i = 0; i < items.length; i++) {
    items[i].setTint(topLeft, topRight, bottomLeft, bottomRight);
  }

  return items;
};

module.exports = SetTint;
