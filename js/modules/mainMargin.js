export function mainContentMargin() {
    function adjustMainMargin() {
        const $heroHeight = $('.hero').outerHeight();

        $('.main').css('margin-top', $heroHeight);
    }

    adjustMainMargin();

    $(window).resize(() => {
        adjustMainMargin();
    });
}
