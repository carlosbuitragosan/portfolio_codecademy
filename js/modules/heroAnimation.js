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
    $hero.ripples({
        resolution: 128,
        dropRadius: 20,
        perturbance: 0.004,
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
