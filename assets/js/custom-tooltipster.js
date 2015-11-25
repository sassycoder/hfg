/* Custom tooltipster js file*/

'use strict';
$(document).ready(function() {
	var $this = $(this);
	$this.on('click', 'a.tooltipstered', function (ev) {
		ev.preventDefault();
	});
	$this.on('focus', '.infographic', function () {
		$(this).tooltipster('show');
	});
	$this.on('blur', '.infographic', function () {
		$(this).tooltipster('hide');
	});
	$('.infographic').tooltipster({
		trigger: 'hover',
		contentAsHTML: true,
		interactive: true,
		maxWidth: 200,
		position: 'bottom-left',
		functionInit: function (origin, content) {
			return content + $('#infographic-dialog').html();
		}
	});

	$('.help').tooltipster({
		theme: 'tooltipster-profile',
		trigger: 'hover',
		contentAsHTML: true,
		interactive: true,
		maxWidth: 200,
		position: 'right',
		functionInit: function (origin, content) {
			return content + $('#infographic-dialog').html();
		}
	});


	// For save recipe button
	$('.save-recipe').tooltipster({
		trigger: 'click',
		contentAsHTML: true,
		interactive: true,
		position: 'bottom-left',
		offsetX: 20,
		functionInit: function(origin, content) {
			if( origin.hasClass('login-now') )
				jQuery('#save-recipe-dialog').html('Please login to save this recipe.');

			return $('#save-recipe-dialog').html();
		},
		functionBefore: function(origin, continueTooltip) {
			if( !origin.hasClass('login-now') ){
				var id = origin.attr('data-id');
				jQuery.post( hfg_ajax.ajaxurl, {pid: id, action: 'save_recipe'}, function(data){
					continueTooltip();
				});
			}
			continueTooltip();
		}
	});

	// For save article button
	$('.save-article').tooltipster({
		trigger: 'click',
		contentAsHTML: true,
		interactive: true,
		position: 'bottom-left',
		offsetX: 20,
		functionInit: function(origin, content) {
			if( origin.hasClass('login-now') )
				jQuery('#save-article-dialog').html('Please login to save this article.');

			return $('#save-article-dialog').html();
		},
		functionBefore: function(origin, continueTooltip) {
			if( !origin.hasClass('login-now') ){
				var id = origin.attr('data-id');
				jQuery.post( hfg_ajax.ajaxurl, {pid: id, action: 'save_article'}, function(data){
					continueTooltip();
				});
			}
			continueTooltip();
		}
	});

	// For save diet button
	$('.save-diet').tooltipster({
		trigger: 'click',
		contentAsHTML: true,
		interactive: true,
		position: 'bottom-left',
		offsetX: 20,
		functionInit: function(origin, content) {
			if( origin.hasClass('login-now') )
				jQuery('#save-diet-dialog').html('Please login to save this diet planner.');

			return $('#save-diet-dialog').html();
		},
		functionBefore: function(origin, continueTooltip) {
			if( !origin.hasClass('login-now') ){
				var id = origin.attr('data-id');
				jQuery.post( hfg_ajax.ajaxurl, {pid: id, action: 'save_diet'}, function(data){
					continueTooltip();
				});
			}
			continueTooltip();
		}
	});

	// For signed-in
	$('.signed-in').tooltipster({
	  trigger: 'click',
	  contentAsHTML: true,
	  interactive: true,
	  minWidth: 230,
	  position: 'bottom-right',
	  functionInit: function() {
	    	return $('#signed-in-dialog').html();
		    }
	});

	// For login
	$('.log-in, .login-mob').tooltipster({
		trigger: 'click',
		contentAsHTML: true,
		interactive: true,
		minWidth: 290,
		position: 'bottom-right',
		offsetX: -20,
		functionInit: function() {
			return $('#login-dialog').html();
		},
		functionReady: function(){
        	$('div.tooltipster-base div.login-dialog #username').focus();
    	}
	});

	$('#homepage-hero-carousel').owlCarousel({
  	items: 1,
  	loop: true,
  	nav: true,
  	rewind: false,
  	autoplay: true,
  	autoplayHoverPause: true,
  	autoplaySpeed: 800,
  	smartSpeed: 800,
  	responsive: {
	    0: {
        stagePadding: 0,
        loop: false,
        rewind: true
	    },
	    1024: {
	    	stagePadding: 80,
	    }
		}
  });

  $('#home-hero-carousel').owlCarousel({
  	items: 1,
  	loop: true,
  	nav: true,
  	rewind: false,
  	autoplay: false,
  	autoplayHoverPause: true,
  	autoplaySpeed: 800,
  	smartSpeed: 800
  });

	$('#expert-carousel').owlCarousel({
		nav: true,
		margin: 6,
		responsive: {
	    0: {
        items: 1,
        slideBy: 1
	    },
	    640: {
	    	items: 2,
        slideBy: 2
	    },
	    768: {
	    	items: 4,
        slideBy: 4
	    }
		},
  	onTranslated: function (e) {
  		var o = e.target,
  				getItems = $(o).find('.owl-item'),
  				getActive = $(o).find('.active'),
  				activeLength = getActive.length;

  		$(getItems).removeClass('first last');
  		$(getActive).eq(0).addClass('first');
  		$(getActive).eq((activeLength - 2)).addClass('last');
  	}
  });

	$('#qa').owlCarousel({
  	items: 1,
  	slideBy: 1,
		nav: true,
		margin: 6,
  	onTranslated: function (e) {
  		var o = e.target,
  				getItems = $(o).find('.owl-item'),
  				getActive = $(o).find('.active'),
  				activeLength = getActive.length;

  		$(getItems).removeClass('first last');
  		$(getActive).eq(0).addClass('first');
  		$(getActive).eq((activeLength - 2)).addClass('last');
  	}
  });
	
	$('#popular-recipes').owlCarousel({
		nav: true,
		margin: 6,
		responsive: {
	    0: {
        items: 1,
        slideBy: 1
	    },
	    480: {
	    	items: 2,
        slideBy: 2
	    },
	    768: {
	    	items: 3,
        slideBy: 3
	    }
		},
  	onTranslated: function (e) {
  		var o = e.target,
  				getItems = $(o).find('.owl-item'),
  				getActive = $(o).find('.active'),
  				activeLength = getActive.length;

  		$(getItems).removeClass('first last');
  		$(getActive).eq(0).addClass('first');
  		$(getActive).eq((activeLength - 2)).addClass('last');
  	}
  });

  	$('#diet-carousel').owlCarousel({
			nav: true,
			margin: 6,
			responsive: {
		    0: {
	        items: 1,
	        slideBy: 1
		    },
		    640: {
		    	items: 2,
	        slideBy: 2
		    },
		    768: {
		    	items: 4,
	        slideBy: 4
		    }
			},
	  	onTranslated: function (e) {
	  		var o = e.target,
	  				getItems = $(o).find('.owl-item'),
	  				getActive = $(o).find('.active'),
	  				activeLength = getActive.length;

	  		$(getItems).removeClass('first last');
	  		$(getActive).eq(0).addClass('first');
	  		$(getActive).eq((activeLength - 2)).addClass('last');
	  	}
	  });

	$('#related-articles').owlCarousel({
		nav: true,
		margin: 6,
		responsive: {
	    0: {
        items: 1,
        slideBy: 1
	    },
	    480: {
	    	items: 2,
        slideBy: 2
	    },
	    768: {
	    	items: 3,
        slideBy: 3
	    }
		},
  	onTranslated: function (e) {
  		var o = e.target,
  				getItems = $(o).find('.owl-item'),
  				getActive = $(o).find('.active'),
  				activeLength = getActive.length;

  		$(getItems).removeClass('first last');
  		$(getActive).eq(0).addClass('first');
  		$(getActive).eq((activeLength - 2)).addClass('last');
  	}
  });

	var $sync1 = $(".master-carousel"),
			$sync2 = $(".slave-carousel"),
			flag = false,
			duration = 300,
			numOfThumbs = 6,
			masterClones,
			slaveGoTo,
			slaveIndex,
			masterGoTo;

		$sync1.on('initialized.owl.carousel', function () {
			masterClones = $(this).find('.cloned').length;
		});

		$sync1.owlCarousel({
			items: 1,
			margin: 0,
			nav: true,
			dots: false,
			loop: true,
			rewind: false
		})
		.on('changed.owl.carousel', function (e) {
			if (!flag) {
				flag = true;
				slaveGoTo = e.item.index - (masterClones/2);
				$sync2
					.trigger('to.owl.carousel', [slaveGoTo, duration, true])
						.find('.owl-item:not(".cloned")').removeClass('current').eq(slaveGoTo).addClass('current');
				flag = false;
			}
		});

		$sync2.on('initialized.owl.carousel', function () {
			$(this).find('.owl-item.active').eq(0).addClass('current');
		});

		$sync2.owlCarousel({
			margin: 20,
			nav: true,
			dots: true,
			//slideBy: numOfThumbs,
			loop: false,
			rewind: false,
			responsive: {
		    0: {
	        items: 3
	        //slideBy: 3
		    },
		    480: {
		    	items: 4
	        //slideBy: 4
		    },
		    768: {
		    	items: numOfThumbs
	        //slideBy: numOfThumbs
		    }
			}
		})
		.on('click', '.owl-item', function (e) {
			slaveIndex = $('.slave-carousel .owl-item:not(".cloned")').index($(this));
			masterGoTo = (masterClones/2) + slaveIndex;

			$sync1.trigger('to.owl.carousel', [slaveIndex, duration, true]);
		});
});
