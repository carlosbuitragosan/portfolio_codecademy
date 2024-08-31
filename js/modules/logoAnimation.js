export function logoAnimation() {
    $('.logo__title')
        .css('visibility', 'visible')
        .textillate({
            in: {
                effect: 'fadeInDownBig',
                delayScale: 2,
                delay: 18,
            },
        });
}
