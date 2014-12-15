(function () {
  'use strict';

  var isTouch = $('html').hasClass('touch')
    , $document = $(document)
    , isResponsive = true
    , $findParent = $('.site-section');

    $findParent.each(function () {
      var $this = $(this);

      if ($this.has('.mega-drop').length > 0) {
        $this.addClass('has-children');
      }
    });

  $document.on('click', '.top-level-item, .mega-item', function (ev) {

    var isDesktopEv = $(ev.currentTarget).hasClass('top-level-item');

    if ($(window).innerWidth() < 1023 && isDesktopEv && isResponsive) {
      return true;
    } else {

      var $this = $(this).hasClass('mega-item') ? $(this).prev('.top-level-item') : $(this)
        , needsToOpen = ! $this.hasClass('active')
        , $menu = $this.closest('.megamenu-list')
        , closeFn = function (ev) {
            if ($(ev.target).closest('.megamenu-list').length === 0) {
              $menu.find('.top-level-item').removeClass('active').parents('.megamenu').removeClass('open');
              $menu.find('.mega-drop').hide();
              //console.log(ev);
            }
          };

      $menu.find('.top-level-item').removeClass('active').parents('.megamenu').removeClass('open');
      $menu.find('.mega-drop').hide();

      if (needsToOpen) {
        $this
          .addClass('active')
          .closest('li')
          .children('.mega-drop')
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

  $document.on('click', '.mega-drop .close', function (ev) {
    var $tab = $(this).closest('.site-section');

    $tab.find('.top-level-item').removeClass('active').parents('.megamenu').removeClass('open');
    $tab.find('.mega-drop').hide();
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
}());