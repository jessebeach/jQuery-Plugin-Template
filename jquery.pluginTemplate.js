/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
 browser: true */

/*global jQuery: true window: true document: true */

/**
 * A jQuery plugin template.
 * This extends @hantu's basic template.
 *
 * Author: Jesse Beach
 * Author URI: http://qemist.us
 * Author Twitter: @jessebeach
 * Author Github: https://github.com/jessebeach
 *
 * With input from:
 *  @see hantu https://github.com/hantu/jquery-plugin-template
 *  @see http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 *  @see http://jqueryboilerplate.com/
 *
 * Reference
 *  @see http://docs.jquery.com/Plugins/Metadata/metadata
 */

(function ($) {

  // Private function definitions.
  function foobar() {}

  // Private function for debugging.
  function debug() {
    var $this = $(this);
    if (window.console && window.console.log) {
      window.console.log('selection count: ' + $this.size());
    }
  }

  // Plugins should not declare more than one namespace in the $.fn object.
  // So we declare methods in a methods array
  var methods = {
    init : function (options) {
      // build main options before element iteration
      var opts = $.extend({}, $.fn.pluginName.defaults, options);
      // Turn on development mode
      if (opts.dev) {
        debug();
      }
      // iterate over matched elements
      return this.each(function () {
        var $this = $(this);
        // Build element specific options. Uses the Metadata plugin if available
        // @see http://docs.jquery.com/Plugins/Metadata/metadata
        var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
        // implementations
        var data = $this.data('pluginName');
        var pluginName = $('<div />', {
          id: "pluginName"
        });
        // If the plugin hasn't been initialized yet
        if (!data) {
          /* Set up the data. */
          $(this).data('pluginName', {
            target : $this,
            pluginName : pluginName
          }); 
        }
        // Create event bindings
        $(window).bind('resize.pluginName', methods.refresh);
      });
    },
    destroy : function () {
      return this.each(function () {
        $(window).unbind('.pluginName');
      });
    }
  };

  // replace 'pluginName' with the name of your plugin
  $.fn.pluginName = function (method) {      
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.pluginName');
    }
  };
    
  // plugin defaults
  $.fn.pluginName.defaults = {
    dev: false
  };

  // public functions definition
  $.fn.pluginName.functionName = function (foo) {
    return this;
  };
}
// Pass jQuery as the param to the preceding anonymous function
(jQuery));