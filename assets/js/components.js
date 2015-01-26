$(function () {

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
		if ($(window).innerWidth() < 768) {
			var $this = $(this);

			if ($this.hasClass('active')) {
				$(this).next('.panel').slideUp('fast', function () {
					$this.toggleClass('active');
				});
			} else {
				$this.toggleClass('active');
				$(this).next('.panel').slideDown('fast');
			}
		}
		ev.preventDefault();
	});


	var windowWidth = $(window).innerWidth();

	$(window).on('resize', function () {
		if ($(window).width() != windowWidth) {
			windowWidth = $(window).innerWidth();

			if ($(this).innerWidth() > 767) {
				$('.panel').show();
			} else {
				$('.panel').hide().prev('.panel-header').removeClass('active');
			}
		}
	});
});
$(function () {
	'use strict';
	var $document = $(document),
		targetEl,
		offsetHeight,
		coords,
		parentCoords = $(targetEl).parent().offset(),
		closeFn = function (ev) {
			if ((ev === undefined) || $(ev.target).closest(targetEl).length === 0) {
				$(targetEl).hide();
				$(this).removeClass('active');
			} else {
				$document.one('click', closeFn);
			}
		};

	$document.on('click', '.show-dialog', function (ev) {
		var $this = $(this);
			targetEl = $this.data('target-element');
			offsetHeight = $this.height();
			coords = $this.offset();
			parentCoords = $(targetEl).parent().offset();

		if ($this.hasClass('active')) {
			$(targetEl).hide();
			$this.toggleClass('active');
			$document.off('click', closeFn);
		} else {
			if ($(window).innerWidth() < 1023) {
				$('.nav').find('.nav-btn').removeClass('open');
				$('.nav').find('.megamenu-list').hide();
			}

			$(targetEl).show().css({
				top: (coords.top - parentCoords.top) + offsetHeight,
				left: ((coords.left + ($this.width()/2)) - ($(targetEl).width() + parentCoords.left))
			});
			$(targetEl).find('#username').focus();
			$this.toggleClass('active');
			$document.one('click', closeFn);
		}

		ev.preventDefault();
	});

	$(window).on('resize', function () {
		closeFn();
	});

});
$(function () {
	'use strict';

	var facets = $('.facets .sub-items');

	$(facets).hide();

	$(document).on('click', '.facets .item', function(e) {
		e.preventDefault();

		var $this = $(this);

		if ($this.hasClass('active')) {
			$this.toggleClass('active').blur().next('.sub-items').hide();
		} else {
			$this.toggleClass('active').next('.sub-items').show();
		}
	});
			
});
$(function () {

	'use strict';
	$('select').uniform({
		selectAutoWidth: false
	});
	$('.uniform').uniform();
});
$(function () {
  'use strict';

  var isTouch = $('html').hasClass('touch')
    , $document = $(document)
    , isResponsive = true;
    //, $findParent = $('.menu-item');

    // $findParent.each(function () {
    //   var $this = $(this);

    //   if ($this.has('.sub-menu').length > 0) {
    //     $this.addClass('has-children');
    //   }
    // });

  $document.on('click', '.menu-item > a, .mega-item', function (ev) {

    var isDesktopEv = $(ev.currentTarget).parent().hasClass('menu-item');

    if ($(window).innerWidth() < 1023 && isDesktopEv && isResponsive) {
      return true;
    } else {

      var $this = $(this).hasClass('mega-item') ? $(this).prev('.top-level-item') : $(this)
        , needsToOpen = ! $this.hasClass('active')
        , $menu = $this.closest('.megamenu-list')
        , closeFn = function (ev) {
            if ($(ev.target).closest('.megamenu-list').length === 0) {
              $menu.find('.menu-item > a').removeClass('active').parents('.megamenu').removeClass('open');
              $menu.find('.sub-menu').hide();
              //console.log(ev);
            }
          };

      $menu.find('.menu-item > a').removeClass('active').parents('.megamenu').removeClass('open');
      $menu.find('.megamenu > .menu-item > .sub-menu').hide();

      if (needsToOpen) {
        $this
          .addClass('active')
          .closest('li')
          .children('.sub-menu')
          .show()
          .parents('.megamenu')
          .addClass('open');

        if (isTouch) {
          $document.scrollTop( $this.offset().top );
        }

        $document.one('click', closeFn);
      }
      else {
        $document.off('click', closeFn);
      }

      ev.preventDefault();
    }
  });

  $document.on('click', '.sub-menu .close', function (ev) {
    var $tab = $(this).closest('.site-section');

    $tab.find('.top-level-item').removeClass('active').parents('.megamenu').removeClass('open');
    $tab.find('.sub-menu').hide();
    ev.preventDefault();
  });

  $document.on('click', '.nav-btn', function (ev) {
    var $this = $(this)
      , needsToOpen = ! $this.hasClass('open')
      , $controls = $this.closest('.nav')
      , dropdownSelector = '.search-box, .megamenu-list'
      , closeMobNav = function (ev) {
          if ($(ev.target).closest('.megamenu-list').length === 0) {
            $controls.find('.nav-btn').removeClass('open');
            $controls.find(dropdownSelector).hide();
          } else {
            $document.one('click', closeMobNav);
          }
        };

    $controls.find('.nav-btn').removeClass('open');
    $controls.find(dropdownSelector).hide();

    if (needsToOpen) {
      $this
        .addClass('open')
        .next(dropdownSelector)
        .show();

        $document.one('click', closeMobNav);
    } else {
      $document.off('click', closeMobNav);
    }

    ev.preventDefault();
  });

  $(window).on('resize', function () {
    if (isResponsive) {

      var $menu = $('.megamenu-list');
      $menu.parent().find('.nav-btn').removeClass('open');

      if ($(this).innerWidth() > 1023) {
        $menu.show();
      }
      else {
        $menu.hide();
      }

    }
  });
});
$(function () {

  'use strict';

  var $document = $(document),
      target = $('.slide-down'),
      getTargetEls = $.map(target, function (item) {
        return $(item).data('target-element');
      }),
      targetEls = $.makeArray(getTargetEls);

  $document.on('click', '.slide-down', function (ev) {
    var $this = $(this),
        targetEl = $this.data('target-element'),
      closeEl = function (ev) {
        if ($(ev.target).closest(targetEl).length === 0) {
          $(targetEl).slideUp(function () {
            $this.removeClass('active');
          });
        } else {
          $document.one('click', closeEl);
        }
      };

    if ($this.hasClass('active')) {
      $(targetEl).slideUp();
      $this.toggleClass('active');
      $document.off('click', closeEl);
    } else {
      $(targetEl).slideDown(function () {
        $this.toggleClass('active');
      $document.one('click', closeEl);
      });
      
    }

    ev.preventDefault();
  });

  $document.on('click', '.search-btn', function (ev) {
    var $this = $(this),
        targetEl = $('header .search'),
      closeEl = function (ev) {
        if ($(ev.target).closest(targetEl).length === 0) {
          $(targetEl).slideUp(function () {
            $this.removeClass('active');
          });
        } else {
          $document.one('click', closeEl);
        }
      };

    if ($this.hasClass('active')) {
      $(targetEl).slideUp();
      $this.toggleClass('active');
      $document.off('click', closeEl);
    } else {
      $(targetEl).slideDown(function () {
        $this.toggleClass('active');
      $document.one('click', closeEl);
      });
      
    }

    ev.preventDefault();
  });


  $(window).on('resize', function () {

      if ($(this).innerWidth() > 1023) {
        $('header .search').show();
      } else {
        $('header .search').hide();
      }

      if ($(this).innerWidth() > 767) {
        $(targetEls).each(function (i) {
          $(targetEls[i]).show();
        });
      } else {
        $(targetEls).each(function (i) {
          $(targetEls[i]).hide();
        });
      }
  });
});
$(function () {
	'use strict';

	var tabNav = $('.tabs .nav .tab-item'),
			articles = $('.tabs .sections .article'),
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
							$(articles).eq(index).addClass('active').animate({opacity: '1'}, {duration: 250});
						}});
					}
				});
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
			$(this).clone().insertAfter(tabNav.eq(i));

			if (i === 0) {
				$(this).addClass('active');
			}

			if (i > 0) {
				$(this).css('opacity', '0');
			}
		});

		$(window).on('resize', function () {
			if ($(this).innerWidth() > 767) {
				var getActive = $('.sections .article.active').index();

				$(tabNav).removeClass('active').eq(getActive).addClass('active');
				$('.tab-item + .article').hide();
				
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
					$(this).next('.article').slideUp('fast', function () {
						$this.toggleClass('active').blur();
					});
				} else {
					if (singleOnly) {
						$('.tab-item.active')
						.toggleClass('active')
						.blur()
						.next('.article')
						.slideUp('fast');
					}
					$this.next('.article').slideDown('fast', function () {
						$this.toggleClass('active');
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