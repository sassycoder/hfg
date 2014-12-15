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

  $(window).on('resize', function () {

      if ($(this).innerWidth() > 1023) {
        $(targetEls).each(function (i) {
          $(targetEls[i]).show();
        });
      } else {
        $(targetEls).each(function (i) {
          $(targetEls[i]).hide();
        });
      }
  });