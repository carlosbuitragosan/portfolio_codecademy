export function heroAnimation() {
    $('.hero__text').each(function () {
        $(this).textillate({
            initialDelay: 1000,
            in: {
                effect: 'bounceIn',
                reverse: true,
            },
        });
    });
}

export function loadHeroImage() {
    console.log('loading image');
    const $hero = $('.hero');
    const bigImage = new Image();
    bigImage.src = '../imgs/london_desktop.webp';

    bigImage.onload = function () {
        $hero.addClass('loaded');
    };
}
