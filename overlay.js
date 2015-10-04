(function($) {

  var OverlayPlugin = function(element, options) {

    var elem = $(element);
    var obj = this;
    var backdropEl = null;
    var triggerEl = null;
    var triggerHandler = null;
    var closeEl = null;
    var closeHandler = null;

    var settings = $.extend({
      overlayTriggerId: "#overlayTrigger",
      overlayCloseId: "#overlayClose"
    }, options || {});


    // Public method - can be called from client code
    this.destroy = function() {
      hide();

      if (triggerEl !== null) {
        triggerEl.off('click');
      }
      if (closeEl !== null) {
        closeEl.off('click');
      }
    };

    // Private methods - can only be called from within this object
    var hide = function() {
	  $('body').css('overflow', '');
		
      //Hide backdrop
      if (backdropEl !== null) {
        backdropEl.remove();
        backdropEl = null;
      }

      //Hide overlay
      elem.removeClass('overlay');
    };
    var bindTrigger = function() {
      triggerEl = $(settings.overlayTriggerId);
      triggerHandler = function() {
        //Show backdrop
        backdropEl = $('<div/>').addClass('overlay-backdrop');
        backdropEl.on('click', function() {
          hide();
        });
        $('body').append(backdropEl);


        //Show overlay
        elem.addClass('overlay')
		$('body').css('overflow', 'hidden');
      }
      triggerEl.on('click', triggerHandler);

      //Add close handler
      closeEl = $(settings.overlayCloseId);
      closeHandler = function() {
        hide();
      };
      closeEl.on('click', closeHandler);
    };

    bindTrigger();
  };


  $.fn.overlay = function(options) {
    var element = $(this);

    // Return early if this element already has a plugin instance
    if (element.data('overlay')) return element.data('overlay');

    // pass options to plugin constructor
    var overlay = new OverlayPlugin(this, options);

    // Store plugin object in this element's data
    element.data('overlay', overlay);

    return overlay;
  };
})(jQuery);