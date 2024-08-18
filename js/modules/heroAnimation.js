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
