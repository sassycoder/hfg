$(function () {
	'use strict';

	var tabNav = $('.tabs .nav .tab-item'),
			articles = $('.tabs .article'),
			desktopOnly = $('.tabs').hasClass('desktopOnly'),
			singleOnly = $('.tabs').hasClass('single-only'),

			runTabs = function (index) {
				$(tabNav).each(function () {
					$(this).removeClass('active'); // remove active class from tab anchors
				});

				$(articles).each(function () { // animate out old article , animate in clicked article
					if ($(this).hasClass('active')) {
						$(this).animate({opacity: '0'}, {duration: 250, complete: function () {
							$(this).removeClass('active');
							$(articles).eq(index).addClass('active').animate({opacity: '1'}, {duration: 250, complete: function () {
								window.setArticleHeight();
							}});
						}});
					}
				});
			};

			window.setArticleHeight = function () {
				if (desktopOnly) {
					var articleH = $('.article.active').innerHeight();
					$('.component.tabs').css('height', (articleH + 40) + 'px');
				}
			};

		//make first tab item active
		$(tabNav).each(function (i) {
			if (i === 0) {
				$(this).addClass('active');
				return;
			}
		});

		//make all articles invisible apart from the first one
		$(articles).each(function (i) {
			var $this = $(this);

			if (i === 0) {
				$this.addClass('active');
			}

			if (i > 0) {
				$this.css('opacity', '0');
			}
		});

		$(window).on('resize', function () {
			if ($(this).innerWidth() > 767) {
				//var getActive = $('.nav .article.active').index();
				//$(tabNav).removeClass('active').eq(getActive).addClass('active');
				$('.tab-item + .article').css({
					display: '',
					opacity: '0'
				});
				$('.tab-item.active + .article').css({
					opacity: '1'
				});
				window.setArticleHeight();
			}

		});

		//event for tab click
		$(document).on('click', '.tabs .nav .tab-item', function(e) {
	    e.preventDefault();

	    var windowWidth = $(window).innerWidth(),
					$this = $(this),
					index = $(tabNav).index(this); //get index of clicked tab

	    if (windowWidth < 768 && desktopOnly) {
        if ($this.hasClass('active')) {
					//$('.article.active').removeClass('active');
					//$this.next('.article').slideUp('fast', function () {
					//	$(this).removeClass('active'); //article
					//	$this.removeClass('active').blur(); //tab
					//});

				return;
				} else {
					if (singleOnly) {
						$('.tab-item.active')
						.removeClass('active')
						.blur()
						.next('.article')
						.slideUp('fast')
						.removeClass('active');
					}
					$this.addClass('active').next('.article').slideDown('fast', function () {
						$(this).addClass('active');
					});
				}
      } else {

		    if ($(this).hasClass('active')) {
					return;
		    } else {
					runTabs(index);
					$(this).addClass('active');	//add active class to clicked tab anchor
				}
			}
		});

		$(document).on('click', '.tabs .button.next', function(e) {
			e.preventDefault();

			var getActiveTab = $('.tabs .nav a.active'),
					index = $(getActiveTab).index();

					//when get to last tab, reset index to go back to first tab
					if (index >= (tabNav.length) - 1) {
						index = 0;
					} else {
						index++;
					}

			runTabs(index);
			$(tabNav).eq(index).addClass('active');	//add active class to clicked tab anchor
		});

		$(document).on('click', '.tabs .button.hotlink', function(e) {
			e.preventDefault();

			var index = parseInt($(this).data('tab'));

			runTabs(index);
			$(tabNav).eq(index).addClass('active');	//add active class to clicked tab anchor
		});
});

$(window).load(function() {
	'use strict';
  window.setArticleHeight();
});