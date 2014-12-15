'use strict';

var $document = $(document),
		panelHeaders = $('.panel-header');


		$(panelHeaders).each(function (i) {
			if (i === 0) {
				$(this).addClass('first');
				return;
			}
		});

	$document.on('click', '.panel-header', function (ev) {
		if ($(window).innerWidth() < 1024) {
			var $this = $(this);

			if ($this.hasClass('active')) {
				$(this).next('.panel').slideUp(500, function () {
					$this.toggleClass('active');
				});
			} else {
				$this.toggleClass('active');
				$(this).next('.panel').slideDown(400);
			}
		}
		ev.preventDefault();
	});

	$(window).on('resize', function () {
		if ($(this).innerWidth() > 1023) {
			$('.panel').show();
		} else {
			$('.panel').hide().prev().find('.panel-header').removeClass('active');
		}
	});