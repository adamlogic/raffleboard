$.fn.extend({
  
  solari: function(result, maxDuration, run) {
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

    for (var i=0; i<html.length; i++) {
      chars += '<span><div></div>' + html[i] + '</span>';
    }

    this.html(chars);
    return this;
  },

  solariSpin: function (maxDuration) {
    this.each(function(i, span) {
      var span = $(span),
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
