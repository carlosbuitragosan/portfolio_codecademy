export function heroAnimation() {
    const $hero = $('.hero');

    $('.hero__text').each(function () {
        $(this).textillate({
            initialDelay: 1200,
            in: {
                effect: 'bounceIn',
                reverse: true,
                delay: 110,
            },
        });
    });

    // RIPPLES ANIMATION
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const resolution = isMobile ? 128 : 512;

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

    // trigegerRain every 1s
    let rainInterval;
    setTimeout(() => {
        rainInterval = setInterval(triggerRain, 1000);
    }, 3000);
    // stop triggerRain after Xs
    setTimeout(() => {
        clearInterval(rainInterval);
    }, 12000);
}
