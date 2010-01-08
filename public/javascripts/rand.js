$.rand = function() {
  switch(arguments.length) {
    case 1:
      if ($.isArray(arguments[0])) {
        return $.rand.apply(this, arguments[0]);
      } else {
        return Math.floor(Math.random() * arguments[0]);
      }
    case 2:
      var begin = arguments[0], end = arguments[1];
      return $.rand(end - begin + 1) + begin;
    default:
      return arguments[$.rand(arguments.length)];
  }
}

