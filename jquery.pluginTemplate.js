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
 *
 * Reference
 *  @see http://docs.jquery.com/Plugins/Metadata/metadata
 */

/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
   onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 2
   browser: true */

/*global jQuery: true debug: true window: true */

(function ($) {
  // Plugins should not declare more than one namespace in the $.fn object.
  // So we declare methods in a methods array
    var methods = {
      init : function (options) {
        // build main options before element iteration
        var opts = $.extend({}, $.fn.pluginName.defaults, options);
        // iterate over matched elements
        return this.each(function () {
          var $this = $(this);
          // Build element specific options. Uses the Metadata plugin if available
          // @see http://docs.jquery.com/Plugins/Metadata/metadata
          var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
          // implementations
          var data = $this.data('pluginName');
          var pluginName = $('<div />', {
            id: "plugingName"
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
      },
      show : function () {},
      hide : function () {},
      refresh : function () {},
      update : function () {}
    };

    // replace 'pluginName' with the name of your plugin
    $.fn.pluginName = function (method) {
  
      debug(this);
      
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
    $.fn.pluginName.defaults = {};
  
    // public functions definition
    $.fn.pluginName.functionName = function (foo) {
      return this;
    };
    
    // private functions definition
    function foobar() {}
  
    // private function for debugging
    function debug() {
      var $this = $(this);
      if (window.console && window.console.log) {
        window.console.log('selection count: ' + $this.size());
      }
    }
  }
)(jQuery);