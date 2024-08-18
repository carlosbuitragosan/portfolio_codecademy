export function headerAnimation() {
    let lastScrollTop = 0;
    let headerVisible = true;
    const $logoTitle = $('.logo__title');

    $(window).on('scroll', function () {
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
                    $logoTitle.css('display', 'block').textillate('in');
                });
                headerVisible = true;
            }
        }
        lastScrollTop = currentScroll;
    });
}
