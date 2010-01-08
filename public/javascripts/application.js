$(function() {
  var entries = [], largestEntry = 0;

  $('#entries_form').submit(function() { 
    addEntries($('#new_entries').val());
    return false;
  });

  $('#pick_1').click(function() { pick(1) });
  $('#pick_5').click(function() { pick(5) });

  $('body').bind('reveal.solari', function(e) {
    $('#winners ul').append('<li>' + e.value + '</li>');
    $('#entry_' + toNumber(e.value)).addClass('winner');
    entries.splice(entries.indexOf(e.value), 1);
  });

  function addEntry(entry) {
    entries.push(entry);
    if (entry > largestEntry) largestEntry = entry;
    var li = $('<li>').html(entry).attr('id', 'entry_' + entry);
    $('#entries ul').append(li);
  }

  function addEntries(newEntries) {
    $.each(newEntries.split(/[ ,]/), function(i, entry) {
      if (entry.indexOf('-') > -1) {
        var range = entry.split('-'), begin, end;
        if ( (begin = toNumber(range[0])) && (end = toNumber(range[1])) ) {
          for (var i=begin; i<=end; i++) addEntry(i)
        }
      } else {
        if (entry = toNumber(entry)) addEntry(entry);
      }
    });
  }

  function toNumber(value) {
    var num = parseInt(value, 10);
    return (num + '' === 'NaN') ? null : num;
  }

  function padToLength(value, length) {
    while (value.length < length) value = '0' + value;
    return value;
  }

  function pick(count) {
    if (entries.length <= 1) {
      alert('Need more than 1 entry for a drawing.');
      return false;
    }

    $('#drawing ul').empty();
    
    for (var i=0; i<count; i++) {
      $('#drawing ul').append('<li></li>');
      var winner = padToLength($.rand(entries), (largestEntry + '').length);
      $('#drawing li:last').html(winner).solari();
    }
  }
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
