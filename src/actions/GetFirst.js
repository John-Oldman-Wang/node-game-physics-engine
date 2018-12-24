var GetFirst = function(items, compare, index) {
  if (index === undefined) {
    index = 0;
  }

  for (var i = index; i < items.length; i++) {
    var item = items[i];

    var match = true;

    for (var property in compare) {
      if (item[property] !== compare[property]) {
        match = false;
      }
    }

    if (match) {
      return item;
    }
  }

  return null;
};

module.exports = GetFirst;
