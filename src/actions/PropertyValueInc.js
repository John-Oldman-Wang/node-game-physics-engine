var PropertyValueInc = function(items, key, value, step, index, direction) {
  if (step === undefined) {
    step = 0;
  }
  if (index === undefined) {
    index = 0;
  }
  if (direction === undefined) {
    direction = 1;
  }

  var i;
  var t = 0;
  var end = items.length;

  if (direction === 1) {
    //  Start to End
    for (i = index; i < end; i++) {
      items[i][key] += value + t * step;
      t++;
    }
  } else {
    //  End to Start
    for (i = index; i >= 0; i--) {
      items[i][key] += value + t * step;
      t++;
    }
  }

  return items;
};

module.exports = PropertyValueInc;
