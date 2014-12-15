'use strict';

var $document = $(document);

	$document.on('click', '.accordion-header', function (ev) {
		if ($(window).innerWidth() < 768) {
			var $this = $(this);

			if ($this.hasClass('active')) {
				$(this).parent().next('.accordion-panel').slideUp(500, function () {
					$this.toggleClass('active');
				});
			} else {
				$this.toggleClass('active');
				$(this).parent().next('.panel').slideDown(400);
			}
		}
		ev.preventDefault();
	});

	$(window).on('resize', function () {
		if ($(this).innerWidth() > 768) {
			$('.panel').show();
		} else {
			$('.panel').hide().prev().find('.panel-header').removeClass('active');
		}
	});