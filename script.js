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
            initialDelay: 1000,
            in: {
                effect: 'bounceIn',
                reverse: true,
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

    // INTRODUCTION ANIMATION
    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                $(entry.target)
                    .find('span')
                    .each(function () {
                        $(this).textillate({
                            in: {
                                effect: 'fadeInUp',
                                sync: true,
                            },
                        });
                    });
                observer.unobserve(entry.target);
            }
        });
    }
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.3,
    });
    $('.intro').each(function () {
        observer.observe(this);
    });
});
