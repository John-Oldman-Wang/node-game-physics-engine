var Wrap = require('../math/Wrap');

var WrapInRectangle = function(items, rect, padding) {
  if (padding === undefined) {
    padding = 0;
  }

  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    item.x = Wrap(item.x, rect.left - padding, rect.right + padding);
    item.y = Wrap(item.y, rect.top - padding, rect.bottom + padding);
  }

  return items;
};

module.exports = WrapInRectangle;
