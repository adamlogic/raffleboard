$(function() {

  $('form#range').submit(function() {
    var begin = parseInt($('#rangebegin').val()),
        end = parseInt($('#rangeend').val()),
        result = $.rand(begin, end);

    $('.result').solari(result);
    return false
  });

});

$.rand = function() {
  switch(arguments.length) {
    case 1:
      return Math.floor(Math.random() * arguments[0]);
    case 2:
      var begin = arguments[0], end = arguments[1];
      return $.rand(end - begin + 1) + begin;
  }
}
