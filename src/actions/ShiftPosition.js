var Vector2 = require('../math/Vector2');

var ShiftPosition = function(items, x, y, direction, output) {
  if (direction === undefined) {
    direction = 0;
  }
  if (output === undefined) {
    output = new Vector2();
  }

  var px;
  var py;

  if (items.length > 1) {
    var i;
    var cx;
    var cy;
    var cur;

    if (direction === 0) {
      //  Bottom to Top

      var len = items.length - 1;

      px = items[len].x;
      py = items[len].y;

      for (i = len - 1; i >= 0; i--) {
        //  Current item
        cur = items[i];

        //  Get current item x/y, to be passed to the next item in the list
        cx = cur.x;
        cy = cur.y;

        //  Set current item to the previous items x/y
        cur.x = px;
        cur.y = py;

        //  Set current as previous
        px = cx;
        py = cy;
      }

      //  Update the head item to the new x/y coordinates
      items[len].x = x;
      items[len].y = y;
    } else {
      //  Top to Bottom

      px = items[0].x;
      py = items[0].y;

      for (i = 1; i < items.length; i++) {
        //  Current item
        cur = items[i];

        //  Get current item x/y, to be passed to the next item in the list
        cx = cur.x;
        cy = cur.y;

        //  Set current item to the previous items x/y
        cur.x = px;
        cur.y = py;

        //  Set current as previous
        px = cx;
        py = cy;
      }

      //  Update the head item to the new x/y coordinates
      items[0].x = x;
      items[0].y = y;
    }
  } else {
    px = items[0].x;
    py = items[0].y;

    items[0].x = x;
    items[0].y = y;
  }

  //  Return the final set of coordinates as they're effectively lost from the shift and may be needed

  output.x = px;
  output.y = py;

  return output;
};

module.exports = ShiftPosition;
