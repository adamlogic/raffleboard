$(function() {
  var entries = [];

  $('#drawing li').solari('000000');

  $('#add_entries_link').click(function() { 
    $('#entries_form').toggle();
    setTimeout(function() { $('#entries_form :text').trigger('select') }, 0);
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
  $('#entry_counter').click(function() { console.log(entries); return false; });
  $('#prizes_link').click(function() { return false; });

  $('#prize_selection').bind('mouseenter mouseleave', function() { 
    $('#prizes_link').toggleClass('hover');
  });

  $('body').bind('reveal.solari', function(e) {
    var currentWinners = $('#winners li:first span');
    currentWinners.html(currentWinners.html() + ' &nbsp;' + toNumber(e.value));
    updateEntryCounter();
  });

  function addEntry(entry) {
    entries.push(entry);
    updateEntryCounter();
  }

  function updateEntryCounter() {
    $('#entry_counter').html(entries.length);
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

    $('#winners ul').prepend('<li><span></span></li>');
    $('#drawing li').solari('000000');
    
    for (var i=0; i<count; i++) {
      var drawing = $('#drawing li').eq(i);
      var winner = $.rand(entries);
      entries.splice(entries.indexOf(winner), 1);
      drawing.solari(padToLength(winner, 6), duration);
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
