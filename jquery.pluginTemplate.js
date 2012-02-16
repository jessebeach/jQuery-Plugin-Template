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

(function ($, window, document, undefined) {
	// Replace 'pluginName' with the name of your plugin.
	var plugin = 'pluginName',
	// A private reference to this $plugin object.
	$plugin;

	// Private variables
	var html = $('html').get(0);
	var textDirection = (html.dir) ? html.dir : 'ltr';

	// Private function definitions.
	/**
	 * Clear all the timers on an element.
	 */
	function clearDelay(event) {
		event.stopPropagation();
		var $this = $(this);
		var timers = $this.data()[plugin].timers;
		while (timers.length > 0) {
			clearTimeout(timers.pop());
		}
	}
	/**
	 * Create a delay to call a function on an element.
	 */
	function setDelay(event) {
		event.stopPropagation();
		// Bind the function designated in event.data.toTrigger
		// to $(this) and pass it to the setTimeout.
		// The bind is necessary so that trigger is called on the correct
		// pulldown element, rendering 'this' to the correct context.
		var $this = $(this);
		if (event.data.toTrigger) {
			var func = $.proxy($.fn.trigger, $this, event.data.toTrigger),
			timeout = setTimeout(func, event.data.delay),
			timers = $this.data()[plugin].timers;
			timers.push(timeout);
		}
		$this.trigger('debug');
	}
	function report (event) {
		var $this = $(this);
		$this.html('this is a report.');
	}

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
			// Call a public method through the private reference to $plugin.
			$plugin.functionName();
			// Build main options before element iteration.
			var opts = $.extend({}, $.fn[plugin].defaults, options);
			// Iterate over matched elements.
			return this.each(function () {
				var $this = $(this);
				// Build element specific options. Uses the Metadata plugin if available.
				// @see http://docs.jquery.com/Plugins/Metadata/metadata
				var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
				// Set up the data.
				$this.data(plugin, {
					target : $this,
					name : plugin,
					timers: []
				});
				// Plugin behavior.
				$this
				.data(plugin, {
					timers: []
				})
				.bind('report', report)
				.bind('click', {delay: 1500, toTrigger: 'report', iterate: 5}, setDelay)
				.css({
					width: 100,
					height: 100,
					outline: '1px dotted red'
				});
			});
		},
		destroy : function () {
			return this.each(function () {});
		}
	};

	// Add the plugin to
	$plugin = $.fn[plugin] = function (method) {      
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.' + plugin);
		}
	};
		
	// plugin defaults
	$.fn[plugin].defaults = {};

	// public functions definition
	$.fn[plugin].functionName = function (foo) {
		console.log('hi');
		return this;
	};
}
// Pass jQuery as the param to the preceding anonymous function
(jQuery, window, document, undefined));