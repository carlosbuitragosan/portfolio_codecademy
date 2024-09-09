export function bounceInText($text) {
    $text.each(function () {
        $(this).textillate({
            initialDelay: 1200,
            in: {
                effect: 'bounceIn',
                reverse: true,
                delay: 110,
            },
        });
    });
}

export function backgroundRipples($background) {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const resolution = isMobile ? 256 : 512;

    $background.ripples({
        resolution,
        dropRadius: 40,
        perturbance: 0.02, // amount of refraction
        interactive: false,
    });

    const bgWidth = $background.width();
    const bgHeight = $background.height();

    function triggerRipple(x, y) {
        $background.ripples('drop', x, y, 20, 0.08); // 1st number is size of the drop size and  2nd is amplitude of the ripple
    }

    function triggerRain() {
        // Random position within the $hero element
        const randomX = Math.random() * bgWidth;
        const randomY = Math.random() * bgHeight;
        triggerRipple(randomX, randomY);
    }
    setTimeout(triggerRain, 4000);
    setTimeout(triggerRain, 5000);
}
