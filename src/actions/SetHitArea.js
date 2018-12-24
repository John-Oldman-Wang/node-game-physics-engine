var SetHitArea = function(items, hitArea, hitAreaCallback) {
  for (var i = 0; i < items.length; i++) {
    items[i].setInteractive(hitArea, hitAreaCallback);
  }

  return items;
};

module.exports = SetHitArea;
