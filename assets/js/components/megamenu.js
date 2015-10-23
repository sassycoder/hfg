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

$('.megamenu-container .sub-menu').addClass('animated');

  $document.on('mouseover', '.megamenu > .menu-item > a', function () {
    if ($(window).innerWidth() >= 1024) {

      $('.menu-item > a').removeClass('active');
      $(this).addClass('active');
      $('.megamenu').addClass('menu-open');
    }
  });

  $('.megamenu').mouseleave(function() {
    $('.menu-item > a').removeClass('active');
    $('.megamenu').removeClass('menu-open');
  });

  $document.on('click', '.menu-item > a', function (ev) {

    if ($(window).innerWidth() < 1024) {

      // var isDesktopEv = $(ev.currentTarget).parent().hasClass('menu-item');
      var $this = $(this);

      if ($(window).innerWidth() < 1024) {
        if ($this.parent().hasClass('back')) { return; }

        var hasChildren = $this.siblings('.sub-menu');
        if (hasChildren.length > 0) {
          hasChildren.removeClass('fadeOutLeft').addClass('fadeInLeft');
          hasChildren.children('.back').length ? {} : hasChildren.prepend('<li class="menu-item back"><a href="#" class="js-back">back</a></li>');
          ev.preventDefault();
        }
      } else {

        if ($this.parent().parent('.megamenu').length > 0) {
          if ($this.siblings('.sub-menu').length > 0) {
            var needsToOpen = ! $this.hasClass('active')
              , $menu = $this.closest('.megamenu-list')
              , closeFn = function (ev) {
                  if ($(ev.target).closest('.megamenu-list').length === 0) {
                    $menu.find('.menu-item > a').removeClass('active');
                    $menu.find('.sub-menu').hide();
                  }
                };

            $menu.find('.menu-item > a').removeClass('active').parents('.megamenu').removeClass('open');
            $menu.find('.megamenu > .menu-item > .sub-menu').hide();

            if (needsToOpen) {
              $this
                .addClass('active')
                .closest('li')
                .find('.sub-menu')
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
        }
      } //end else
    }
  }); //click ev

  $document.on('click', '.js-back', function (ev) {
    var toHide = $(this).parent().parent('.sub-menu');
    toHide.removeClass('fadeInLeft').addClass('fadeOutLeft');
    toHide.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      toHide.removeClass('fadeOutLeft');
    });
    ev.preventDefault();
  });

  $document.on('click', '.sub-menu .close', function (ev) {
    var $tab = $(this).closest('.site-section');

    $tab.find('.top-level-item').removeClass('active').parents('.megamenu').removeClass('open');
    $tab.find('.sub-menu').hide();
    ev.preventDefault();
  });

  $document.on('click', '.nav-btn', function (ev) {
    // var $this = $(this)
    //   , needsToOpen = ! $this.hasClass('open')
    //   , $controls = $this.closest('.nav')
    //   , dropdownSelector = '.search-box,'
    //   , subMenus = '.megamenu-list .sub-menu'
    //   , closeMobNav = function (ev) {
    //       if ($(ev.target).closest('.megamenu-list').length === 0 && $(ev.target).parent().hasClass('nav-btn') === false) {
    //         $controls.find('.nav-btn').removeClass('open');
    //         $controls.find(dropdownSelector).hide();
    //         $controls.find(subMenus).removeClass('fadeInLeft fadeOutLeft');
    //       } else {
    //         $document.one('click', closeMobNav);
    //       }
    //     };

    // $controls.find('.nav-btn').removeClass('open');
    // $controls.find(dropdownSelector).hide();

    // if (needsToOpen) {
    //   $this
    //     .addClass('open')
    //     .next(dropdownSelector)
    //     .show();

    //   $document.one('click', closeMobNav);
    // } else {
    //   $document.off('click', closeMobNav);
    // }
    $(this).toggleClass('open');
    ev.preventDefault();
  });

  $(window).on('resize', function () {
    if (isResponsive) {

      var $menu = $('.megamenu-list');

      if ($(this).innerWidth() > 1023) {
        $menu.show();
        $menu.find('.sub-menu').removeClass('fadeInLeft fadeOutLeft').hide();
        $menu.find('.menu-item > a').removeClass('active');
      }
      else {
        // $menu.hide();
        // $menu.parent().find('.nav-btn').removeClass('open');

      }

    }
  });
});