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
    const resolution = isMobile ? 256 : 512;

    $hero.ripples({
        resolution,
        dropRadius: 20,
        perturbance: 0.001, // amount of refraction
        interactive: false,
    });

    const heroWidth = $hero.width();
    const heroHeight = $hero.height();

    function triggerRipple(x, y) {
        $hero.ripples('drop', x, y, 30, 0.08); // 1st number is size of the drop size and  2nd is amplitude of the ripple
    }

    function triggerRain() {
        // Random position within the $hero element
        const randomX = Math.random() * heroWidth;
        const randomY = Math.random() * heroHeight;
        triggerRipple(randomX, randomY);
    }

    let rainInterval = 1000;
    let intervalId;
    function startRain() {
        intervalId = setInterval(() => {
            triggerRain();
            rainInterval = Math.max(rainInterval - 100, 200);
            clearInterval(intervalId);
            startRain();
        }, rainInterval);
    }

    setTimeout(startRain, 3000);

    setTimeout(() => {
        clearInterval(intervalId);
    }, 12000);
}
