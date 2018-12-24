var GetPoints = require('../geom/line/GetPoints');

var PlaceOnLine = function(items, line) {
  var points = GetPoints(line, items.length);

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var point = points[i];

    item.x = point.x;
    item.y = point.y;
  }

  return items;
};

module.exports = PlaceOnLine;
