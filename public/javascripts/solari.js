$.fn.extend({
  
  solari: function(result, maxDuration) {
    var revealCount = 0;

    this.html(result).addClass('jq-solari').splitEachCharacter().bind('reveal.solari', function(e) {
      e.value = result;
      revealCount += 1;
      if (revealCount < (result + '').length) return false;
    });

    if (maxDuration) this.find('span').solariSpin(maxDuration);
  },

  splitEachCharacter: function() {
    var html = this.html(), 
        chars = '';

    this.empty();

    for (var i=0; i<html.length; i++) {
      var charValue = $('<span>').addClass('jq-solari-char-value').html(html[i]),
          char = $('<span>').addClass('jq-solari-char').append('<hr/>').append(charValue);
      this.append(char);
    }

    return this;
  },

  solariSpin: function (maxDuration) {
    this.each(function(i, span) {
      var span = $(span).find('span.jq-solari-char-value'),
          original = span.html();
          duration = $.rand(maxDuration/2, maxDuration);

      var spinInterval = setInterval(function() {
        var nextChar = Math.floor($.rand(10));
        span.html(nextChar);
      }, $.rand(100, 150));

      setTimeout(function() { 
        clearInterval(spinInterval);
        span.html(original).trigger('reveal.solari');
      }, duration);
    });
  }

});
