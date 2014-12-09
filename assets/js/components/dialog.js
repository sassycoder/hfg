(function () {
	'use strict';
	var $document = $(document);

	$document.on('click', '.show-dialog', function (ev) {
		var $this = $(this),
			targetEl = $this.data('target-element'),
			offsetHeight = $this.height(),
			coords = $this.offset(),
			parentCoords = $(targetEl).parent().offset(),
			closeFn = function (ev) {
				if ($(ev.target).closest(targetEl).length === 0) {
					$(targetEl).hide();
					$this.removeClass('active');
				} else {
					$document.one('click', closeFn);
				}
			};

		if ($this.hasClass('active')) {
			$(targetEl).hide();
			$this.toggleClass('active');
			$document.off('click', closeFn);
		} else {
			$(targetEl).show().css({
				top: (coords.top - parentCoords.top) + offsetHeight,
				left: (coords.left - ($(targetEl).width() + parentCoords.left))
			});
			$this.toggleClass('active');
			$document.one('click', closeFn);
		}

		ev.preventDefault();
	});

}());