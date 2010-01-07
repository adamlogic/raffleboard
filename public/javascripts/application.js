$(function() {

  $('form#range').submit(function() {
    var begin1 = parseInt($('#range1begin').val()),
        end1 = parseInt($('#range1end').val()),
        begin2 = parseInt($('#range2begin').val()),
        end2 = parseInt($('#range2end').val()),
        possibilities = [];
        

    for (i=begin1; i<=end1; i++) { possibilities.push(i) };
    for (i=begin2; i<=end2; i++) { possibilities.push(i) };

    $('.result').solari($.rand(possibilities));
    return false
  });

});

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
