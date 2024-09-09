export function showFooter($main, $sentinel, $footer) {
    function updateMainBottomMargin() {
        const $footerHeight = $footer.outerHeight();
        $main.css('margin-bottom', `${$footerHeight}px`);
    }
    // update margin
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
