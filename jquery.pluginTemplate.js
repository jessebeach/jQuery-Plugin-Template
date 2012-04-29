/*jslint bitwise: true, eqeqeq: true, immed: true, newcap: true, nomen: false,
 onevar: false, plusplus: false, regexp: true, undef: true, white: true, indent: 4
 browser: true */

/*global window: true define: true */

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
 *  @see jrburke https://github.com/umdjs/umd
 *  @see http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 *  @see http://jqueryboilerplate.com/
 *
 * TEMPLATE USE
 * Find the string 'pluginName' just below and replace it with the name
 * of your plugin.
 */

(function (factory) {
	// Load this plugin with require.js if available.
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// If jQuery is not defined, warn the user and return.
		if (window.jQuery === undefined) {
			if (typeof window.console === 'object' && typeof window.console.log === 'function') {
				console.log("The plugin \"pluginName\" failed to run because jQuery is not present.");
			}
			return null;
		}
		// Call the plugin factory. jQuery is a global object.
		factory();
	}
}
// The plugin factory function.
(function () {
	// Replace 'pluginName' with the name of your plugin.
	var plugin = 'pluginName',
	// A private reference to this $plugin object.
	$plugin,
	// Local copies of context globals (sandbox).
	document = window.document,
	navigator = window.navigator,
	location = window.location,
	// Local copy of jQuery.
	$ = window.jQuery,
	// Private variables
	html = document.documentElement,
	textDirection = (html.dir) ? html.dir : 'ltr';

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
	function report(event) {
		var $this = $(this);
		$this.html('Timers are working. This is a report.');
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
				// Set up the data.
				$this.data(plugin, {
					target : $this,
					name : plugin,
					timers: []
				});
				// Define your plugin behavior here.
				$this
				.data(plugin, {
					timers: []
				})
				.text('Click here')
				.bind('report', report)
				.bind('click', {delay: 500, toTrigger: 'report', iterate: 5}, setDelay)
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

	// Add the plugin as a property of the jQuery fn object.
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
		return null;
	};
}));