(function($) {

	var getTime = function() { return new Date().getTime(); };

	var SafeForm = function(element, options) {
		this.initialize(element, options);
	}

	SafeForm.prototype = {

		constructor: SafeForm,

		initialize: function(element, options) {
			this.$element = $(element);
			this.options = $.extend({}, $.fn.safeform.defaults, options);
			this.disabled = false;
			this.submittedAt = getTime();
			this.$element.submit($.proxy(this.prevenDoubleSubmit, this));
		},

		disable: function() {
			this.disabled = true;
		},

		complete: function() {
			this.disabled = false;
		},

		submit: function() {
			this.$element.submit();
		},

		isAutoRefreshed: function() {
			var o = this.options,
				now = getTime();
			return o.timeout && now - this.submittedAt > o.timeout;
		},

		prevenDoubleSubmit: function(event) {
			var o = this.options;
			if (this.disabled && !this.isAutoRefreshed()) return false;
			this.disable();
			this.submittedAt = getTime();
			if ($.isFunction(o.submit)) {
        		return o.submit.call(this.$element, event);
      		}
		}
	};

	$.fn.safeform = function(option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('safeform'),
				options = typeof option == 'object' && option;
			if (!data) $this.data('safeform', (data = new SafeForm(this, options)));
			if (typeof option == 'string') data[option]();
		});
	};

	$.fn.safeform.Constructor = SafeForm;

	$.fn.safeform.defaults = {
		timeout: null,
		submit: null
	};

})(window.jQuery);