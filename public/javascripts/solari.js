$.fn.extend({
  
  solari: function(duration) {
    var originalValue = this.html(),
        revealCount = 0;

    this.addClass('jq-solari').splitEachCharacter().bind('reveal.solari', function(e) {
      e.value = originalValue;
      revealCount += 1;
      if (revealCount < originalValue.length) return false;
    });

    this.find('span').solariSpin(duration);
  },

  splitEachCharacter: function() {
    var html = this.html(), 
        chars = '';

    for (var i=0; i<html.length; i++) {
      chars += '<span>' + html[i] + '</span>';
    }

    this.html(chars);
    return this;
  },

  solariSpin: function (duration) {
    this.each(function(i, span) {
      var span = $(span),
          original = span.html();
          duration = Math.floor(Math.random()*duration + 1);

      var spinInterval = setInterval(function() {
        var nextChar = Math.floor(Math.random()*10);
        span.html(nextChar);
      }, 70);

      setTimeout(function() { 
        clearInterval(spinInterval);
        span.html(original).trigger('reveal.solari');
      }, duration);
    });
  }

});
