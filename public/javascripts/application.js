$(function() {
  var entries = [], largestEntry = 0;

  function addEntry(entry) {
    entries.push(entry);
    if (entry > largestEntry) largestEntry = entry;
    $('#entries ul').append('<li>' + entry + '</li>');
  }

  function toNumber(value) {
    var num = parseInt(value, 10);
    return (num + '' === 'NaN') ? null : num;
  }

  $('#entries_form').submit(function() {
    $.each($('#new_entries').val().split(/[ ,]/), function(i, entry) {
      if (entry.indexOf('-') > -1) {
        var range = entry.split('-'), begin, end;
        if ( (begin = toNumber(range[0])) && (end = toNumber(range[1])) ) {
          for (var i=begin; i<=end; i++) addEntry(i)
        }
      } else {
        if (entry = toNumber(entry)) addEntry(entry);
      }
    });

    return false;
  });

  $('#pick_1').click(function() {
    if (entries.length <= 1) {
      alert('Need more than 1 entry for a drawing.');
      return false;
    }

    $('#drawing ul').empty().append('<li></li>');
    $('#drawing li:last').html($.rand(entries))
                         .padToLength((largestEntry + '').length)
                         .solari();
  });

  $('body').bind('reveal.solari', function(e) {
    $('#winners ul').append('<li>' + e.value + '</li>');
    $('#entries li:contains(' + e.value + ')').addClass('winner');
    entries.splice(entries.indexOf(e.value), 1);
  });
});

$.fn.padToLength = function(length) {
  var value = this.html();
  while (value.length < length) value = '0' + value;
  this.html(value);
  return this;
};

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
