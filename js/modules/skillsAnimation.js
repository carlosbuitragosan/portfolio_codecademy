export function skillsAnimation() {
    const $container = $('.skills__container');
    const $gridItems = $('.skills__category');

    $gridItems.each(function () {
        const $item = $(this);
        const containerBottom =
            $container.offset().top + $container.outerHeight();
        const itemOffsetTop = $item.offset().top + $item.outerHeight();
        const translateY = containerBottom - itemOffsetTop;

        $item.css({
            transform: `translateY(${translateY}px)`,
        });
    });

    function animateSkills() {
        $('.skills__category').each(function () {
            $(this).css({
                transform: 'none',
            });
        });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 1 }
    );
    observer.observe($('.skills__container')[0]);
}
