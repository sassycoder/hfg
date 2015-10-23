$(function () {
	'use strict';

	var tabNav = $('.tabs .nav .tab-item'),
			desktopOnlyTabs = $('.component.tabs.desktopOnly'),
			hash = window.location.hash.slice(1),
			//articles = $('.tabs .article'),
			//desktopOnly = $('.tabs').hasClass('desktopOnly'),
			//singleOnly = $('.tabs').hasClass('single-only'),

			runTabs = function (index, context) {
				var tabItems = $(context).parent().children('.tab-item'),
						articleItems = $(context).parent().parent().find('.article');

				$(tabItems).each(function () {
					$(this).removeClass('active'); // remove active class from tab anchors
				});

				$(articleItems).each(function () { // animate out old article , animate in clicked article
					if ($(this).hasClass('active')) {
						$(this).animate({opacity: '0'}, {duration: 250, complete: function () {
							$(this).removeClass('active');
							$(articleItems).eq(index).addClass('active').animate({opacity: '1'}, {duration: 250, complete: function () {
								window.setArticleHeight(tabItems, articleItems);
								if ($(window).innerWidth() < 767) {
									$('html, body').animate({
							        scrollTop: ($(this).offset().top) - 39
							    }, 400);
								}
							}});
						}});
					}
				});
			};

			window.setArticleHeight = function () {
				$(desktopOnlyTabs).each(function () {
					var $this = $(this),
							articleH = $this.find('.article.active').innerHeight();

					$this.css('height', (articleH + 40) + 'px');
				});
			};

		$('.component.tabs').each(function () {
			var $this = $(this);

			if ($this.hasClass('desktopOnly')) { //for profile tabs

				if (hash.length && $this.find('.nav .tab-item#' + hash).length > 0) {
					$this.find('.nav .tab-item#' + hash).addClass('active').next().addClass('active');
				} else {

					//make first tab item active
					$this.find('.nav .tab-item').each(function (i) {
						if (i === 0) {
							$(this).addClass('active').next().addClass('active');
							return;
						}
					});

					//make all articles invisible apart from the active one
					$this.find('.article:not(.active)').each(function () {
							$(this).css('opacity', '0');
					});
				}
			} else { //for all other tab instances

				//make first tab item active
				$this.find('.nav .tab-item').each(function (i) {
					if (i === 0) {
						$(this).addClass('active').addClass('active');
						return;
					}
				});

				//make all articles invisible apart from the active one
				$this.find('.article').each(function (i) {
					if (i > 0) {
						$(this).css('opacity', '0');
					}
				});
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
					singleOnly = $this.parent().parent().hasClass('single-only'),
					desktopOnly = $this.parent().parent().hasClass('desktop-only'),
					index = $this.parent().children('.tab-item').index(this); //get index of clicked tab

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
					runTabs(index, this);
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