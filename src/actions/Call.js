var Call = function(items, callback, context) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    callback.call(context, item);
  }

  return items;
};

module.exports = Call;
