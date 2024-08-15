$(document).ready(() => {
    $('.logo').textillate({
        in: {
            effect: 'fadeInDownBig',
            delay: 50,
        },
    });

    // TOGGLE DROPDOWN MENU IN MOBILE
    $('.burger__menu input').on('change', function () {
        if ($(this).is(':checked')) {
            $('.navbar').removeClass('hide').addClass('show');
        } else {
            $('.navbar').removeClass('show').addClass('hide');
        }
    });

    // HEADER ANIMATION
    let lastScrollTop = 0;
    let headerVisible = true;

    $(window).scroll(function () {
        const currentScroll = $(this).scrollTop();

        if (currentScroll > lastScrollTop && currentScroll > 100) {
            if (headerVisible) {
                $('.header').slideUp('fast');
                $('.logo').fadeOut('fast');
                headerVisible = false;
            }
        } else if (currentScroll <= 100) {
            if (!headerVisible) {
                $('.header').slideDown('fast', () => {
                    $('.logo').css('display', 'block');
                    $('.logo').textillate('in');
                });

                headerVisible = true;
            }
        }

        lastScrollTop = currentScroll;
    });
});
