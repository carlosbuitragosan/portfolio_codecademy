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
    const resolution = isMobile ? 256 : 512;

    $hero.ripples({
        resolution,
        dropRadius: 20,
        perturbance: 0.003, // amount of refraction
        interactive: false,
    });

    const heroWidth = $hero.width();
    const heroHeight = $hero.height();

    function triggerRipple(x, y) {
        $hero.ripples('drop', x, y, 20, 0.1); // 1st number is size of the dropand  2nd is amplitude of the ripple
    }

    function triggerRain() {
        // Random position within the $hero element
        const randomX = Math.random() * heroWidth;
        const randomY = Math.random() * heroHeight;
        triggerRipple(randomX, randomY);
    }

    // Repeat with a random interval to create a natural rain effect
    const rainInterval = setInterval(triggerRain, 1000);

    setTimeout(() => {
        clearInterval(rainInterval);
    }, 20000); // 5000ms = 5 seconds
}
