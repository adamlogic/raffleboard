$(function() {
  var entries = [], largestEntry = 0;

  $('#add_entries_link').click(function() { 
    $('#entries_form').toggle().find(':text').trigger('select');
    return false;
  });

  $('#entries_form').submit(function() { 
    addEntries($('#new_entries').val());
    $('#add_entries_link').addClass('done');
    $(this).hide();
    return false;
  });

  $('#pick_1').click(function() { pick(1, 3000); return false; });
  $('#pick_5').click(function() { pick(5, 2000); return false; });

  $('body').bind('reveal.solari', function(e) {
    var currentWinners = $('#winners li:first');
    currentWinners.html(currentWinners.html() + ' ' + e.value);
  });

  function addEntry(entry) {
    entries.push(entry);
    if (entry > largestEntry) largestEntry = entry;
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
    value = value + '';
    while (value.length < length) value = '0' + value;
    return value;
  }

  function pick(count, duration) {
    if (entries.length <= count) {
      alert('Sorry, not enough entries for a drawing.');
      return false;
    }

    $('#drawing ul').empty();
    $('#winners ul').prepend('<li></li>');
    
    for (var i=0; i<count; i++) {
      $('#drawing ul').append('<li></li>');
      var winner = $.rand(entries);
      entries.splice(entries.indexOf(winner), 1);
      winner = padToLength(winner, (largestEntry + '').length);
      $('#drawing li:last').html(winner).solari(duration);
    }
  }
});

$.fn.appendSorted = function(item) {
  if (this.is(':empty')) return this.append(item);

  var itemValue = parseInt($(item).html(), 10);

  var cursor = this.children(':first');
  while (parseInt(cursor.html(), 10) < itemValue) {
    cursor = cursor.next();
  }

  if (cursor.length) cursor.before(item);
  else this.append(item);

  return this;
};
