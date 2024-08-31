export function logoAnimation() {
    $('.logo__title')
        .css('visibility', 'visible')
        .textillate({
            in: {
                effect: 'fadeInDownBig',
                delay: 18,
            },
        });
}
