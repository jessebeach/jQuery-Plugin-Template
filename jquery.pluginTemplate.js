(function($) {

  // replace 'pluginName' with the name of your plugin
  $.fn.pluginName = function(options) {

    debug(this);

    // build main options before element iteration
    var opts = $.extend({}, $.fn.pluginName.defaults, options);

    // iterate over matched elements
    return this.each(function() {
      var $this = $(this);
      // build element specific options. Uses the Metadata plugin if available
      // @see http://docs.jquery.com/Plugins/Metadata/metadata
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      // implementations
    });
  };
    
  // plugin defaults
  $.fn.pluginName.defaults = {};

  // public functions definition
  $.fn.pluginName.functionName = function(foo) {
    return this;
  };
  
  // private functions definition
  function foobar() {}

  // private function for debugging
  function debug() {
    var $this = $(this);
    if (window.console && window.console.log)
      window.console.log('selection count: ' + $this.size());
  };

})(jQuery);