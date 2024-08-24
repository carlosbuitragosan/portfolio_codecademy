export function heroAnimation() {
    const $hero = $('.hero');

    $('.hero__text').each(function () {
        $(this).textillate({
            initialDelay: 1000,
            in: {
                effect: 'bounceIn',
                reverse: true,
            },
        });
    });

    // RIPPLES ANIMATION
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const resolution = isMobile ? 128 : 512;

    $hero.ripples({
        resolution,
        dropRadius: 20,
        perturbance: 0.01,
        interactive: false,
    });

    const $heroOffset = $hero.offset();
    const heroWidth = $hero.width();
    const heroHeight = $hero.height();
    const x = $heroOffset.left + heroWidth / 2;
    const y = $heroOffset.top + heroHeight / 2;

    function triggerRipple(width, height) {
        $hero.ripples('drop', width, height, 5, 0.2);
    }

    setTimeout(() => {
        triggerRipple(x, y);
    }, 500);
}
