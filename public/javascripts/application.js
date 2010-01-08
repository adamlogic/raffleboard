$(function() {
  var entries = [], largestEntry = 0;

  $('#entries_form').submit(function() { 
    addEntries($('#new_entries').val());
    return false;
  });

  $('#pick_1').click(function() { pick(1, 3000) });
  $('#pick_5').click(function() { pick(5, 2000) });

  $('#reset_list').click(function() {
    $('#winners ul').empty();
    $('#entries li.winner').each(function(i, entry) {
      $(entry).removeClass('winner');
      entries.push(toNumber(entry.innerHTML));
    });
  });

  $('body').bind('reveal.solari', function(e) {
    $('#winners ul').appendSorted('<li>' + e.value + '</li>');
    $('#entry_' + toNumber(e.value)).addClass('winner');
  });

  function addEntry(entry) {
    entries.push(entry);
    if (entry > largestEntry) largestEntry = entry;
    var li = $('<li>').html(entry).attr('id', 'entry_' + entry);
    $('#entries ul').appendSorted(li);
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
