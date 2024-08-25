export function footerReveal() {
    const $sentinel = $('.sentinel');
    const $main = $('.main');
    const $footer = $('.footer');

    function updateMainBottomMargin() {
        const $footerHeight = $footer.outerHeight();
        $main.css('margin-bottom', `${$footerHeight}px`);
    }
    // ensure footer height is updated before observer is called
    updateMainBottomMargin();

    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                updateMainBottomMargin();
                $footer.css('z-index', '3');
            } else {
                $footer.css('z-index', '-1');
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection);

    observer.observe($sentinel[0]);

    $(window).resize(() => {
        updateMainBottomMargin();
    });
}
