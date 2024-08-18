export function logoAnimation() {
    const $logoTitle = $('.logo__title');

    $logoTitle.textillate({
        in: {
            effect: 'fadeInDownBig',
            delay: 18,
        },
    });
}
