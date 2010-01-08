$.fn.extend({
  
  solari: function() {
    var originalValue = this.html(),
        revealCount = 0;

    this.addClass('jq-solari').splitEachCharacter().bind('reveal.solari', function(e) {
      e.value = originalValue;
      revealCount += 1;
      if (revealCount < originalValue.length) return false;
    });

    this.find('span').solariSpin();
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

  solariSpin: function () {
    this.each(function(i, span) {
      var span = $(span),
          original = span.html();
          duration = Math.floor(Math.random()*3000 + 2000);  // 2000-5000 milliseconds

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
