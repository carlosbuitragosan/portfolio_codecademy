$(document).ready(() => {
    const $logoTitle = $('.logo__title');
    // LOGO ANIMATION
    $logoTitle.textillate({
        in: {
            effect: 'fadeInDownBig',
            delay: 18,
        },
        onStart() {
            console.log('Animation started');
        },
    });

    // HERO TITLE ANIMATION
    $('.hero__text').each(function () {
        $(this).textillate({
            in: {
                effect: 'fadeInUpBig',
                sync: true,
                delay: 800,
            },
        });
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
                $logoTitle.fadeOut('fast');
                headerVisible = false;
            }
        } else if (currentScroll <= 100) {
            if (!headerVisible) {
                $('.header').slideDown('fast', () => {
                    $logoTitle.css('display', 'block');
                    $logoTitle.textillate('in');
                });

                headerVisible = true;
            }
        }

        lastScrollTop = currentScroll;
    });
});
